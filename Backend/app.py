from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from datetime import datetime
from urllib.parse import quote_plus, urlparse
import os
import re

from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.errors import PyMongoError
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

load_dotenv()

app = Flask(__name__, static_folder=os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'Frontend')), static_url_path='/')
CORS(app)

mongo_client = None
mongo_collection = None
mongo_uri = os.getenv('MONGO_URI', '').strip().strip('"')

if mongo_uri and '*' not in mongo_uri:
    mongo_client = MongoClient(mongo_uri, serverSelectionTimeoutMS=1500)
    mongo_collection = mongo_client[os.getenv('MONGO_DB_NAME', 'BookShelfDB')]['find_my_book_results']

SELLER_SEARCHES = {
    'new_books': [
        ('Amazon India', '🛒', 'https://www.amazon.in/s?k={query}'),
        ('Flipkart', '🛍️', 'https://www.flipkart.com/search?q={query}'),
        ('Meesho', 'm', 'https://www.meesho.com/search?q={query}'),
        ('Google Shopping', 'G', 'https://www.google.com/search?tbm=shop&q={query}')
    ],
    'second_hand_books': [
        ('Bookchor', '📚', 'https://www.bookchor.com/search/?query={query}'),
        ('Clankart', '🔎', 'https://www.clankart.com/search?q={query}'),
        ('MyPustak', '♻️', 'https://www.mypustak.com/search?value={query}&sortBy=books_collection%2Fsort%2Fnum_is_out_of_stack%3Aasc%2CiDate%3Adesc&query={query}&page=1')
    ]
}


SEARCH_STOP_WORDS = {
    'a', 'an', 'and', 'book', 'books', 'copy', 'find', 'for', ' me',
    'my', 'of', 'on', 'please', 'the', 'under', 'used', 'want', 'with'
}


def get_search_terms(query):
    return [
        term for term in re.findall(r'[a-z0-9]+', query.lower())
        if len(term) > 1 and not term.isdigit() and term not in SEARCH_STOP_WORDS
    ]


def build_external_results(query):
    encoded_query = quote_plus(query)
    results = {}
    for category, sellers in SELLER_SEARCHES.items():
        results[category] = [
            {
                'title': query,
                'seller': seller,
                'icon': icon,
                'price': None,
                'rating': None,
                'reviews': None,
                'condition': 'New' if category == 'new_books' else 'Used condition varies',
                'delivery_charges': None,
                'url': template.format(query=encoded_query),
                'data_source': 'External seller search link'
            }
            for seller, icon, template in sellers
        ]
    return results


def build_recommendations(query, max_price):
    catalog_documents = [
        ' '.join(
            str(book.get(field, ''))
            for field in ('title', 'author', 'genre', 'description')
        )
        for book in books
    ]
    if not catalog_documents or not query.strip():
        return []

    vectorizer = TfidfVectorizer(stop_words='english', ngram_range=(1, 2))
    catalog_matrix = vectorizer.fit_transform(catalog_documents)
    query_vector = vectorizer.transform([query])
    scores = cosine_similarity(query_vector, catalog_matrix).flatten()

    recommendations = []
    for index in scores.argsort()[::-1]:
        book = books[index]
        if scores[index] <= 0:
            continue
        if max_price is not None and book.get('price') is not None and float(book['price']) > max_price:
            continue
        recommendations.append({
            **book,
            'relevance': round(float(scores[index]), 4),
            'seller': 'BookShelf Catalog',
            'condition': 'New',
            'delivery_charges': None,
            'url': f"/?search={quote_plus(book['title'])}",
            'data_source': 'BookShelf local catalog'
        })
    return recommendations[:12]


def get_mongo_results(query, max_price):
    if mongo_collection is None:
        return [], None

    try:
        mongo_query = {
            '$or': [
                {'title': {'$regex': re.escape(query), '$options': 'i'}},
                {'author': {'$regex': re.escape(query), '$options': 'i'}}
            ]
        }
        if max_price is not None:
            mongo_query['price'] = {'$lte': max_price}

        records = []
        for record in mongo_collection.find(mongo_query).limit(100):
            record.pop('_id', None)
            record_url = str(record.get('url', '')).strip()
            parsed_url = urlparse(record_url)
            if parsed_url.scheme not in ('http', 'https') or not parsed_url.netloc:
                continue
            record['data_source'] = 'BookShelf MongoDB Atlas'
            records.append(record)
        return records, None
    except PyMongoError as error:
        return [], f'MongoDB Atlas results could not be loaded: {error}'

books = [
    {
        "id": "1",
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "price": 499,
        "genre": "Classic",
        "image": "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=800&q=80",
        "rating": 4.5,
        "reviews": 128
    },
    {
        "id": "2",
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "price": 399,
        "genre": "Classic",
        "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
        "rating": 4.8,
        "reviews": 215
    },
    {
        "id": "3",
        "title": "1984",
        "author": "George Orwell",
        "price": 349,
        "genre": "Dystopian",
        "image": "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=800&q=80",
        "rating": 4.3,
        "reviews": 178
    },
    {
        "id": "4",
        "title": "The Hobbit",
        "author": "J.R.R. Tolkien",
        "price": 599,
        "genre": "Fantasy",
        "image": "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=800&q=80",
        "rating": 4.7,
        "reviews": 192
    },
    {
        "id": "5",
        "title": "Pride and Prejudice",
        "author": "Jane Austen",
        "price": 299,
        "genre": "Romance",
        "image": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80",
        "rating": 4.6,
        "reviews": 156
    },
    {
        "id": "6",
        "title": "The Catcher in the Rye",
        "author": "J.D. Salinger",
        "price": 449,
        "genre": "Coming-of-age",
        "image": "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&w=800&q=80",
        "rating": 4.0,
        "reviews": 142
    },
    {
        "id": "7",
        "title": "Python Crash Course",
        "author": "Eric Matthes",
        "price": 699,
        "genre": "Programming",
        "image": "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=80",
        "rating": 4.8,
        "reviews": 342
    },
    {
        "id": "8",
        "title": "Automate the Boring Stuff with Python",
        "author": "Al Sweigart",
        "price": 799,
        "genre": "Programming",
        "image": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
        "rating": 4.7,
        "reviews": 286
    },
    {
        "id": "9",
        "title": "Fluent Python",
        "author": "Luciano Ramalho",
        "price": 899,
        "genre": "Programming",
        "image": "https://images.unsplash.com/photo-1555068792-3d7e7c4e2f4f?auto=format&fit=crop&w=800&q=80",
        "rating": 4.6,
        "reviews": 198
    }
]

