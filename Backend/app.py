# # Backend/app.py

# from flask import Flask, jsonify
# from flask_cors import CORS
# from pymongo import MongoClient
# from dotenv import load_dotenv
# import os
# from bson.objectid import ObjectId # Needed to convert MongoDB's unique ID

# # --- Configuration ---
# load_dotenv()
# app = Flask(__name__)
# # Allow your frontend (on a different address) to access this server
# CORS(app) 

# # --- MongoDB Connection Setup ---
# try:
#     MONGO_URI = os.getenv("MONGO_URI")
#     client = MongoClient(MONGO_URI)
#     db = client.BookShelfDB 
#     books_collection = db.books 
#     print("Python Backend: Successfully connected to MongoDB!")

# except Exception as e:
#     print(f"Python Backend: Failed to connect to MongoDB. Error: {e}")
#     books_collection = None


# # --- API Endpoint: Get All Books ---
# @app.route('/api/books', methods=['GET'])
# def get_all_books():
#     if books_collection is None:
#         return jsonify({"message": "Database connection error"}), 500
    
#     try:
#         books_cursor = books_collection.find()
#         books_list = []
#         for book in books_cursor:
#             # Convert MongoDB's unique '_id' (ObjectId) to a string so it can be sent as JSON
#             book['id'] = str(book.pop('_id'))
            
#             # Use 'id' as the key your frontend expects (not '_id')
#             books_list.append(book)
            
#         return jsonify(books_list), 200
        
#     except Exception as e:
#         return jsonify({"message": f"Error fetching books: {e}"}), 500


# # --- Run the Server ---
# if __name__ == '__main__':
#     # Flask defaults to port 5000
#     app.run(debug=True)







# from flask import Flask, jsonify, request
# from flask_cors import CORS
# from pymongo import MongoClient
# from dotenv import load_dotenv
# import os
# from bson.objectid import ObjectId
# import json
# from datetime import datetime

# # --- Configuration ---
# load_dotenv()
# app = Flask(__name__)
# CORS(app) 

# # --- MongoDB Connection Setup ---
# try:
#     MONGO_URI = os.getenv("MONGO_URI")
#     client = MongoClient(MONGO_URI)
#     db = client.BookShelfDB 
#     books_collection = db.books 
#     print("Python Backend: Successfully connected to MongoDB!")

# except Exception as e:
#     print(f"Python Backend: Failed to connect to MongoDB. Error: {e}")
#     books_collection = None

# # Helper function to convert ObjectId to string
# def serialize_doc(doc):
#     if doc and '_id' in doc:
#         doc['id'] = str(doc['_id'])
#         del doc['_id']
#     return doc

# # --- API Endpoint: Get All Books ---
# @app.route('/api/books', methods=['GET'])
# def get_all_books():
#     if books_collection is None:
#         return jsonify({"message": "Database connection error"}), 500
    
#     try:
#         books_cursor = books_collection.find()
#         books_list = [serialize_doc(book) for book in books_cursor]
#         return jsonify(books_list), 200
        
#     except Exception as e:
#         return jsonify({"message": f"Error fetching books: {e}"}), 500

# # --- API Endpoint: Add New Book ---
# @app.route('/api/books', methods=['POST'])
# def add_book():
#     if books_collection is None:
#         return jsonify({"message": "Database connection error"}), 500
    
#     try:
#         new_book = request.json
        
#         # Required fields validation
#         required_fields = ['title', 'author', 'price', 'genre', 'image', 'rating', 'reviews']
#         for field in required_fields:
#             if field not in new_book:
#                 return jsonify({"message": f"Missing required field: {field}"}), 400
        
#         # Add timestamp
#         new_book['created_at'] = datetime.utcnow()
        
#         # Insert into MongoDB
#         result = books_collection.insert_one(new_book)
        
#         return jsonify({
#             "message": "Book added successfully", 
#             "id": str(result.inserted_id)
#         }), 201
        
#     except Exception as e:
#         return jsonify({"message": f"Error adding book: {e}"}), 500

# # --- API Endpoint: Get Single Book ---
# @app.route('/api/books/<book_id>', methods=['GET'])
# def get_book(book_id):
#     if books_collection is None:
#         return jsonify({"message": "Database connection error"}), 500
    
#     try:
#         book = books_collection.find_one({"_id": ObjectId(book_id)})
#         if book:
#             return jsonify(serialize_doc(book)), 200
#         else:
#             return jsonify({"message": "Book not found"}), 404
            
#     except Exception as e:
#         return jsonify({"message": f"Error fetching book: {e}"}), 500

# # --- API Endpoint: Update Book ---
# @app.route('/api/books/<book_id>', methods=['PUT'])
# def update_book(book_id):
#     if books_collection is None:
#         return jsonify({"message": "Database connection error"}), 500
    
#     try:
#         updated_data = request.json
#         result = books_collection.update_one(
#             {"_id": ObjectId(book_id)},
#             {"$set": updated_data}
#         )
        
#         if result.matched_count:
#             return jsonify({"message": "Book updated successfully"}), 200
#         else:
#             return jsonify({"message": "Book not found"}), 404
            
#     except Exception as e:
#         return jsonify({"message": f"Error updating book: {e}"}), 500

# # --- API Endpoint: Delete Book ---
# @app.route('/api/books/<book_id>', methods=['DELETE'])
# def delete_book(book_id):
#     if books_collection is None:
#         return jsonify({"message": "Database connection error"}), 500
    
#     try:
#         result = books_collection.delete_one({"_id": ObjectId(book_id)})
        
#         if result.deleted_count:
#             return jsonify({"message": "Book deleted successfully"}), 200
#         else:
#             return jsonify({"message": "Book not found"}), 404
            
#     except Exception as e:
#         return jsonify({"message": f"Error deleting book: {e}"}), 500

# # --- Health Check ---
# @app.route('/api/health', methods=['GET'])
# def health_check():
#     return jsonify({
#         "status": "healthy",
#         "database": "connected" if books_collection else "disconnected",
#         "timestamp": datetime.utcnow().isoformat()
#     }), 200

# # --- Run the Server ---
# if __name__ == '__main__':
#     app.run(debug=True, port=5000)





# // App state
# let currentUser = null;
# let books = [];
# let cart = [];
# let favorites = [];
# let filteredBooks = [];
# let orders = [];
# let currentOrderId = 1000;
# let currentReviewBookId = null;

# // DOM elements
# const pages = document.querySelectorAll('.page');
# const navLinks = document.querySelectorAll('.nav-link');
# const loginBtn = document.getElementById('login-btn');
# const logoutBtn = document.getElementById('logout-btn');
# const themeToggle = document.getElementById('theme-toggle');
# const cartCount = document.getElementById('cart-count');
# const featuredBooksContainer = document.getElementById('featured-books');
# const cartItemsContainer = document.getElementById('cart-items');
# const cartSummary = document.getElementById('cart-summary');
# const cartTotal = document.getElementById('cart-total');
# const favoritesGrid = document.getElementById('favorites-grid');
# const loginForm = document.getElementById('login-form');
# const registerForm = document.getElementById('register-form');
# const showRegister = document.getElementById('show-register');
# const showLogin = document.getElementById('show-login');
# const profileForm = document.getElementById('profile-form');
# const profileName = document.getElementById('profile-name');
# const profileEmail = document.getElementById('profile-email');
# const profileJoinDate = document.getElementById('profile-join-date');
# const contactForm = document.getElementById('contact-form');
# const searchInput = document.getElementById('search-input');
# const searchButton = document.getElementById('search-button');
# const checkoutButton = document.getElementById('checkout-button');
# const paymentModal = document.getElementById('payment-modal');
# const closePaymentModal = document.getElementById('close-payment-modal');
# const paymentForm = document.getElementById('payment-form');
# const orderConfirmationPage = document.getElementById('order-confirmation-page');
# const confirmationItems = document.getElementById('confirmation-items');
# const confirmationTotal = document.getElementById('confirmation-total');
# const viewTrackingButton = document.getElementById('view-tracking-button');
# const continueShoppingButton = document.getElementById('continue-shopping-button');
# const orderTrackingPage = document.getElementById('order-tracking-page');
# const backToOrdersButton = document.getElementById('back-to-orders-button');
# const orderHistoryPage = document.getElementById('order-history-page');
# const orderHistoryContainer = document.getElementById('order-history');
# const reviewModal = document.getElementById('review-modal');
# const reviewBookTitle = document.getElementById('review-book-title');
# const reviewStars = document.querySelectorAll('.review-star');
# const submitReviewButton = document.getElementById('submit-review');
# const addBookForm = document.getElementById('add-book-form');

# // Chatbot elements
# const chatbotToggle = document.getElementById('chatbot-toggle');
# const chatbotWindow = document.getElementById('chatbot-window');
# const chatbotClose = document.getElementById('chatbot-close');
# const chatbotMessages = document.getElementById('chatbot-messages');
# const chatbotInput = document.getElementById('chatbot-input');
# const chatbotSend = document.getElementById('chatbot-send');

# // Initialize the app
# function init() {
#     console.log("🚀 Initializing BookShelf...");
#     setupEventListeners();
#     checkAuthState();
#     checkTheme();
#     fetchBooks(); // Load books on startup
# }