for book in books:
    book.setdefault(
        'description',
        f"{book['title']} by {book['author']}, a {book['genre'].lower()} book."
    )

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat(),
        'book_count': len(books)
    })

@app.route('/api/books', methods=['GET'])
def get_all_books():
    return jsonify(books)


@app.route('/api/find-my-book', methods=['GET'])
def find_my_book():
    query = str(request.args.get('q', '')).strip()
    if not query:
        return jsonify({'message': 'Please enter a book title, author, ISBN, or natural-language request.'}), 400
    if len(query) > 200:
        return jsonify({'message': 'Search prompt must be 200 characters or fewer.'}), 400

    max_price = request.args.get('max_price', '').strip()
    parsed_max_price = None
    if max_price:
        try:
            parsed_max_price = float(max_price)
        except ValueError:
            return jsonify({'message': 'Budget must be a valid number.'}), 400
        if parsed_max_price < 0:
            return jsonify({'message': 'Budget cannot be negative.'}), 400

    results = build_external_results(query)
    recommendations = build_recommendations(query, parsed_max_price)
    mongo_results, mongo_warning = get_mongo_results(query, parsed_max_price)
    for result in mongo_results:
        category = 'second_hand_books' if str(result.get('condition', '')).lower() not in ('new', 'brand new') else 'new_books'
        results[category].append(result)

    response = {
        'query': query,
        'budget': parsed_max_price,
        'notice': 'BookShelf recommendations are ranked with TF-IDF and cosine similarity. Marketplace cards preserve your exact prompt and open the seller search page. Marketplace prices, ratings, reviews, conditions, and delivery charges are shown only when supplied by an authorized data source.',
        'recommendations': recommendations,
        'results': results
    }
    if mongo_warning:
        response['warning'] = mongo_warning
    return jsonify(response)


@app.route('/api/books', methods=['POST'])
def add_book():
    data = request.get_json(silent=True) or {}
    required_fields = ['title', 'author', 'price', 'genre', 'image', 'rating', 'reviews']

    for field in required_fields:
        if field not in data or data[field] is None or (isinstance(data[field], str) and not data[field].strip()):
            return jsonify({'message': f'Missing required field: {field}'}), 400

    try:
        price = float(data['price'])
        rating = float(data['rating'])
        reviews = int(data['reviews'])
    except (TypeError, ValueError):
        return jsonify({'message': 'Price, rating, and reviews must be valid numbers.'}), 400
    if price < 0 or not 0 <= rating <= 5 or reviews < 0:
        return jsonify({'message': 'Price and reviews cannot be negative, and rating must be between 0 and 5.'}), 400

    numeric_ids = [int(book['id']) for book in books if str(book['id']).isdigit()]
    new_book = {
        'id': str(max(numeric_ids, default=0) + 1),
        'title': str(data['title']).strip(),
        'author': str(data['author']).strip(),
        'price': price,
        'genre': str(data['genre']).strip(),
        'image': str(data['image']).strip(),
        'rating': rating,
        'reviews': reviews
    }

    books.insert(0, new_book)
    return jsonify({'message': 'Book added successfully', 'book': new_book}), 201

@app.route('/api/books/<book_id>', methods=['GET'])
def get_book(book_id):
    book = next((b for b in books if b['id'] == book_id), None)
    if not book:
        return jsonify({'message': 'Book not found'}), 404
    return jsonify(book)

@app.route('/api/books/<book_id>', methods=['PUT'])
def update_book(book_id):
    book = next((b for b in books if b['id'] == book_id), None)
    if not book:
        return jsonify({'message': 'Book not found'}), 404

    data = request.get_json(silent=True) or {}
    try:
        for key, value in data.items():
            if key in ('price', 'rating', 'reviews'):
                if key == 'reviews':
                    parsed_value = int(value)
                    if parsed_value < 0:
                        raise ValueError
                else:
                    parsed_value = float(value)
                    if parsed_value < 0 or (key == 'rating' and parsed_value > 5):
                        raise ValueError
                book[key] = parsed_value
            elif key in ('title', 'author', 'genre', 'image'):
                parsed_value = str(value).strip()
                if not parsed_value:
                    raise ValueError
                book[key] = parsed_value
    except (TypeError, ValueError):
        return jsonify({'message': 'Invalid book data. Check text fields, price, rating, and reviews.'}), 400

    return jsonify({'message': 'Book updated successfully', 'book': book})

@app.route('/api/books/<book_id>', methods=['DELETE'])
def delete_book(book_id):
    global books
    book = next((b for b in books if b['id'] == book_id), None)
    if not book:
        return jsonify({'message': 'Book not found'}), 404

    books = [b for b in books if b['id'] != book_id]
    return jsonify({'message': 'Book deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