# // Check and apply saved theme
# function checkTheme() {
#     const savedTheme = localStorage.getItem('theme');
#     if (savedTheme === 'night') {
#         document.body.classList.add('night-mode');
#         themeToggle.textContent = 'Day Mode';
#     }
# }

# // Toggle night mode
# function toggleNightMode() {
#     document.body.classList.toggle('night-mode');
#     if (document.body.classList.contains('night-mode')) {
#         themeToggle.textContent = 'Day Mode';
#         localStorage.setItem('theme', 'night');
#     } else {
#         themeToggle.textContent = 'Night Mode';
#         localStorage.setItem('theme', 'day');
#     }
# }

# // Fetch books from backend
# async function fetchBooks() {
#     try {
#         console.log("📚 Fetching books from backend...");
#         featuredBooksContainer.innerHTML = '<div class="loading">Loading books...</div>';
        
#         const response = await fetch('http://127.0.0.1:5000/api/books');
        
#         if (!response.ok) {
#             throw new Error(`HTTP error! status: ${response.status}`);
#         }
        
#         const serverBooks = await response.json();
#         console.log("✅ Books loaded:", serverBooks);
        
#         books = serverBooks.map(book => ({
#             ...book,
#             id: String(book.id)
#         }));
        
#         filteredBooks = [...books];
#         renderBooks();
        
#     } catch (error) {
#         console.error("❌ Error loading books:", error);
#         featuredBooksContainer.innerHTML = `
#             <div class="error-message">
#                 <h3>⚠️ Connection Error</h3>
#                 <p>Could not load books from server.</p>
#                 <p><small>Make sure Python backend is running on http://127.0.0.1:5000</small></p>
#                 <button onclick="fetchBooks()" class="retry-button">Try Again</button>
#             </div>
#         `;
#     }
# }

# // Render books on the home page
# function renderBooks() {
#     console.log("🎨 Rendering books...");
#     featuredBooksContainer.innerHTML = '';
    
#     if (filteredBooks.length === 0) {
#         featuredBooksContainer.innerHTML = '<p class="no-books">No books found matching your search.</p>';
#         return;
#     }
    
#     filteredBooks.forEach(book => {
#         const isFavorite = favorites.some(fav => fav.id === book.id);
        
#         const bookCard = document.createElement('div');
#         bookCard.className = 'book-card';
#         bookCard.innerHTML = `
#             <div class="book-cover" style="background-image: url('${book.image}')">
#                 ${!book.image ? '📚' : ''}
#             </div>
#             <div class="book-details">
#                 <h3>${book.title}</h3>
#                 <p class="author">by ${book.author}</p>
#                 <p class="genre">${book.genre}</p>
#                 <div class="rating">
#                     ${renderStars(book.rating)}
#                     <span class="review-count">(${book.reviews})</span>
#                 </div>
#                 <div class="book-price">₹${book.price.toFixed(2)}</div>
#                 <div class="book-actions">
#                     <button class="add-to-cart" data-id="${book.id}">Add to Cart</button>
#                     <button class="add-to-favorites" data-id="${book.id}" 
#                             style="background-color: ${isFavorite ? '#e67e22' : '#f1c40f'}">
#                         ${isFavorite ? '❤️' : '🤍'}
#                     </button>
#                 </div>
#             </div>
#         `;
        
#         featuredBooksContainer.appendChild(bookCard);
#     });
# }

# // Render star ratings
# function renderStars(rating) {
#     let stars = '';
#     const fullStars = Math.floor(rating);
    
#     for (let i = 1; i <= 5; i++) {
#         if (i <= fullStars) {
#             stars += '★';
#         } else {
#             stars += '☆';
#         }
#     }
    
#     return stars;
# }

# // Search books
# function searchBooks(query) {
#     if (!query.trim()) {
#         filteredBooks = [...books];
#     } else {
#         const lowerQuery = query.toLowerCase();
#         filteredBooks = books.filter(book => 
#             book.title.toLowerCase().includes(lowerQuery) ||
#             book.author.toLowerCase().includes(lowerQuery) ||
#             book.genre.toLowerCase().includes(lowerQuery)
#         );
#     }
#     renderBooks();
# }

# // Render cart items
# function renderCart() {
#     cartItemsContainer.innerHTML = '';
    
#     if (cart.length === 0) {
#         cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
#         cartSummary.style.display = 'none';
#         return;
#     }
    
#     cartSummary.style.display = 'block';
    
#     let total = 0;
    
#     cart.forEach(item => {
#         const book = books.find(b => b.id === item.id);
#         if (book) {
#             total += book.price * item.quantity;
            
#             const cartItem = document.createElement('div');
#             cartItem.className = 'cart-item';
#             cartItem.innerHTML = `
#                 <div class="cart-item-cover" style="background-image: url('${book.image}')">
#                     ${!book.image ? '📚' : ''}
#                 </div>
#                 <div class="cart-item-details">
#                     <div class="cart-item-title">${book.title}</div>
#                     <div class="cart-item-price">₹${(book.price * item.quantity).toFixed(2)}</div>
#                 </div>
#                 <div class="cart-item-actions">
#                     <button class="decrease-quantity" data-id="${book.id}">-</button>
#                     <div class="cart-item-quantity">${item.quantity}</div>
#                     <button class="increase-quantity" data-id="${book.id}">+</button>
#                     <button class="remove-from-cart" data-id="${book.id}">×</button>
#                 </div>
#             `;
            
#             cartItemsContainer.appendChild(cartItem);
#         }
#     });
    
#     cartTotal.textContent = `₹${total.toFixed(2)}`;
#     cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
# }

# // Setup event listeners
# function setupEventListeners() {
#     console.log("🔧 Setting up event listeners...");
    
#     // Navigation
#     navLinks.forEach(link => {
#         link.addEventListener('click', (e) => {
#             e.preventDefault();
#             const pageId = link.getAttribute('data-page');
#             showPage(pageId);
#         });
#     });
    
#     // Theme toggle
#     themeToggle.addEventListener('click', toggleNightMode);
    
#     // Auth buttons
#     loginBtn.addEventListener('click', () => showPage('login'));
#     logoutBtn.addEventListener('click', logout);
    
#     // Search functionality
#     searchButton.addEventListener('click', (e) => {
#         e.preventDefault();
#         searchBooks(searchInput.value);
#     });
    
#     searchInput.addEventListener('keyup', (e) => {
#         if (e.key === 'Enter') {
#             searchBooks(searchInput.value);
#         }
#     });
    
#     // Login/register forms
#     loginForm.addEventListener('submit', (e) => {
#         e.preventDefault();
#         const email = document.getElementById('login-email').value;
#         const password = document.getElementById('login-password').value;
#         login(email, password);
#     });
    
#     registerForm.addEventListener('submit', (e) => {
#         e.preventDefault();
#         const name = document.getElementById('register-name').value;
#         const email = document.getElementById('register-email').value;
#         const password = document.getElementById('register-password').value;
#         register(name, email, password);
#     });
    
#     showRegister.addEventListener('click', (e) => {
#         e.preventDefault();
#         loginForm.style.display = 'none';
#         registerForm.style.display = 'block';
#     });
    
#     showLogin.addEventListener('click', (e) => {
#         e.preventDefault();
#         registerForm.style.display = 'none';
#         loginForm.style.display = 'block';
#     });
    
#     // Profile form
#     profileForm.addEventListener('submit', (e) => {
#         e.preventDefault();
#         const address = document.getElementById('profile-address').value;
#         const phone = document.getElementById('profile-phone').value;
#         updateProfile(address, phone);
#     });
    
#     // Add book form
#     addBookForm.addEventListener('submit', (e) => {
#         e.preventDefault();
#         addNewBook();
#     });
    
#     // Checkout button
#     checkoutButton.addEventListener('click', (e) => {
#         e.preventDefault();
#         if (cart.length === 0) {
#             alert('Your cart is empty!');
#             return;
#         }
#         paymentModal.classList.add('active');
#     });
    
#     // Payment modal
#     closePaymentModal.addEventListener('click', () => {
#         paymentModal.classList.remove('active');
#     });
    
#     paymentForm.addEventListener('submit', (e) => {
#         e.preventDefault();
#         placeOrder();
#         paymentModal.classList.remove('active');
#     });
    
#     // Payment method toggle
#     document.querySelectorAll('input[name="payment-method"]').forEach(method => {
#         method.addEventListener('change', (e) => {
#             document.querySelectorAll('.payment-details').forEach(detail => {
#                 detail.style.display = 'none';
#             });
#             document.getElementById(e.target.value + '-details').style.display = 'block';
#         });
#     });
    
#     // Order confirmation buttons
#     viewTrackingButton.addEventListener('click', () => {
#         showPage('order-tracking');
#     });
    
#     continueShoppingButton.addEventListener('click', () => {
#         showPage('home');
#     });
    
#     // Order tracking button
#     backToOrdersButton.addEventListener('click', () => {
#         showPage('order-history');
#     });
    
#     // Review stars
#     reviewStars.forEach(star => {
#         star.addEventListener('click', (e) => {
#             const rating = parseInt(e.target.getAttribute('data-rating'));
#             setReviewRating(rating);
#         });
#     });
    
#     submitReviewButton.addEventListener('click', submitReview);
    
#     // Chatbot events
#     chatbotToggle.addEventListener('click', () => {
#         chatbotWindow.classList.toggle('active');
#     });
    
#     chatbotClose.addEventListener('click', () => {
#         chatbotWindow.classList.remove('active');
#     });
    
#     chatbotSend.addEventListener('click', sendChatbotMessage);
    
#     chatbotInput.addEventListener('keypress', (e) => {
#         if (e.key === 'Enter') {
#             sendChatbotMessage();
#         }
#     });
    
#     // Book actions (delegated events)
#     document.addEventListener('click', (e) => {
#         const target = e.target;
        
#         // Add to cart
#         if (target.classList.contains('add-to-cart')) {
#             const bookId = target.getAttribute('data-id');
#             addToCart(bookId);
#         }
        
#         // Add to favorites
#         if (target.classList.contains('add-to-favorites')) {
#             const bookId = target.getAttribute('data-id');
#             toggleFavorite(bookId);
#         }
        
#         // Cart quantity controls
#         if (target.classList.contains('increase-quantity')) {
#             const bookId = target.getAttribute('data-id');
#             updateCartItem(bookId, 1);
#         }
        
#         if (target.classList.contains('decrease-quantity')) {
#             const bookId = target.getAttribute('data-id');
#             updateCartItem(bookId, -1);
#         }
        
#         if (target.classList.contains('remove-from-cart')) {
#             const bookId = target.getAttribute('data-id');
#             removeFromCart(bookId);
#         }
#     });
    
#     console.log("✅ Event listeners setup complete");
# }

# // Show specific page
# function showPage(pageId) {
#     console.log("📄 Showing page:", pageId);
    
#     // Check authentication for protected pages
#     const protectedPages = ['profile', 'cart', 'favorites', 'order-history', 'admin'];
#     if (protectedPages.includes(pageId) && !currentUser) {
#         showPage('login');
#         return;
#     }
    
#     // Hide all pages
#     pages.forEach(page => {
#         page.classList.remove('active');
#     });
    
#     // Show target page
#     const targetPage = document.getElementById(`${pageId}-page`);
#     if (targetPage) {
#         targetPage.classList.add('active');
#     }
    
#     // Update page-specific content
#     switch(pageId) {
#         case 'cart':
#             renderCart();
#             break;
#         case 'favorites':
#             renderFavorites();
#             break;
#         case 'profile':
#             updateProfileDisplay();
#             break;
#         case 'order-history':
#             renderOrderHistory();
#             break;
#         case 'home':
#             searchInput.value = '';
#             filteredBooks = [...books];
#             renderBooks();
#             break;
#     }
# }

# // Auth functions
# function login(email, password) {
#     console.log("🔐 Logging in:", email);
    
#     // Simple validation
#     if (!email || !password) {
#         alert('Please enter both email and password');
#         return;
#     }
    
#     currentUser = {
#         name: email.split('@')[0],
#         email: email,
#         joinDate: new Date().toLocaleDateString(),
#         address: '',
#         phone: ''
#     };
    
#     // Load user data from localStorage
#     const userData = localStorage.getItem(`user_${email}`);
#     if (userData) {
#         currentUser = { ...currentUser, ...JSON.parse(userData) };
#     }
    
#     // Load user-specific data
#     const savedCart = localStorage.getItem(`cart_${email}`);
#     if (savedCart) cart = JSON.parse(savedCart);
    
#     const savedFavorites = localStorage.getItem(`favorites_${email}`);
#     if (savedFavorites) favorites = JSON.parse(savedFavorites);
    
#     const savedOrders = localStorage.getItem(`orders_${email}`);
#     if (savedOrders) orders = JSON.parse(savedOrders);
    
#     checkAuthState();
#     showPage('home');
#     alert(`Welcome back, ${currentUser.name}!`);
# }

# function register(name, email, password) {
#     console.log("📝 Registering:", name, email);
    
#     if (!name || !email || !password) {
#         alert('Please fill all fields');
#         return;
#     }
    
#     currentUser = {
#         name: name,
#         email: email,
#         joinDate: new Date().toLocaleDateString(),
#         address: '',
#         phone: ''
#     };
    
#     // Save to localStorage
#     localStorage.setItem(`user_${email}`, JSON.stringify(currentUser));
    
#     // Initialize empty arrays for new user
#     cart = [];
#     favorites = [];
#     orders = [];
    
#     checkAuthState();
#     showPage('home');
#     alert(`Account created successfully! Welcome, ${name}!`);
# }

# function logout() {
#     console.log("🚪 Logging out");
    
#     // Save data before logout
#     if (currentUser) {
#         localStorage.setItem(`cart_${currentUser.email}`, JSON.stringify(cart));
#         localStorage.setItem(`favorites_${currentUser.email}`, JSON.stringify(favorites));
#         localStorage.setItem(`orders_${currentUser.email}`, JSON.stringify(orders));
#     }
    
#     currentUser = null;
#     cart = [];
#     favorites = [];
#     orders = [];
    
#     checkAuthState();
#     showPage('home');
# }

# function checkAuthState() {
#     if (currentUser) {
#         loginBtn.style.display = 'none';
#         logoutBtn.style.display = 'block';
#     } else {
#         loginBtn.style.display = 'block';
#         logoutBtn.style.display = 'none';
#     }
# }

# // Cart functions
# function addToCart(bookId) {
#     if (!currentUser) {
#         showPage('login');
#         return;
#     }
    
#     const existingItem = cart.find(item => item.id === bookId);
    
#     if (existingItem) {
#         existingItem.quantity += 1;
#     } else {
#         cart.push({ id: bookId, quantity: 1 });
#     }
    
#     renderCart();
#     alert('Book added to cart!');
# }

# function updateCartItem(bookId, change) {
#     const item = cart.find(item => item.id === bookId);
    
#     if (item) {
#         item.quantity += change;
        
#         if (item.quantity <= 0) {
#             cart = cart.filter(item => item.id !== bookId);
#         }
#     }
    
#     renderCart();
# }

# function removeFromCart(bookId) {
#     cart = cart.filter(item => item.id !== bookId);
#     renderCart();
# }

# // Favorites functions
# function toggleFavorite(bookId) {
#     if (!currentUser) {
#         showPage('login');
#         return;
#     }
    
#     const book = books.find(b => b.id === bookId);
#     const existingIndex = favorites.findIndex(fav => fav.id === bookId);
    
#     if (existingIndex >= 0) {
#         favorites.splice(existingIndex, 1);
#         alert('Removed from favorites');
#     } else {
#         favorites.push(book);
#         alert('Added to favorites!');
#     }
    
#     renderBooks();
# }

# function renderFavorites() {
#     favoritesGrid.innerHTML = '';
    
#     if (favorites.length === 0) {
#         favoritesGrid.innerHTML = '<p class="empty-favorites-message">You don\'t have any favorite books yet</p>';
#         return;
#     }
    
#     favorites.forEach(book => {
#         const favoriteCard = document.createElement('div');
#         favoriteCard.className = 'book-card';
#         favoriteCard.innerHTML = `
#             <div class="book-cover" style="background-image: url('${book.image}')">
#                 ${!book.image ? '📚' : ''}
#             </div>
#             <div class="book-details">
#                 <h3>${book.title}</h3>
#                 <p class="author">by ${book.author}</p>
#                 <p class="genre">${book.genre}</p>
#                 <div class="rating">
#                     ${renderStars(book.rating)}
#                     <span class="review-count">(${book.reviews})</span>
#                 </div>
#                 <div class="book-price">₹${book.price.toFixed(2)}</div>
#                 <div class="book-actions">
#                     <button class="add-to-cart" data-id="${book.id}">Add to Cart</button>
#                     <button class="add-to-favorites" data-id="${book.id}" style="background-color: #e67e22">❤️</button>
#                 </div>
#             </div>
#         `;
        
#         favoritesGrid.appendChild(favoriteCard);
#     });
# }

# // Order functions
# function placeOrder() {
#     if (!currentUser || cart.length === 0) return;
    
#     const orderId = currentOrderId++;
#     const orderDate = new Date().toLocaleDateString();
#     let total = 0;
    
#     const orderItems = cart.map(item => {
#         const book = books.find(b => b.id === item.id);
#         total += book.price * item.quantity;
#         return { id: item.id, quantity: item.quantity };
#     });
    
#     const order = {
#         id: orderId,
#         date: orderDate,
#         items: orderItems,
#         total: total,
#         status: 'processing'
#     };
    
#     orders.unshift(order);
    
#     // Save orders
#     localStorage.setItem(`orders_${currentUser.email}`, JSON.stringify(orders));
    
#     // Clear cart
#     cart = [];
#     renderCart();
    
#     // Show confirmation
#     renderOrderConfirmation(order);
#     showPage('order-confirmation');
    
#     alert('Order placed successfully!');
# }

# function renderOrderConfirmation(order) {
#     confirmationItems.innerHTML = '';
    
#     order.items.forEach(item => {
#         const book = books.find(b => b.id === item.id);
#         confirmationItems.innerHTML += `
#             <div class="order-item">
#                 <span>${book.title} × ${item.quantity}</span>
#                 <span>₹${(book.price * item.quantity).toFixed(2)}</span>
#             </div>
#         `;
#     });
    
#     confirmationTotal.textContent = `₹${order.total.toFixed(2)}`;
# }

# function renderOrderHistory() {
#     orderHistoryContainer.innerHTML = '';
    
#     if (orders.length === 0) {
#         orderHistoryContainer.innerHTML = '<p class="empty-orders-message">You haven\'t placed any orders yet</p>';
#         return;
#     }
    
#     orders.forEach(order => {
#         const orderCard = document.createElement('div');
#         orderCard.className = 'order-card';
#         orderCard.innerHTML = `
#             <div class="order-header">
#                 <div>
#                     <span class="order-id">Order #${order.id}</span>
#                     <span class="order-date">${order.date}</span>
#                 </div>
#                 <span class="order-status status-processing">Processing</span>
#             </div>
#             <div class="order-total">Total: ₹${order.total.toFixed(2)}</div>
#         `;
        
#         orderHistoryContainer.appendChild(orderCard);
#     });
# }

# // Add book to database
# async function addNewBook() {
#     const newBook = {
#         title: document.getElementById('book-title').value,
#         author: document.getElementById('book-author').value,
#         price: parseFloat(document.getElementById('book-price').value),
#         genre: document.getElementById('book-genre').value,
#         image: document.getElementById('book-image').value,
#         rating: parseFloat(document.getElementById('book-rating').value),
#         reviews: parseInt(document.getElementById('book-reviews').value)
#     };

#     try {
#         const response = await fetch('http://127.0.0.1:5000/api/books', {
#             method: 'POST',
#             headers: {
#                 'Content-Type': 'application/json',
#             },
#             body: JSON.stringify(newBook)
#         });

#         if (response.ok) {
#             alert('Book added successfully to database!');
#             addBookForm.reset();
#             await fetchBooks(); // Refresh the book list
#         } else {
#             alert('Error adding book');
#         }
#     } catch (error) {
#         console.error('Error:', error);
#         alert('Error adding book. Check console for details.');
#     }
# }

# // Profile functions
# function updateProfile(address, phone) {
#     if (!currentUser) return;
    
#     currentUser.address = address;
#     currentUser.phone = phone;
    
#     localStorage.setItem(`user_${currentUser.email}`, JSON.stringify(currentUser));
#     alert('Profile updated successfully!');
# }

# function updateProfileDisplay() {
#     if (!currentUser) return;
    
#     profileName.textContent = currentUser.name;
#     profileEmail.textContent = currentUser.email;
#     profileJoinDate.textContent = currentUser.joinDate;
#     document.getElementById('profile-address').value = currentUser.address || '';
#     document.getElementById('profile-phone').value = currentUser.phone || '';
# }

# // Review functions
# function openReviewModal(bookId) {
#     currentReviewBookId = bookId;
#     const book = books.find(b => b.id === bookId);
#     reviewBookTitle.textContent = book.title;
#     reviewModal.classList.add('active');
# }

# function setReviewRating(rating) {
#     reviewStars.forEach(star => {
#         const starRating = parseInt(star.getAttribute('data-rating'));
#         star.classList.toggle('selected', starRating <= rating);
#     });
# }

# function submitReview() {
#     const rating = document.querySelectorAll('.review-star.selected').length;
#     const reviewText = document.querySelector('.review-text').value;
    
#     if (rating === 0) {
#         alert('Please select a rating');
#         return;
#     }
    
#     alert(`Thank you for your ${rating}-star review!\n\n"${reviewText}"`);
#     reviewModal.classList.remove('active');
#     document.querySelector('.review-text').value = '';
# }

# // Chatbot functions
# function sendChatbotMessage() {
#     const message = chatbotInput.value.trim();
#     if (!message) return;
    
#     addChatbotMessage(message, 'user');
#     chatbotInput.value = '';
    
#     setTimeout(() => {
#         const response = generateChatbotResponse(message);
#         addChatbotMessage(response, 'bot');
#     }, 500);
# }

# function addChatbotMessage(text, sender) {
#     const messageDiv = document.createElement('div');
#     messageDiv.className = `chatbot-message ${sender}-message`;
#     messageDiv.textContent = text;
#     chatbotMessages.appendChild(messageDiv);
#     chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
# }

# function generateChatbotResponse(message) {
#     const lowerMessage = message.toLowerCase();
    
#     if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
#         return "Hello! How can I help you today?";
#     } else if (lowerMessage.includes('order') || lowerMessage.includes('track')) {
#         return "You can check your orders in the 'Orders' section of your account.";
#     } else if (lowerMessage.includes('book') || lowerMessage.includes('recommend')) {
#         return "We have a great collection of books! Browse our homepage to find your next favorite read.";
#     } else if (lowerMessage.includes('contact')) {
#         return "You can reach us through the Contact Us page or email support@bookshelf.com";
#     } else {
#         return "I'm here to help! You can ask me about books, orders, or general questions.";
#     }
# }

# // Initialize the app when DOM is loaded
# document.addEventListener('DOMContentLoaded', init);









from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# MongoDB Connection
try:
    # REPLACE THIS WITH YOUR ACTUAL MONGODB URI
    MONGO_URI="mongodb+srv://akkki_217:Akash217@cluster0.6rovofz.mongodb.net/BookShelfDB?retryWrites=true&w=majority&appName=Cluster0"
    client = MongoClient(MONGO_URI)
    db = client.BookShelfDB
    books_collection = db.books
    print("✅ MongoDB Connected Successfully!")
except Exception as e:
    print(f"❌ MongoDB Connection Failed: {e}")
    books_collection = None

def serialize_book(book):
    """Convert MongoDB ObjectId to string"""
    if book and '_id' in book:
        book['id'] = str(book['_id'])
        del book['_id']
    return book

@app.route('/')
def home():
    return jsonify({"message": "BookShelf Backend is Running!"})

@app.route('/api/books', methods=['GET'])
def get_all_books():
    if books_collection is None:
        return jsonify({"error": "Database not connected"}), 500
    
    try:
        books = list(books_collection.find())
        books_list = [serialize_book(book) for book in books]
        
        # If no books in database, return sample books
        if not books_list:
            books_list = [
                {
                    "id": "1",
                    "title": "The Great Gatsby",
                    "author": "F. Scott Fitzgerald", 
                    "price": 499,
                    "genre": "Classic",
                    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                    "rating": 4.5,
                    "reviews": 128
                },
                {
                    "id": "2",
                    "title": "To Kill a Mockingbird",
                    "author": "Harper Lee",
                    "price": 399,
                    "genre": "Classic", 
                    "image": "https://images.unsplash.com/photo-1554757380-2fb69b9d5e63?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                    "rating": 4.8,
                    "reviews": 215
                },
                {
                    "id": "3", 
                    "title": "1984",
                    "author": "George Orwell",
                    "price": 349,
                    "genre": "Dystopian",
                    "image": "https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                    "rating": 4.3,
                    "reviews": 178
                }
            ]
        
        return jsonify(books_list)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/books', methods=['POST'])
def add_book():
    if books_collection is None:
        return jsonify({"error": "Database not connected"}), 500
    
    try:
        new_book = request.get_json()
        
        # Validate required fields
        required_fields = ['title', 'author', 'price', 'genre', 'image', 'rating', 'reviews']
        for field in required_fields:
            if field not in new_book:
                return jsonify({"error": f"Missing field: {field}"}), 400
        
        # Insert book
        result = books_collection.insert_one(new_book)
        
        return jsonify({
            "message": "Book added successfully",
            "id": str(result.inserted_id)
        }), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/books/<book_id>', methods=['GET'])
def get_book(book_id):
    if books_collection is None:
        return jsonify({"error": "Database not connected"}), 500
    
    try:
        book = books_collection.find_one({"_id": ObjectId(book_id)})
        if book:
            return jsonify(serialize_book(book))
        else:
            return jsonify({"error": "Book not found"}), 404
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/books/<book_id>', methods=['PUT'])
def update_book(book_id):
    if books_collection is None:
        return jsonify({"error": "Database not connected"}), 500
    
    try:
        updated_data = request.get_json()
        result = books_collection.update_one(
            {"_id": ObjectId(book_id)},
            {"$set": updated_data}
        )
        
        if result.matched_count:
            return jsonify({"message": "Book updated successfully"})
        else:
            return jsonify({"error": "Book not found"}), 404
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/books/<book_id>', methods=['DELETE'])
def delete_book(book_id):
    if books_collection is None:
        return jsonify({"error": "Database not connected"}), 500
    
    try:
        result = books_collection.delete_one({"_id": ObjectId(book_id)})
        
        if result.deleted_count:
            return jsonify({"message": "Book deleted successfully"})
        else:
            return jsonify({"error": "Book not found"}), 404
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "running",
        "database": "connected" if books_collection else "disconnected",
        "timestamp": datetime.now().isoformat()
    })

if __name__ == '__main__':
    print("🚀 Starting BookShelf Backend...")
    print("📚 API: http://127.0.0.1:5000/api/books")
    print("❤️ Health: http://127.0.0.1:5000/api/health")
    app.run(debug=True, port=5000)