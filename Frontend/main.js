
    
//         // Sample book data with prices in rupees and ratings
//         // const books = [
//         //     {
//         //         id: 1,
//         //         title: "The Great Gatsby",
//         //         author: "F. Scott Fitzgerald",
//         //         price: 499,
//         //         genre: "Classic",
//         //         cover: "",
//         //         image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//         //         rating: 4.5,
//         //         reviews: 128
//         //     },
//         //     {
//         //         id: 2,
//         //         title: "To Kill a Mockingbird",
//         //         author: "Harper Lee",
//         //         price: 399,
//         //         genre: "Classic",
//         //         cover: "",
//         //         image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//         //         rating: 4.8,
//         //         reviews: 215
//         //     },
//         //     {
//         //         id: 3,
//         //         title: "1984",
//         //         author: "George Orwell",
//         //         price: 349,
//         //         genre: "Dystopian",
//         //         cover: "",
//         //         image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//         //         rating: 4.3,
//         //         reviews: 178
//         //     },
//         //     {
//         //         id: 4,
//         //         title: "The Hobbit",
//         //         author: "J.R.R. Tolkien",
//         //         price: 599,
//         //         genre: "Fantasy",
//         //         cover: "",
//         //         image: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//         //         rating: 4.7,
//         //         reviews: 192
//         //     },
//         //     {
//         //         id: 5,
//         //         title: "Pride and Prejudice",
//         //         author: "Jane Austen",
//         //         price: 299,
//         //         genre: "Romance",
//         //         cover: "",
//         //         image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//         //         rating: 4.6,
//         //         reviews: 156
//         //     },
//         //     {
//         //         id: 6,
//         //         title: "The Catcher in the Rye",
//         //         author: "J.D. Salinger",
//         //         price: 449,
//         //         genre: "Coming-of-age",
//         //         cover: "",
//         //         image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//         //         rating: 4.0,
//         //         reviews: 142
//         //     },
//         //     {
//         //         id: 7,
//         //         title: "The Alchemist",
//         //         author: "Paulo Coelho",
//         //         price: 249,
//         //         genre: "Fiction",
//         //         cover: "",
//         //         image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//         //         rating: 4.2,
//         //         reviews: 203
//         //     },
//         //     {
//         //         id: 8,
//         //         title: "Harry Potter and the Sorcerer's Stone",
//         //         author: "J.K. Rowling",
//         //         price: 699,
//         //         genre: "Fantasy",
//         //         cover: "",
//         //         image: "https://images.unsplash.com/photo-1626618012641-bfbca5a31239?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//         //         rating: 4.9,
//         //         reviews: 312
//         //     }
//         // ];

//         // App state
//         // let currentUser = null;
//         let books = [];
//         let cart = [];
//         let favorites = [];
//         // let filteredBooks = [...books];
//         let filteredBooks = [];


//         // NEW CODE TO ADD AROUND LINE 56 (After filteredBooks declaration)

// // --- New/Updated Data Fetching Function ---
// async function fetchBooks() {
//     try {
//         // Call the Python Flask server running on port 5000
//         const response = await fetch('http://127.0.0.1:5000/api/books');
        
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const serverBooks = await response.json();
        
//         // Map data keys and ensure 'id' is correctly formatted (if needed)
//         books = serverBooks.map(book => ({
//             ...book,
//             // MongoDB uses string IDs (ObjectId), but your old JS used number IDs.
//             // Using the string ID is safer and generally standard practice.
//             // We'll rename MongoDB's string '_id' (sent as 'id' from Python) to 'id'
//             id: String(book.id) 
//         }));
        
//         filteredBooks = [...books];
//         renderBooks();
//     } catch (error) {
//         console.error("Error connecting to Python backend:", error);
//         alert("Could not load books from the server. Check your Python terminal for errors!");
//         featuredBooksContainer.innerHTML = '<p>Could not connect to the book database. Please ensure the Python server is running.</p>';
//     }
// }



//         let orders = [];
//         let currentOrderId = 1000;
//         let currentReviewBookId = null;

//         // DOM elements
//         const pages = document.querySelectorAll('.page');
//         const navLinks = document.querySelectorAll('.nav-link');
//         const loginBtn = document.getElementById('login-btn');
//         const logoutBtn = document.getElementById('logout-btn');
//         const themeToggle = document.getElementById('theme-toggle');
//         const cartCount = document.getElementById('cart-count');
//         const featuredBooksContainer = document.getElementById('featured-books');
//         const cartItemsContainer = document.getElementById('cart-items');
//         const cartSummary = document.getElementById('cart-summary');
//         const cartTotal = document.getElementById('cart-total');
//         const favoritesGrid = document.getElementById('favorites-grid');
//         const loginForm = document.getElementById('login-form');
//         const registerForm = document.getElementById('register-form');
//         const showRegister = document.getElementById('show-register');
//         const showLogin = document.getElementById('show-login');
//         const profileForm = document.getElementById('profile-form');
//         const profileName = document.getElementById('profile-name');
//         const profileEmail = document.getElementById('profile-email');
//         const profileJoinDate = document.getElementById('profile-join-date');
//         const contactForm = document.getElementById('contact-form');
//         const searchInput = document.getElementById('search-input');
//         const searchButton = document.getElementById('search-button');
//         const checkoutButton = document.getElementById('checkout-button');
//         const paymentModal = document.getElementById('payment-modal');
//         const closePaymentModal = document.getElementById('close-payment-modal');
//         const paymentForm = document.getElementById('payment-form');
//         const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
//         const creditCardDetails = document.getElementById('credit-card-details');
//         const upiDetails = document.getElementById('upi-details');
//         const netBankingDetails = document.getElementById('net-banking-details');
//         const codDetails = document.getElementById('cod-details');
//         const orderConfirmationPage = document.getElementById('order-confirmation-page');
//         const confirmationItems = document.getElementById('confirmation-items');
//         const confirmationTotal = document.getElementById('confirmation-total');
//         const viewTrackingButton = document.getElementById('view-tracking-button');
//         const continueShoppingButton = document.getElementById('continue-shopping-button');
//         const orderTrackingPage = document.getElementById('order-tracking-page');
//         const backToOrdersButton = document.getElementById('back-to-orders-button');
//         const orderHistoryPage = document.getElementById('order-history-page');
//         const orderHistoryContainer = document.getElementById('order-history');
//         const reviewModal = document.getElementById('review-modal');
//         const reviewBookTitle = document.getElementById('review-book-title');
//         const reviewStars = document.querySelectorAll('.review-star');
//         const submitReviewButton = document.getElementById('submit-review');

//         // Chatbot elements
//         const chatbotToggle = document.getElementById('chatbot-toggle');
//         const chatbotWindow = document.getElementById('chatbot-window');
//         const chatbotClose = document.getElementById('chatbot-close');
//         const chatbotMessages = document.getElementById('chatbot-messages');
//         const chatbotInput = document.getElementById('chatbot-input');
//         const chatbotSend = document.getElementById('chatbot-send');

//         // Initialize the app
//         function init() {
//             // renderBooks();
//             fetchBooks();
//             setupEventListeners();
//             checkAuthState();
//             checkTheme();
//         }

//         // Check and apply saved theme
//         function checkTheme() {
//             const savedTheme = localStorage.getItem('theme');
//             if (savedTheme === 'night') {
//                 document.body.classList.add('night-mode');
//                 themeToggle.textContent = 'Day Mode';
//             }
//         }

//         // Toggle night mode
//         function toggleNightMode() {
//             document.body.classList.toggle('night-mode');
//             if (document.body.classList.contains('night-mode')) {
//                 themeToggle.textContent = 'Day Mode';
//                 localStorage.setItem('theme', 'night');
//             } else {
//                 themeToggle.textContent = 'Night Mode';
//                 localStorage.setItem('theme', 'day');
//             }
//         }

//         // Render books on the home page
//         function renderBooks() {
//             featuredBooksContainer.innerHTML = '';
            
//             if (filteredBooks.length === 0) {
//                 featuredBooksContainer.innerHTML = '<p>No books found matching your search.</p>';
//                 return;
//             }
            
//             filteredBooks.forEach(book => {
//                 const isFavorite = favorites.some(fav => fav.id === book.id);
                
//                 const bookCard = document.createElement('div');
//                 bookCard.className = 'book-card';
//                 bookCard.innerHTML = `
//                     <div class="book-cover" style="background-image: url('${book.image}')">${book.cover}</div>
//                     <div class="book-details">
//                         <h3>${book.title}</h3>
//                         <p>by ${book.author}</p>
//                         <p>${book.genre}</p>
//                         <div class="rating">
//                             ${renderStars(book.rating)}
//                             <span>(${book.reviews})</span>
//                         </div>
//                         <div class="book-price">₹${book.price.toFixed(2)}</div>
//                         <div class="book-actions">
//                             <button class="add-to-cart" data-id="${book.id}">Add to Cart</button>
//                             <button class="add-to-favorites" data-id="${book.id}" style="background-color: ${isFavorite ? '#e67e22' : '#f1c40f'}">
//                                 ${isFavorite ? '❤️' : '🤍'}
//                             </button>
//                         </div>
//                     </div>
//                 `;
                
//                 featuredBooksContainer.appendChild(bookCard);
//             });
//         }

//         // Render star ratings
//         function renderStars(rating) {
//             let stars = '';
//             const fullStars = Math.floor(rating);
//             const hasHalfStar = rating % 1 >= 0.5;
            
//             for (let i = 1; i <= 5; i++) {
//                 if (i <= fullStars) {
//                     stars += '★';
//                 } else if (i === fullStars + 1 && hasHalfStar) {
//                     stars += '½';
//                 } else {
//                     stars += '☆';
//                 }
//             }
            
//             return stars;
//         }

//         // Search books
//         function searchBooks(query) {
//             if (!query) {
//                 filteredBooks = [...books];
//             } else {
//                 const lowerQuery = query.toLowerCase();
//                 filteredBooks = books.filter(book => 
//                     book.title.toLowerCase().includes(lowerQuery) ||
//                     book.author.toLowerCase().includes(lowerQuery) ||
//                     book.genre.toLowerCase().includes(lowerQuery)
//                 );
//             }
//             renderBooks();
//         }

//         // Render cart items
//         function renderCart() {
//             cartItemsContainer.innerHTML = '';
            
//             if (cart.length === 0) {
//                 cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
//                 cartSummary.style.display = 'none';
//                 return;
//             }
            
//             cartSummary.style.display = 'block';
            
//             let total = 0;
            
//             cart.forEach(item => {
//                 const book = books.find(b => b.id === item.id);
//                 total += book.price * item.quantity;
                
//                 const cartItem = document.createElement('div');
//                 cartItem.className = 'cart-item';
//                 cartItem.innerHTML = `
//                     <div class="cart-item-cover" style="background-image: url('${book.image}')">${book.cover}</div>
//                     <div class="cart-item-details">
//                         <div class="cart-item-title">${book.title}</div>
//                         <div class="cart-item-price">₹${(book.price * item.quantity).toFixed(2)}</div>
//                     </div>
//                     <div class="cart-item-actions">
//                         <button class="decrease-quantity" data-id="${book.id}">-</button>
//                         <div class="cart-item-quantity">${item.quantity}</div>
//                         <button class="increase-quantity" data-id="${book.id}">+</button>
//                         <button class="remove-from-cart" data-id="${book.id}" style="margin-left: 10px;">×</button>
//                     </div>
//                 `;
                
//                 cartItemsContainer.appendChild(cartItem);
//             });
            
//             cartTotal.textContent = `₹${total.toFixed(2)}`;
//             cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
//         }
        
//         // Render favorites
//         function renderFavorites() {
//             favoritesGrid.innerHTML = '';
            
//             if (favorites.length === 0) {
//                 favoritesGrid.innerHTML = '<p class="empty-favorites-message">You don\'t have any favorite books yet</p>';
//                 return;
//             }
            
//             favorites.forEach(book => {
//                 const favoriteCard = document.createElement('div');
//                 favoriteCard.className = 'book-card';
//                 favoriteCard.innerHTML = `
//                     <div class="book-cover" style="background-image: url('${book.image}')">${book.cover}</div>
//                     <div class="book-details">
//                         <h3>${book.title}</h3>
//                         <p>by ${book.author}</p>
//                         <p>${book.genre}</p>
//                         <div class="rating">
//                             ${renderStars(book.rating)}
//                             <span>(${book.reviews})</span>
//                         </div>
//                         <div class="book-price">₹${book.price.toFixed(2)}</div>
//                         <div class="book-actions">
//                             <button class="add-to-cart" data-id="${book.id}">Add to Cart</button>
//                             <button class="add-to-favorites" data-id="${book.id}" style="background-color: #e67e22">❤️</button>
//                             <button class="write-review" data-id="${book.id}" style="margin-top: 10px; width: 100%; background-color: #9b59b6;">Write Review</button>
//                         </div>
//                     </div>
//                 `;
                
//                 favoritesGrid.appendChild(favoriteCard);
//             });
//         }

//         // Render order history
//         function renderOrderHistory() {
//             orderHistoryContainer.innerHTML = '';
            
//             if (orders.length === 0) {
//                 orderHistoryContainer.innerHTML = '<p class="empty-orders-message">You haven\'t placed any orders yet</p>';
//                 return;
//             }
            
//             orders.forEach(order => {
//                 const orderCard = document.createElement('div');
//                 orderCard.className = 'order-card';
                
//                 let statusClass = '';
//                 let statusText = '';
                
//                 switch(order.status) {
//                     case 'delivered':
//                         statusClass = 'status-delivered';
//                         statusText = 'Delivered';
//                         break;
//                     case 'shipped':
//                         statusClass = 'status-shipped';
//                         statusText = 'Shipped';
//                         break;
//                     default:
//                         statusClass = 'status-processing';
//                         statusText = 'Processing';
//                 }
                
//                 orderCard.innerHTML = `
//                     <div class="order-header">
//                         <div>
//                             <span class="order-id">Order #${order.id}</span>
//                             <span class="order-date">${order.date}</span>
//                         </div>
//                         <span class="order-status ${statusClass}">${statusText}</span>
//                     </div>
//                     <div class="order-items">
//                         ${order.items.map(item => {
//                             const book = books.find(b => b.id === item.id);
//                             return `
//                                 <div class="order-item">
//                                     <div class="order-item-cover" style="background-image: url('${book.image}')">${book.cover}</div>
//                                     <div class="order-item-details">
//                                         <div class="order-item-title">${book.title}</div>
//                                         <div class="order-item-price">₹${(book.price * item.quantity).toFixed(2)}</div>
//                                         <div>Quantity: ${item.quantity}</div>
//                                         ${order.status === 'delivered' ? '<button class="write-review" data-id="' + book.id + '" style="margin-top: 5px; background-color: #9b59b6; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Write Review</button>' : ''}
//                                     </div>
//                                 </div>
//                             `;
//                         }).join('')}
//                     </div>
//                     <div class="order-footer">
//                         <div class="order-total">Total: ₹${order.total.toFixed(2)}</div>
//                         <button class="track-order" data-order-id="${order.id}">Track Order</button>
//                     </div>
//                 `;
                
//                 orderHistoryContainer.appendChild(orderCard);
//             });
//         }

//         // Render order confirmation
//         function renderOrderConfirmation(order) {
//             confirmationItems.innerHTML = '';
            
//             order.items.forEach(item => {
//                 const book = books.find(b => b.id === item.id);
//                 confirmationItems.innerHTML += `
//                     <div class="order-item">
//                         <span>${book.title} × ${item.quantity}</span>
//                         <span>₹${(book.price * item.quantity).toFixed(2)}</span>
//                     </div>
//                 `;
//             });
            
//             confirmationTotal.textContent = `₹${order.total.toFixed(2)}`;
            
//             // Set tracking order details
//             document.getElementById('tracking-order-id').textContent = order.id;
//             document.getElementById('tracking-order-date').textContent = order.date;
            
//             // Calculate estimated delivery date (5 days from order date)
//             const orderDate = new Date();
//             const deliveryDate = new Date();
//             deliveryDate.setDate(orderDate.getDate() + 5);
            
//             document.getElementById('tracking-delivery-date').textContent = deliveryDate.toLocaleDateString();
            
//             if (currentUser && currentUser.address) {
//                 document.getElementById('tracking-address').textContent = currentUser.address;
//             } else {
//                 document.getElementById('tracking-address').textContent = 'Shanti Shraddha Apartment, Somwar Peth, Pune';
//             }
//         }

//         // Setup event listeners
//         function setupEventListeners() {
//             // Navigation
//             navLinks.forEach(link => {
//                 link.addEventListener('click', (e) => {
//                     e.preventDefault();
//                     const pageId = link.getAttribute('data-page');
//                     showPage(pageId);
//                 });
//             });
            
//             // Theme toggle
//             themeToggle.addEventListener('click', toggleNightMode);
            
//             // Auth buttons
//             loginBtn.addEventListener('click', () => showPage('login'));
//             logoutBtn.addEventListener('click', logout);
            
//             // Search functionality
//             searchButton.addEventListener('click', (e) => {
//                 e.preventDefault();
//                 searchBooks(searchInput.value);
//             });
            
//             searchInput.addEventListener('keyup', (e) => {
//                 if (e.key === 'Enter') {
//                     searchBooks(searchInput.value);
//                 }
//             });
            
//             // Login/register forms
//             loginForm.addEventListener('submit', (e) => {
//                 e.preventDefault();
//                 const email = document.getElementById('login-email').value;
//                 const password = document.getElementById('login-password').value;
//                 login(email, password);
//             });
            
//             registerForm.addEventListener('submit', (e) => {
//                 e.preventDefault();
//                 const name = document.getElementById('register-name').value;
//                 const email = document.getElementById('register-email').value;
//                 const password = document.getElementById('register-password').value;
//                 register(name, email, password);
//             });
            
//             showRegister.addEventListener('click', (e) => {
//                 e.preventDefault();
//                 loginForm.style.display = 'none';
//                 registerForm.style.display = 'block';
//             });
            
//             showLogin.addEventListener('click', (e) => {
//                 e.preventDefault();
//                 registerForm.style.display = 'none';
//                 loginForm.style.display = 'block';
//             });
            
//             // Profile form
//             profileForm.addEventListener('submit', (e) => {
//                 e.preventDefault();
//                 const address = document.getElementById('profile-address').value;
//                 const phone = document.getElementById('profile-phone').value;
//                 updateProfile(address, phone);
//             });
            
//             // Contact form
//             contactForm.addEventListener('submit', (e) => {
//                 e.preventDefault();
//                 const name = document.getElementById('contact-name').value;
//                 const email = document.getElementById('contact-email').value;
//                 const subject = document.getElementById('contact-subject').value;
//                 const message = document.getElementById('contact-message').value;
//                 sendContactForm(name, email, subject, message);
//             });
            
//             // Checkout button
//             checkoutButton.addEventListener('click', (e) => {
//                 e.preventDefault();
//                 paymentModal.classList.add('active');
//             });
            
//             // Payment modal
//             closePaymentModal.addEventListener('click', () => {
//                 paymentModal.classList.remove('active');
//             });
            
//             paymentMethods.forEach(method => {
//                 method.addEventListener('change', (e) => {
//                     creditCardDetails.style.display = 'none';
//                     upiDetails.style.display = 'none';
//                     netBankingDetails.style.display = 'none';
//                     codDetails.style.display = 'none';
                    
//                     switch(e.target.value) {
//                         case 'credit-card':
//                             creditCardDetails.style.display = 'block';
//                             break;
//                         case 'upi':
//                             upiDetails.style.display = 'block';
//                             break;
//                         case 'net-banking':
//                             netBankingDetails.style.display = 'block';
//                             break;
//                         case 'cod':
//                             codDetails.style.display = 'block';
//                             break;
//                     }
//                 });
//             });
            
//             paymentForm.addEventListener('submit', (e) => {
//                 e.preventDefault();
//                 placeOrder();
//                 paymentModal.classList.remove('active');
//             });
            
//             // Order confirmation buttons
//             viewTrackingButton.addEventListener('click', () => {
//                 showPage('order-tracking');
//             });
            
//             continueShoppingButton.addEventListener('click', () => {
//                 showPage('home');
//             });
            
//             // Order tracking button
//             backToOrdersButton.addEventListener('click', () => {
//                 showPage('order-history');
//             });
            
//             // Review stars
//             reviewStars.forEach(star => {
//                 star.addEventListener('click', (e) => {
//                     const rating = parseInt(e.target.getAttribute('data-rating'));
//                     setReviewRating(rating);
//                 });
//             });
            
//             submitReviewButton.addEventListener('click', submitReview);
            
//             // Chatbot events
//             chatbotToggle.addEventListener('click', () => {
//                 chatbotWindow.classList.toggle('active');
//             });
            
//             chatbotClose.addEventListener('click', () => {
//                 chatbotWindow.classList.remove('active');
//             });
            
//             chatbotSend.addEventListener('click', sendChatbotMessage);
            
//             chatbotInput.addEventListener('keypress', (e) => {
//                 if (e.key === 'Enter') {
//                     sendChatbotMessage();
//                 }
//             });
            
//             // Book actions (delegated events)
//             document.addEventListener('click', (e) => {
//                 // Add to cart
//                 if (e.target.classList.contains('add-to-cart')) {
//                     const bookId = parseInt(e.target.getAttribute('data-id'));
//                     addToCart(bookId);
//                 }
                
//                 // Add to favorites
//                 if (e.target.classList.contains('add-to-favorites')) {
//                     const bookId = parseInt(e.target.getAttribute('data-id'));
//                     toggleFavorite(bookId);
//                 }
                
//                 // Write review
//                 if (e.target.classList.contains('write-review')) {
//                     const bookId = parseInt(e.target.getAttribute('data-id'));
//                     openReviewModal(bookId);
//                 }
                
//                 // Cart quantity controls
//                 if (e.target.classList.contains('increase-quantity')) {
//                     const bookId = parseInt(e.target.getAttribute('data-id'));
//                     updateCartItem(bookId, 1);
//                 }
                
//                 if (e.target.classList.contains('decrease-quantity')) {
//                     const bookId = parseInt(e.target.getAttribute('data-id'));
//                     updateCartItem(bookId, -1);
//                 }
                
//                 if (e.target.classList.contains('remove-from-cart')) {
//                     const bookId = parseInt(e.target.getAttribute('data-id'));
//                     removeFromCart(bookId);
//                 }
                
//                 // Track order
//                 if (e.target.classList.contains('track-order')) {
//                     const orderId = e.target.getAttribute('data-order-id');
//                     trackOrder(orderId);
//                 }
//             });
//         }

//         // Show specific page
//         function showPage(pageId) {
//             if (pageId !== 'login' && pageId !== 'home' && !currentUser) {
//                 showPage('login');
//                 return;
//             }
            
//             pages.forEach(page => {
//                 if (page.id === `${pageId}-page`) {
//                     page.classList.add('active');
//                 } else {
//                     page.classList.remove('active');
//                 }
//             });
            
//             // Update specific page content if needed
//             if (pageId === 'cart') {
//                 renderCart();
//             } else if (pageId === 'favorites') {
//                 renderFavorites();
//             } else if (pageId === 'profile' && currentUser) {
//                 updateProfileDisplay();
//             } else if (pageId === 'order-history') {
//                 renderOrderHistory();
//             } else if (pageId === 'home') {
//                 searchInput.value = '';
//                 filteredBooks = [...books];
//                 renderBooks();
//             }
//         }

//         // Auth functions
//         function login(email, password) {
//             // In a real app, this would be an API call
//             currentUser = {
//                 name: email.split('@')[0],
//                 email: email,
//                 joinDate: new Date().toLocaleDateString(),
//                 address: 'Shanti Shraddha Apartment, Somwar Peth, Pune',
//                 phone: '9689861125'
//             };
            
//             // Load user data from localStorage if available
//             const userData = localStorage.getItem(`user_${email}`);
//             if (userData) {
//                 currentUser = JSON.parse(userData);
//             }
            
//             // Load cart and favorites from localStorage
//             const savedCart = localStorage.getItem(`cart_${email}`);
//             if (savedCart) {
//                 cart = JSON.parse(savedCart);
//             }
            
//             const savedFavorites = localStorage.getItem(`favorites_${email}`);
//             if (savedFavorites) {
//                 favorites = JSON.parse(savedFavorites);
//             }
            
//             // Load orders from localStorage
//             const savedOrders = localStorage.getItem(`orders_${email}`);
//             if (savedOrders) {
//                 orders = JSON.parse(savedOrders);
//             }
            
//             checkAuthState();
//             showPage('home');
//             renderBooks();
//         }
        
//         function register(name, email, password) {
//             // In a real app, this would be an API call
//             currentUser = {
//                 name: name,
//                 email: email,
//                 joinDate: new Date().toLocaleDateString(),
//                 address: 'Shanti Shraddha Apartment, Somwar Peth, Pune',
//                 phone: '9689861125'
//             };
            
//             // Save user data to localStorage
//             localStorage.setItem(`user_${email}`, JSON.stringify(currentUser));
            
//             checkAuthState();
//             showPage('home');
//             renderBooks();
//         }
        
//         function logout() {
//             // Save cart, favorites and orders before logging out
//             if (currentUser) {
//                 localStorage.setItem(`cart_${currentUser.email}`, JSON.stringify(cart));
//                 localStorage.setItem(`favorites_${currentUser.email}`, JSON.stringify(favorites));
//                 localStorage.setItem(`orders_${currentUser.email}`, JSON.stringify(orders));
//             }
            
//             currentUser = null;
//             cart = [];
//             favorites = [];
//             orders = [];
            
//             checkAuthState();
//             showPage('home');
//             renderBooks();
//         }
        
//         function checkAuthState() {
//             if (currentUser) {
//                 loginBtn.style.display = 'none';
//                 logoutBtn.style.display = 'block';
//             } else {
//                 loginBtn.style.display = 'block';
//                 logoutBtn.style.display = 'none';
//             }
//         }

//         // Profile functions
//         function updateProfile(address, phone) {
//             if (!currentUser) return;
            
//             currentUser.address = address;
//             currentUser.phone = phone;
            
//             // Save to localStorage
//             localStorage.setItem(`user_${currentUser.email}`, JSON.stringify(currentUser));
            
//             alert('Profile updated successfully!');
//         }
        
//         function updateProfileDisplay() {
//             if (!currentUser) return;
            
//             profileName.textContent = currentUser.name;
//             profileEmail.textContent = currentUser.email;
//             profileJoinDate.textContent = currentUser.joinDate;
//             document.getElementById('profile-address').value = currentUser.address || '';
//             document.getElementById('profile-phone').value = currentUser.phone || '';
//         }

//         // Cart functions
//         function addToCart(bookId) {
//             if (!currentUser) {
//                 showPage('login');
//                 return;
//             }
            
//             const existingItem = cart.find(item => item.id === bookId);
            
//             if (existingItem) {
//                 existingItem.quantity += 1;
//             } else {
//                 cart.push({ id: bookId, quantity: 1 });
//             }
            
//             renderCart();
//         }
        
//         function updateCartItem(bookId, change) {
//             const item = cart.find(item => item.id === bookId);
            
//             if (item) {
//                 item.quantity += change;
                
//                 if (item.quantity <= 0) {
//                     cart = cart.filter(item => item.id !== bookId);
//                 }
//             }
            
//             renderCart();
//         }
        
//         function removeFromCart(bookId) {
//             cart = cart.filter(item => item.id !== bookId);
//             renderCart();
//         }

//         // Favorites functions
//         function toggleFavorite(bookId) {
//             if (!currentUser) {
//                 showPage('login');
//                 return;
//             }
            
//             const book = books.find(b => b.id === bookId);
//             const existingIndex = favorites.findIndex(fav => fav.id === bookId);
            
//             if (existingIndex >= 0) {
//                 favorites.splice(existingIndex, 1);
//             } else {
//                 favorites.push(book);
//             }
            
//             renderBooks();
//             renderFavorites();
//         }

//         // Order functions
//         function placeOrder() {
//             if (!currentUser || cart.length === 0) return;
            
//             const orderId = currentOrderId++;
//             const orderDate = new Date().toLocaleDateString();
//             let total = 0;
            
//             const orderItems = cart.map(item => {
//                 const book = books.find(b => b.id === item.id);
//                 total += book.price * item.quantity;
//                 return { id: item.id, quantity: item.quantity };
//             });
            
//             const order = {
//                 id: orderId,
//                 date: orderDate,
//                 items: orderItems,
//                 total: total,
//                 status: 'processing'
//             };
            
//             orders.unshift(order);
            
//             // Save orders to localStorage
//             localStorage.setItem(`orders_${currentUser.email}`, JSON.stringify(orders));
            
//             // Clear cart
//             cart = [];
//             renderCart();
            
//             // Show order confirmation
//             renderOrderConfirmation(order);
//             showPage('order-confirmation');
//         }

//         function trackOrder(orderId) {
//             const order = orders.find(o => o.id == orderId);
//             if (order) {
//                 renderOrderConfirmation(order);
                
//                 // Update tracking steps based on order status
//                 const steps = document.querySelectorAll('.tracking-step');
//                 steps.forEach((step, index) => {
//                     const stepNumber = step.querySelector('.step-number');
//                     const stepLabel = step.querySelector('.step-label');
                    
//                     if (order.status === 'processing' && index <= 1) {
//                         stepNumber.classList.add('active');
//                         stepLabel.classList.add('active');
//                     } else if (order.status === 'shipped' && index <= 2) {
//                         stepNumber.classList.add('active');
//                         stepLabel.classList.add('active');
//                     } else if (order.status === 'delivered' && index <= 3) {
//                         stepNumber.classList.add('active');
//                         stepLabel.classList.add('active');
//                     } else {
//                         stepNumber.classList.remove('active');
//                         stepLabel.classList.remove('active');
//                     }
//                 });
                
//                 showPage('order-tracking');
//             }
//         }

//         // Review functions
//         function openReviewModal(bookId) {
//             currentReviewBookId = bookId;
//             const book = books.find(b => b.id === bookId);
//             reviewBookTitle.textContent = book.title;
//             reviewModal.classList.add('active');
            
//             // Reset stars
//             reviewStars.forEach(star => {
//                 star.classList.remove('selected');
//             });
//         }

//         function setReviewRating(rating) {
//             reviewStars.forEach(star => {
//                 const starRating = parseInt(star.getAttribute('data-rating'));
//                 if (starRating <= rating) {
//                     star.classList.add('selected');
//                 } else {
//                     star.classList.remove('selected');
//                 }
//             });
//         }

//         function submitReview() {
//             const rating = document.querySelectorAll('.review-star.selected').length;
//             const reviewText = document.querySelector('.review-text').value;
            
//             if (rating === 0) {
//                 alert('Please select a rating');
//                 return;
//             }
            
//             // In a real app, this would be saved to a database
//             alert(`Thank you for your ${rating}-star review!\n\n"${reviewText}"`);
            
//             // Close modal
//             reviewModal.classList.remove('active');
            
//             // Clear review text
//             document.querySelector('.review-text').value = '';
//         }

//         // Contact form function
//         function sendContactForm(name, email, subject, message) {
//             // In a real app, this would be an API call
//             console.log('Contact form submitted:', { name, email, subject, message });
//             alert('Thank you for your message! We will get back to you soon.');
//             contactForm.reset();
//         }

//         // Chatbot functions
//         function sendChatbotMessage() {
//             const message = chatbotInput.value.trim();
//             if (!message) return;
            
//             // Add user message to chat
//             addChatbotMessage(message, 'user');
//             chatbotInput.value = '';
            
//             // Process user message and generate response
//             setTimeout(() => {
//                 const response = generateChatbotResponse(message);
//                 addChatbotMessage(response, 'bot');
//             }, 500);
//         }
        
//         function addChatbotMessage(text, sender) {
//             const messageDiv = document.createElement('div');
//             messageDiv.className = `chatbot-message ${sender}-message`;
//             messageDiv.textContent = text;
//             chatbotMessages.appendChild(messageDiv);
//             chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
//         }
        
//         function generateChatbotResponse(message) {
//             const lowerMessage = message.toLowerCase();
            
//             if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
//                 return "Hello! How can I help you today?";
//             } else if (lowerMessage.includes('help')) {
//                 return "I can help you with book recommendations, order status, or general questions about BookShelf. What would you like to know?";
//             } else if (lowerMessage.includes('order') || lowerMessage.includes('track')) {
//                 return "To check your order status, please visit the 'Orders' page in your account. You can track your order there.";
//             } else if (lowerMessage.includes('book') || lowerMessage.includes('recommend')) {
//                 const randomBook = books[Math.floor(Math.random() * books.length)];
//                 return `I recommend "${randomBook.title}" by ${randomBook.author}. It's a great ${randomBook.genre} book!`;
//             } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
//                 return "You can see prices for all books on our website. Prices are displayed below each book's title.";
//             } else if (lowerMessage.includes('contact') || lowerMessage.includes('support')) {
//                 return "You can contact our support team through the 'Contact Us' page or email us at support@bookshelf.com.";
//             } else if (lowerMessage.includes('thanks') || lowerMessage.includes('thank you')) {
//                 return "You're welcome! Is there anything else I can help you with?";
//             } else {
//                 return "I'm sorry, I didn't understand that. Could you please rephrase your question? I can help with book recommendations, order status, and general questions.";
//             }
//         }

//         // Initialize the app
//         init();
    

















// // App state
// let currentUser = null;
// let books = [];
// let cart = [];
// let favorites = [];
// let filteredBooks = [];
// let orders = [];
// let currentOrderId = 1000;
// let currentReviewBookId = null;

// // DOM elements
// const pages = document.querySelectorAll('.page');
// const navLinks = document.querySelectorAll('.nav-link');
// const loginBtn = document.getElementById('login-btn');
// const logoutBtn = document.getElementById('logout-btn');
// const themeToggle = document.getElementById('theme-toggle');
// const cartCount = document.getElementById('cart-count');
// const featuredBooksContainer = document.getElementById('featured-books');
// const cartItemsContainer = document.getElementById('cart-items');
// const cartSummary = document.getElementById('cart-summary');
// const cartTotal = document.getElementById('cart-total');
// const favoritesGrid = document.getElementById('favorites-grid');
// const loginForm = document.getElementById('login-form');
// const registerForm = document.getElementById('register-form');
// const showRegister = document.getElementById('show-register');
// const showLogin = document.getElementById('show-login');
// const profileForm = document.getElementById('profile-form');
// const profileName = document.getElementById('profile-name');
// const profileEmail = document.getElementById('profile-email');
// const profileJoinDate = document.getElementById('profile-join-date');
// const contactForm = document.getElementById('contact-form');
// const searchInput = document.getElementById('search-input');
// const searchButton = document.getElementById('search-button');
// const checkoutButton = document.getElementById('checkout-button');
// const paymentModal = document.getElementById('payment-modal');
// const closePaymentModal = document.getElementById('close-payment-modal');
// const paymentForm = document.getElementById('payment-form');
// const orderConfirmationPage = document.getElementById('order-confirmation-page');
// const confirmationItems = document.getElementById('confirmation-items');
// const confirmationTotal = document.getElementById('confirmation-total');
// const viewTrackingButton = document.getElementById('view-tracking-button');
// const continueShoppingButton = document.getElementById('continue-shopping-button');
// const orderTrackingPage = document.getElementById('order-tracking-page');
// const backToOrdersButton = document.getElementById('back-to-orders-button');
// const orderHistoryPage = document.getElementById('order-history-page');
// const orderHistoryContainer = document.getElementById('order-history');
// const reviewModal = document.getElementById('review-modal');
// const reviewBookTitle = document.getElementById('review-book-title');
// const reviewStars = document.querySelectorAll('.review-star');
// const submitReviewButton = document.getElementById('submit-review');
// const addBookForm = document.getElementById('add-book-form');

// // Chatbot elements
// const chatbotToggle = document.getElementById('chatbot-toggle');
// const chatbotWindow = document.getElementById('chatbot-window');
// const chatbotClose = document.getElementById('chatbot-close');
// const chatbotMessages = document.getElementById('chatbot-messages');
// const chatbotInput = document.getElementById('chatbot-input');
// const chatbotSend = document.getElementById('chatbot-send');

// // Initialize the app
// function init() {
//     console.log("🚀 Initializing BookShelf...");
//     setupEventListeners();
//     checkAuthState();
//     checkTheme();
//     fetchBooks(); // Load books on startup
// }

// // Check and apply saved theme
// function checkTheme() {
//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme === 'night') {
//         document.body.classList.add('night-mode');
//         themeToggle.textContent = 'Day Mode';
//     }
// }

// // Toggle night mode
// function toggleNightMode() {
//     document.body.classList.toggle('night-mode');
//     if (document.body.classList.contains('night-mode')) {
//         themeToggle.textContent = 'Day Mode';
//         localStorage.setItem('theme', 'night');
//     } else {
//         themeToggle.textContent = 'Night Mode';
//         localStorage.setItem('theme', 'day');
//     }
// }

// // Fetch books from backend
// async function fetchBooks() {
//     try {
//         console.log("📚 Fetching books from backend...");
//         featuredBooksContainer.innerHTML = '<div class="loading">Loading books...</div>';
        
//         const response = await fetch('http://127.0.0.1:5000/api/books');
        
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const serverBooks = await response.json();
//         console.log("✅ Books loaded:", serverBooks);
        
//         books = serverBooks.map(book => ({
//             ...book,
//             id: String(book.id)
//         }));
        
//         filteredBooks = [...books];
//         renderBooks();
        
//     } catch (error) {
//         console.error("❌ Error loading books:", error);
//         featuredBooksContainer.innerHTML = `
//             <div class="error-message">
//                 <h3>⚠️ Connection Error</h3>
//                 <p>Could not load books from server.</p>
//                 <p><small>Make sure Python backend is running on http://127.0.0.1:5000</small></p>
//                 <button onclick="fetchBooks()" class="retry-button">Try Again</button>
//             </div>
//         `;
//     }
// }

// // Render books on the home page
// function renderBooks() {
//     console.log("🎨 Rendering books...");
//     featuredBooksContainer.innerHTML = '';
    
//     if (filteredBooks.length === 0) {
//         featuredBooksContainer.innerHTML = '<p class="no-books">No books found matching your search.</p>';
//         return;
//     }
    
//     filteredBooks.forEach(book => {
//         const isFavorite = favorites.some(fav => fav.id === book.id);
        
//         const bookCard = document.createElement('div');
//         bookCard.className = 'book-card';
//         bookCard.innerHTML = `
//             <div class="book-cover" style="background-image: url('${book.image}')">
//                 ${!book.image ? '📚' : ''}
//             </div>
//             <div class="book-details">
//                 <h3>${book.title}</h3>
//                 <p class="author">by ${book.author}</p>
//                 <p class="genre">${book.genre}</p>
//                 <div class="rating">
//                     ${renderStars(book.rating)}
//                     <span class="review-count">(${book.reviews})</span>
//                 </div>
//                 <div class="book-price">₹${book.price.toFixed(2)}</div>
//                 <div class="book-actions">
//                     <button class="add-to-cart" data-id="${book.id}">Add to Cart</button>
//                     <button class="add-to-favorites" data-id="${book.id}" 
//                             style="background-color: ${isFavorite ? '#e67e22' : '#f1c40f'}">
//                         ${isFavorite ? '❤️' : '🤍'}
//                     </button>
//                 </div>
//             </div>
//         `;
        
//         featuredBooksContainer.appendChild(bookCard);
//     });
// }

// // Render star ratings
// function renderStars(rating) {
//     let stars = '';
//     const fullStars = Math.floor(rating);
    
//     for (let i = 1; i <= 5; i++) {
//         if (i <= fullStars) {
//             stars += '★';
//         } else {
//             stars += '☆';
//         }
//     }
    
//     return stars;
// }

// // Search books
// function searchBooks(query) {
//     if (!query.trim()) {
//         filteredBooks = [...books];
//     } else {
//         const lowerQuery = query.toLowerCase();
//         filteredBooks = books.filter(book => 
//             book.title.toLowerCase().includes(lowerQuery) ||
//             book.author.toLowerCase().includes(lowerQuery) ||
//             book.genre.toLowerCase().includes(lowerQuery)
//         );
//     }
//     renderBooks();
// }

// // Render cart items
// function renderCart() {
//     cartItemsContainer.innerHTML = '';
    
//     if (cart.length === 0) {
//         cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
//         cartSummary.style.display = 'none';
//         return;
//     }
    
//     cartSummary.style.display = 'block';
    
//     let total = 0;
    
//     cart.forEach(item => {
//         const book = books.find(b => b.id === item.id);
//         if (book) {
//             total += book.price * item.quantity;
            
//             const cartItem = document.createElement('div');
//             cartItem.className = 'cart-item';
//             cartItem.innerHTML = `
//                 <div class="cart-item-cover" style="background-image: url('${book.image}')">
//                     ${!book.image ? '📚' : ''}
//                 </div>
//                 <div class="cart-item-details">
//                     <div class="cart-item-title">${book.title}</div>
//                     <div class="cart-item-price">₹${(book.price * item.quantity).toFixed(2)}</div>
//                 </div>
//                 <div class="cart-item-actions">
//                     <button class="decrease-quantity" data-id="${book.id}">-</button>
//                     <div class="cart-item-quantity">${item.quantity}</div>
//                     <button class="increase-quantity" data-id="${book.id}">+</button>
//                     <button class="remove-from-cart" data-id="${book.id}">×</button>
//                 </div>
//             `;
            
//             cartItemsContainer.appendChild(cartItem);
//         }
//     });
    
//     cartTotal.textContent = `₹${total.toFixed(2)}`;
//     cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
// }

// // Setup event listeners
// function setupEventListeners() {
//     console.log("🔧 Setting up event listeners...");
    
//     // Navigation
//     navLinks.forEach(link => {
//         link.addEventListener('click', (e) => {
//             e.preventDefault();
//             const pageId = link.getAttribute('data-page');
//             showPage(pageId);
//         });
//     });
    
//     // Theme toggle
//     themeToggle.addEventListener('click', toggleNightMode);
    
//     // Auth buttons
//     loginBtn.addEventListener('click', () => showPage('login'));
//     logoutBtn.addEventListener('click', logout);
    
//     // Search functionality
//     searchButton.addEventListener('click', (e) => {
//         e.preventDefault();
//         searchBooks(searchInput.value);
//     });
    
//     searchInput.addEventListener('keyup', (e) => {
//         if (e.key === 'Enter') {
//             searchBooks(searchInput.value);
//         }
//     });
    
//     // Login/register forms
//     loginForm.addEventListener('submit', (e) => {
//         e.preventDefault();
//         const email = document.getElementById('login-email').value;
//         const password = document.getElementById('login-password').value;
//         login(email, password);
//     });
    
//     registerForm.addEventListener('submit', (e) => {
//         e.preventDefault();
//         const name = document.getElementById('register-name').value;
//         const email = document.getElementById('register-email').value;
//         const password = document.getElementById('register-password').value;
//         register(name, email, password);
//     });
    
//     showRegister.addEventListener('click', (e) => {
//         e.preventDefault();
//         loginForm.style.display = 'none';
//         registerForm.style.display = 'block';
//     });
    
//     showLogin.addEventListener('click', (e) => {
//         e.preventDefault();
//         registerForm.style.display = 'none';
//         loginForm.style.display = 'block';
//     });
    
//     // Profile form
//     profileForm.addEventListener('submit', (e) => {
//         e.preventDefault();
//         const address = document.getElementById('profile-address').value;
//         const phone = document.getElementById('profile-phone').value;
//         updateProfile(address, phone);
//     });
    
//     // Add book form
//     addBookForm.addEventListener('submit', (e) => {
//         e.preventDefault();
//         addNewBook();
//     });
    
//     // Checkout button
//     checkoutButton.addEventListener('click', (e) => {
//         e.preventDefault();
//         if (cart.length === 0) {
//             alert('Your cart is empty!');
//             return;
//         }
//         paymentModal.classList.add('active');
//     });
    
//     // Payment modal
//     closePaymentModal.addEventListener('click', () => {
//         paymentModal.classList.remove('active');
//     });
    
//     paymentForm.addEventListener('submit', (e) => {
//         e.preventDefault();
//         placeOrder();
//         paymentModal.classList.remove('active');
//     });
    
//     // Payment method toggle
//     document.querySelectorAll('input[name="payment-method"]').forEach(method => {
//         method.addEventListener('change', (e) => {
//             document.querySelectorAll('.payment-details').forEach(detail => {
//                 detail.style.display = 'none';
//             });
//             document.getElementById(e.target.value + '-details').style.display = 'block';
//         });
//     });
    
//     // Order confirmation buttons
//     viewTrackingButton.addEventListener('click', () => {
//         showPage('order-tracking');
//     });
    
//     continueShoppingButton.addEventListener('click', () => {
//         showPage('home');
//     });
    
//     // Order tracking button
//     backToOrdersButton.addEventListener('click', () => {
//         showPage('order-history');
//     });
    
//     // Review stars
//     reviewStars.forEach(star => {
//         star.addEventListener('click', (e) => {
//             const rating = parseInt(e.target.getAttribute('data-rating'));
//             setReviewRating(rating);
//         });
//     });
    
//     submitReviewButton.addEventListener('click', submitReview);
    
//     // Chatbot events
//     chatbotToggle.addEventListener('click', () => {
//         chatbotWindow.classList.toggle('active');
//     });
    
//     chatbotClose.addEventListener('click', () => {
//         chatbotWindow.classList.remove('active');
//     });
    
//     chatbotSend.addEventListener('click', sendChatbotMessage);
    
//     chatbotInput.addEventListener('keypress', (e) => {
//         if (e.key === 'Enter') {
//             sendChatbotMessage();
//         }
//     });
    
//     // Book actions (delegated events)
//     document.addEventListener('click', (e) => {
//         const target = e.target;
        
//         // Add to cart
//         if (target.classList.contains('add-to-cart')) {
//             const bookId = target.getAttribute('data-id');
//             addToCart(bookId);
//         }
        
//         // Add to favorites
//         if (target.classList.contains('add-to-favorites')) {
//             const bookId = target.getAttribute('data-id');
//             toggleFavorite(bookId);
//         }
        
//         // Cart quantity controls
//         if (target.classList.contains('increase-quantity')) {
//             const bookId = target.getAttribute('data-id');
//             updateCartItem(bookId, 1);
//         }
        
//         if (target.classList.contains('decrease-quantity')) {
//             const bookId = target.getAttribute('data-id');
//             updateCartItem(bookId, -1);
//         }
        
//         if (target.classList.contains('remove-from-cart')) {
//             const bookId = target.getAttribute('data-id');
//             removeFromCart(bookId);
//         }
//     });
    
//     console.log("✅ Event listeners setup complete");
// }

// // Show specific page
// function showPage(pageId) {
//     console.log("📄 Showing page:", pageId);
    
//     // Check authentication for protected pages
//     const protectedPages = ['profile', 'cart', 'favorites', 'order-history', 'admin'];
//     if (protectedPages.includes(pageId) && !currentUser) {
//         showPage('login');
//         return;
//     }
    
//     // Hide all pages
//     pages.forEach(page => {
//         page.classList.remove('active');
//     });
    
//     // Show target page
//     const targetPage = document.getElementById(`${pageId}-page`);
//     if (targetPage) {
//         targetPage.classList.add('active');
//     }
    
//     // Update page-specific content
//     switch(pageId) {
//         case 'cart':
//             renderCart();
//             break;
//         case 'favorites':
//             renderFavorites();
//             break;
//         case 'profile':
//             updateProfileDisplay();
//             break;
//         case 'order-history':
//             renderOrderHistory();
//             break;
//         case 'home':
//             searchInput.value = '';
//             filteredBooks = [...books];
//             renderBooks();
//             break;
//     }
// }

// // Auth functions
// function login(email, password) {
//     console.log("🔐 Logging in:", email);
    
//     // Simple validation
//     if (!email || !password) {
//         alert('Please enter both email and password');
//         return;
//     }
    
//     currentUser = {
//         name: email.split('@')[0],
//         email: email,
//         joinDate: new Date().toLocaleDateString(),
//         address: '',
//         phone: ''
//     };
    
//     // Load user data from localStorage
//     const userData = localStorage.getItem(`user_${email}`);
//     if (userData) {
//         currentUser = { ...currentUser, ...JSON.parse(userData) };
//     }
    
//     // Load user-specific data
//     const savedCart = localStorage.getItem(`cart_${email}`);
//     if (savedCart) cart = JSON.parse(savedCart);
    
//     const savedFavorites = localStorage.getItem(`favorites_${email}`);
//     if (savedFavorites) favorites = JSON.parse(savedFavorites);
    
//     const savedOrders = localStorage.getItem(`orders_${email}`);
//     if (savedOrders) orders = JSON.parse(savedOrders);
    
//     checkAuthState();
//     showPage('home');
//     alert(`Welcome back, ${currentUser.name}!`);
// }

// function register(name, email, password) {
//     console.log("📝 Registering:", name, email);
    
//     if (!name || !email || !password) {
//         alert('Please fill all fields');
//         return;
//     }
    
//     currentUser = {
//         name: name,
//         email: email,
//         joinDate: new Date().toLocaleDateString(),
//         address: '',
//         phone: ''
//     };
    
//     // Save to localStorage
//     localStorage.setItem(`user_${email}`, JSON.stringify(currentUser));
    
//     // Initialize empty arrays for new user
//     cart = [];
//     favorites = [];
//     orders = [];
    
//     checkAuthState();
//     showPage('home');
//     alert(`Account created successfully! Welcome, ${name}!`);
// }

// function logout() {
//     console.log("🚪 Logging out");
    
//     // Save data before logout
//     if (currentUser) {
//         localStorage.setItem(`cart_${currentUser.email}`, JSON.stringify(cart));
//         localStorage.setItem(`favorites_${currentUser.email}`, JSON.stringify(favorites));
//         localStorage.setItem(`orders_${currentUser.email}`, JSON.stringify(orders));
//     }
    
//     currentUser = null;
//     cart = [];
//     favorites = [];
//     orders = [];
    
//     checkAuthState();
//     showPage('home');
// }

// function checkAuthState() {
//     if (currentUser) {
//         loginBtn.style.display = 'none';
//         logoutBtn.style.display = 'block';
//     } else {
//         loginBtn.style.display = 'block';
//         logoutBtn.style.display = 'none';
//     }
// }

// // Cart functions
// function addToCart(bookId) {
//     if (!currentUser) {
//         showPage('login');
//         return;
//     }
    
//     const existingItem = cart.find(item => item.id === bookId);
    
//     if (existingItem) {
//         existingItem.quantity += 1;
//     } else {
//         cart.push({ id: bookId, quantity: 1 });
//     }
    
//     renderCart();
//     alert('Book added to cart!');
// }

// function updateCartItem(bookId, change) {
//     const item = cart.find(item => item.id === bookId);
    
//     if (item) {
//         item.quantity += change;
        
//         if (item.quantity <= 0) {
//             cart = cart.filter(item => item.id !== bookId);
//         }
//     }
    
//     renderCart();
// }

// function removeFromCart(bookId) {
//     cart = cart.filter(item => item.id !== bookId);
//     renderCart();
// }

// // Favorites functions
// function toggleFavorite(bookId) {
//     if (!currentUser) {
//         showPage('login');
//         return;
//     }
    
//     const book = books.find(b => b.id === bookId);
//     const existingIndex = favorites.findIndex(fav => fav.id === bookId);
    
//     if (existingIndex >= 0) {
//         favorites.splice(existingIndex, 1);
//         alert('Removed from favorites');
//     } else {
//         favorites.push(book);
//         alert('Added to favorites!');
//     }
    
//     renderBooks();
// }

// function renderFavorites() {
//     favoritesGrid.innerHTML = '';
    
//     if (favorites.length === 0) {
//         favoritesGrid.innerHTML = '<p class="empty-favorites-message">You don\'t have any favorite books yet</p>';
//         return;
//     }
    
//     favorites.forEach(book => {
//         const favoriteCard = document.createElement('div');
//         favoriteCard.className = 'book-card';
//         favoriteCard.innerHTML = `
//             <div class="book-cover" style="background-image: url('${book.image}')">
//                 ${!book.image ? '📚' : ''}
//             </div>
//             <div class="book-details">
//                 <h3>${book.title}</h3>
//                 <p class="author">by ${book.author}</p>
//                 <p class="genre">${book.genre}</p>
//                 <div class="rating">
//                     ${renderStars(book.rating)}
//                     <span class="review-count">(${book.reviews})</span>
//                 </div>
//                 <div class="book-price">₹${book.price.toFixed(2)}</div>
//                 <div class="book-actions">
//                     <button class="add-to-cart" data-id="${book.id}">Add to Cart</button>
//                     <button class="add-to-favorites" data-id="${book.id}" style="background-color: #e67e22">❤️</button>
//                 </div>
//             </div>
//         `;
        
//         favoritesGrid.appendChild(favoriteCard);
//     });
// }

// // Order functions
// function placeOrder() {
//     if (!currentUser || cart.length === 0) return;
    
//     const orderId = currentOrderId++;
//     const orderDate = new Date().toLocaleDateString();
//     let total = 0;
    
//     const orderItems = cart.map(item => {
//         const book = books.find(b => b.id === item.id);
//         total += book.price * item.quantity;
//         return { id: item.id, quantity: item.quantity };
//     });
    
//     const order = {
//         id: orderId,
//         date: orderDate,
//         items: orderItems,
//         total: total,
//         status: 'processing'
//     };
    
//     orders.unshift(order);
    
//     // Save orders
//     localStorage.setItem(`orders_${currentUser.email}`, JSON.stringify(orders));
    
//     // Clear cart
//     cart = [];
//     renderCart();
    
//     // Show confirmation
//     renderOrderConfirmation(order);
//     showPage('order-confirmation');
    
//     alert('Order placed successfully!');
// }

// function renderOrderConfirmation(order) {
//     confirmationItems.innerHTML = '';
    
//     order.items.forEach(item => {
//         const book = books.find(b => b.id === item.id);
//         confirmationItems.innerHTML += `
//             <div class="order-item">
//                 <span>${book.title} × ${item.quantity}</span>
//                 <span>₹${(book.price * item.quantity).toFixed(2)}</span>
//             </div>
//         `;
//     });
    
//     confirmationTotal.textContent = `₹${order.total.toFixed(2)}`;
// }

// function renderOrderHistory() {
//     orderHistoryContainer.innerHTML = '';
    
//     if (orders.length === 0) {
//         orderHistoryContainer.innerHTML = '<p class="empty-orders-message">You haven\'t placed any orders yet</p>';
//         return;
//     }
    
//     orders.forEach(order => {
//         const orderCard = document.createElement('div');
//         orderCard.className = 'order-card';
//         orderCard.innerHTML = `
//             <div class="order-header">
//                 <div>
//                     <span class="order-id">Order #${order.id}</span>
//                     <span class="order-date">${order.date}</span>
//                 </div>
//                 <span class="order-status status-processing">Processing</span>
//             </div>
//             <div class="order-total">Total: ₹${order.total.toFixed(2)}</div>
//         `;
        
//         orderHistoryContainer.appendChild(orderCard);
//     });
// }

// // Add book to database
// async function addNewBook() {
//     const newBook = {
//         title: document.getElementById('book-title').value,
//         author: document.getElementById('book-author').value,
//         price: parseFloat(document.getElementById('book-price').value),
//         genre: document.getElementById('book-genre').value,
//         image: document.getElementById('book-image').value,
//         rating: parseFloat(document.getElementById('book-rating').value),
//         reviews: parseInt(document.getElementById('book-reviews').value)
//     };

//     try {
//         const response = await fetch('http://127.0.0.1:5000/api/books', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(newBook)
//         });

//         if (response.ok) {
//             alert('Book added successfully to database!');
//             addBookForm.reset();
//             await fetchBooks(); // Refresh the book list
//         } else {
//             alert('Error adding book');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         alert('Error adding book. Check console for details.');
//     }
// }

// // Profile functions
// function updateProfile(address, phone) {
//     if (!currentUser) return;
    
//     currentUser.address = address;
//     currentUser.phone = phone;
    
//     localStorage.setItem(`user_${currentUser.email}`, JSON.stringify(currentUser));
//     alert('Profile updated successfully!');
// }

// function updateProfileDisplay() {
//     if (!currentUser) return;
    
//     profileName.textContent = currentUser.name;
//     profileEmail.textContent = currentUser.email;
//     profileJoinDate.textContent = currentUser.joinDate;
//     document.getElementById('profile-address').value = currentUser.address || '';
//     document.getElementById('profile-phone').value = currentUser.phone || '';
// }

// // Review functions
// function openReviewModal(bookId) {
//     currentReviewBookId = bookId;
//     const book = books.find(b => b.id === bookId);
//     reviewBookTitle.textContent = book.title;
//     reviewModal.classList.add('active');
// }

// function setReviewRating(rating) {
//     reviewStars.forEach(star => {
//         const starRating = parseInt(star.getAttribute('data-rating'));
//         star.classList.toggle('selected', starRating <= rating);
//     });
// }

// function submitReview() {
//     const rating = document.querySelectorAll('.review-star.selected').length;
//     const reviewText = document.querySelector('.review-text').value;
    
//     if (rating === 0) {
//         alert('Please select a rating');
//         return;
//     }
    
//     alert(`Thank you for your ${rating}-star review!\n\n"${reviewText}"`);
//     reviewModal.classList.remove('active');
//     document.querySelector('.review-text').value = '';
// }

// // Chatbot functions
// function sendChatbotMessage() {
//     const message = chatbotInput.value.trim();
//     if (!message) return;
    
//     addChatbotMessage(message, 'user');
//     chatbotInput.value = '';
    
//     setTimeout(() => {
//         const response = generateChatbotResponse(message);
//         addChatbotMessage(response, 'bot');
//     }, 500);
// }

// function addChatbotMessage(text, sender) {
//     const messageDiv = document.createElement('div');
//     messageDiv.className = `chatbot-message ${sender}-message`;
//     messageDiv.textContent = text;
//     chatbotMessages.appendChild(messageDiv);
//     chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
// }

// function generateChatbotResponse(message) {
//     const lowerMessage = message.toLowerCase();
    
//     if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
//         return "Hello! How can I help you today?";
//     } else if (lowerMessage.includes('order') || lowerMessage.includes('track')) {
//         return "You can check your orders in the 'Orders' section of your account.";
//     } else if (lowerMessage.includes('book') || lowerMessage.includes('recommend')) {
//         return "We have a great collection of books! Browse our homepage to find your next favorite read.";
//     } else if (lowerMessage.includes('contact')) {
//         return "You can reach us through the Contact Us page or email support@bookshelf.com";
//     } else {
//         return "I'm here to help! You can ask me about books, orders, or general questions.";
//     }
// }

// // Initialize the app when DOM is loaded
// document.addEventListener('DOMContentLoaded', init);










// App state
let currentUser = null;
let books = [];
let cart = [];
let favorites = [];
let filteredBooks = [];
let orders = [];
let currentOrderId = 1000;
let currentReviewBookId = null;

// DOM elements
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const themeToggle = document.getElementById('theme-toggle');
const cartCount = document.getElementById('cart-count');
const featuredBooksContainer = document.getElementById('featured-books');
const cartItemsContainer = document.getElementById('cart-items');
const cartSummary = document.getElementById('cart-summary');
const cartTotal = document.getElementById('cart-total');
const favoritesGrid = document.getElementById('favorites-grid');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');
const profileForm = document.getElementById('profile-form');
const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('profile-email');
const profileJoinDate = document.getElementById('profile-join-date');
const contactForm = document.getElementById('contact-form');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const checkoutButton = document.getElementById('checkout-button');
const paymentModal = document.getElementById('payment-modal');
const closePaymentModal = document.getElementById('close-payment-modal');
const paymentForm = document.getElementById('payment-form');
const orderConfirmationPage = document.getElementById('order-confirmation-page');
const confirmationItems = document.getElementById('confirmation-items');
const confirmationTotal = document.getElementById('confirmation-total');
const viewTrackingButton = document.getElementById('view-tracking-button');
const continueShoppingButton = document.getElementById('continue-shopping-button');
const orderTrackingPage = document.getElementById('order-tracking-page');
const backToOrdersButton = document.getElementById('back-to-orders-button');
const orderHistoryPage = document.getElementById('order-history-page');
const orderHistoryContainer = document.getElementById('order-history');
const reviewModal = document.getElementById('review-modal');
const reviewBookTitle = document.getElementById('review-book-title');
const reviewStars = document.querySelectorAll('.review-star');
const submitReviewButton = document.getElementById('submit-review');
const addBookForm = document.getElementById('add-book-form');

// Chatbot elements
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');

// Payment method elements
const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
const creditCardDetails = document.getElementById('credit-card-details');
const upiDetails = document.getElementById('upi-details');
const netBankingDetails = document.getElementById('net-banking-details');
const codDetails = document.getElementById('cod-details');

// Initialize the app
function init() {
    console.log("🚀 Initializing BookShelf...");
    setupEventListeners();
    checkAuthState();
    checkTheme();
    fetchBooks(); // Load books on startup
}

// Check and apply saved theme
function checkTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'night') {
        document.body.classList.add('night-mode');
        themeToggle.textContent = 'Day Mode';
    }
}

// Toggle night mode
function toggleNightMode() {
    document.body.classList.toggle('night-mode');
    if (document.body.classList.contains('night-mode')) {
        themeToggle.textContent = 'Day Mode';
        localStorage.setItem('theme', 'night');
    } else {
        themeToggle.textContent = 'Night Mode';
        localStorage.setItem('theme', 'day');
    }
}

// Fetch books from backend
async function fetchBooks() {
    try {
        console.log("📚 Fetching books from backend...");
        featuredBooksContainer.innerHTML = '<div class="loading">Loading books...</div>';
        
        const response = await fetch('http://127.0.0.1:5000/api/books');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const serverBooks = await response.json();
        console.log("✅ Books loaded:", serverBooks);
        
        books = serverBooks.map(book => ({
            ...book,
            id: String(book.id)
        }));
        
        filteredBooks = [...books];
        renderBooks();
        
    } catch (error) {
        console.error("❌ Error loading books:", error);
        featuredBooksContainer.innerHTML = `
            <div class="error-message">
                <h3>⚠️ Connection Error</h3>
                <p>Could not load books from server.</p>
                <p><small>Make sure Python backend is running on http://127.0.0.1:5000</small></p>
                <button onclick="fetchBooks()" class="retry-button">Try Again</button>
            </div>
        `;
    }
}

// // Render books on the home page
// function renderBooks() {
//     console.log("🎨 Rendering books...");
//     featuredBooksContainer.innerHTML = '';
    
//     if (filteredBooks.length === 0) {
//         featuredBooksContainer.innerHTML = '<p class="no-books">No books found matching your search.</p>';
//         return;
//     }
    
//     filteredBooks.forEach(book => {
//         const isFavorite = favorites.some(fav => fav.id === book.id);
        
//         const bookCard = document.createElement('div');
//         bookCard.className = 'book-card';
//         bookCard.innerHTML = `
//             <div class="book-cover" style="background-image: url('${book.image}')">
//                 ${!book.image ? '📚' : ''}
//             </div>
//             <div class="book-details">
//                 <h3>${book.title}</h3>
//                 <p class="author">by ${book.author}</p>
//                 <p class="genre">${book.genre}</p>
//                 <div class="rating">
//                     ${renderStars(book.rating)}
//                     <span class="review-count">(${book.reviews})</span>
//                 </div>
//                 <div class="book-price">₹${book.price.toFixed(2)}</div>
//                 <div class="book-actions">
//                     <button class="add-to-cart" data-id="${book.id}">Add to Cart</button>
//                     <button class="add-to-favorites" data-id="${book.id}" 
//                             style="background-color: ${isFavorite ? '#e67e22' : '#f1c40f'}">
//                         ${isFavorite ? '❤️' : '🤍'}
//                     </button>
//                 </div>
//             </div>
//         `;
        
//         featuredBooksContainer.appendChild(bookCard);
//     });
// }


// Render books on the home page
function renderBooks() {
    console.log("🎨 Rendering books...");
    featuredBooksContainer.innerHTML = '';
    
    if (filteredBooks.length === 0) {
        featuredBooksContainer.innerHTML = '<p class="no-books">No books found matching your search.</p>';
        return;
    }
    
    // Define a fallback image URL for safety
    const FALLBACK_IMAGE_URL = 'https://images.unsplash.com/photo-1512820790803-830f6a627f19?q=80&w=400&h=600&auto=format&fit=crop';
    
    filteredBooks.forEach(book => {
        const isFavorite = favorites.some(fav => fav.id === book.id);
        
        // Use the book's image or the fallback URL if the image property is empty/missing
        const imageUrl = book.image && book.image.trim() !== '' ? book.image : FALLBACK_IMAGE_URL;

        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <div class="book-cover" style="background-image: url('${imageUrl}')">
                ${!book.image ? '' : ''} 
            </div>
            <div class="book-details">
                <h3>${book.title}</h3>
                <p class="author">by ${book.author}</p>
                <p class="genre">${book.genre}</p>
                <div class="rating">
                    ${renderStars(book.rating)}
                    <span class="review-count">(${book.reviews})</span>
                </div>
                <div class="book-price">₹${book.price.toFixed(2)}</div>
                <div class="book-actions">
                    <button class="add-to-cart" data-id="${book.id}">Add to Cart</button>
                    <button class="add-to-favorites" data-id="${book.id}" 
                            style="background-color: ${isFavorite ? '#e67e22' : '#f1c40f'}">
                        ${isFavorite ? '❤️' : '🤍'}
                    </button>
                </div>
            </div>
        `;
        
        featuredBooksContainer.appendChild(bookCard);
    });
}

// Render star ratings
function renderStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '★';
        } else {
            stars += '☆';
        }
    }
    
    return stars;
}

// Search books
function searchBooks(query) {
    if (!query.trim()) {
        filteredBooks = [...books];
    } else {
        const lowerQuery = query.toLowerCase();
        filteredBooks = books.filter(book => 
            book.title.toLowerCase().includes(lowerQuery) ||
            book.author.toLowerCase().includes(lowerQuery) ||
            book.genre.toLowerCase().includes(lowerQuery)
        );
    }
    renderBooks();
}

// Render cart items
function renderCart() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
        cartSummary.style.display = 'none';
        return;
    }
    
    cartSummary.style.display = 'block';
    
    let total = 0;
    
    cart.forEach(item => {
        const book = books.find(b => b.id === item.id);
        if (book) {
            total += book.price * item.quantity;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-cover" style="background-image: url('${book.image}')">
                    ${!book.image ? '📚' : ''}
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${book.title}</div>
                    <div class="cart-item-price">₹${(book.price * item.quantity).toFixed(2)}</div>
                </div>
                <div class="cart-item-actions">
                    <button class="decrease-quantity" data-id="${book.id}">-</button>
                    <div class="cart-item-quantity">${item.quantity}</div>
                    <button class="increase-quantity" data-id="${book.id}">+</button>
                    <button class="remove-from-cart" data-id="${book.id}">×</button>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        }
    });
    
    cartTotal.textContent = `₹${total.toFixed(2)}`;
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Setup event listeners
function setupEventListeners() {
    console.log("🔧 Setting up event listeners...");
    
    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            showPage(pageId);
        });
    });
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleNightMode);
    
    // Auth buttons
    loginBtn.addEventListener('click', () => showPage('login'));
    logoutBtn.addEventListener('click', logout);
    
    // Search functionality
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        searchBooks(searchInput.value);
    });
    
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            searchBooks(searchInput.value);
        }
    });
    
    // Login/register forms
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        login(email, password);
    });
    
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        register(name, email, password);
    });
    
    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });
    
    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    });
    
    // Profile form
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const address = document.getElementById('profile-address').value;
        const phone = document.getElementById('profile-phone').value;
        updateProfile(address, phone);
    });
    
    // Contact form
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const subject = document.getElementById('contact-subject').value;
        const message = document.getElementById('contact-message').value;
        sendContactForm(name, email, subject, message);
    });
    
    // Add book form
    addBookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addNewBook();
    });
    
    // Checkout button
    checkoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        paymentModal.classList.add('active');
    });
    
    // Payment modal
    closePaymentModal.addEventListener('click', () => {
        paymentModal.classList.remove('active');
    });
    
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        placeOrder();
        paymentModal.classList.remove('active');
    });
    
    // Payment method toggle - FIXED
    paymentMethods.forEach(method => {
        method.addEventListener('change', (e) => {
            // Hide all payment details first
            creditCardDetails.style.display = 'none';
            upiDetails.style.display = 'none';
            netBankingDetails.style.display = 'none';
            codDetails.style.display = 'none';
            
            // Show selected payment method details
            switch(e.target.value) {
                case 'credit-card':
                    creditCardDetails.style.display = 'block';
                    break;
                case 'upi':
                    upiDetails.style.display = 'block';
                    break;
                case 'net-banking':
                    netBankingDetails.style.display = 'block';
                    break;
                case 'cod':
                    codDetails.style.display = 'block';
                    break;
            }
        });
    });
    
    // Order confirmation buttons
    viewTrackingButton.addEventListener('click', () => {
        showPage('order-tracking');
    });
    
    continueShoppingButton.addEventListener('click', () => {
        showPage('home');
    });
    
    // Order tracking button
    backToOrdersButton.addEventListener('click', () => {
        showPage('order-history');
    });
    
    // Review stars
    reviewStars.forEach(star => {
        star.addEventListener('click', (e) => {
            const rating = parseInt(e.target.getAttribute('data-rating'));
            setReviewRating(rating);
        });
    });
    
    submitReviewButton.addEventListener('click', submitReview);
    
    // Chatbot events
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
    });
    
    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
    });
    
    chatbotSend.addEventListener('click', sendChatbotMessage);
    
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatbotMessage();
        }
    });
    
    // Book actions (delegated events)
    document.addEventListener('click', (e) => {
        const target = e.target;
        
        // Add to cart
        if (target.classList.contains('add-to-cart')) {
            const bookId = target.getAttribute('data-id');
            addToCart(bookId);
        }
        
        // Add to favorites
        if (target.classList.contains('add-to-favorites')) {
            const bookId = target.getAttribute('data-id');
            toggleFavorite(bookId);
        }
        
        // Write review button (if exists in your HTML)
        if (target.classList.contains('write-review')) {
            const bookId = target.getAttribute('data-id');
            openReviewModal(bookId);
        }
        
        // Cart quantity controls
        if (target.classList.contains('increase-quantity')) {
            const bookId = target.getAttribute('data-id');
            updateCartItem(bookId, 1);
        }
        
        if (target.classList.contains('decrease-quantity')) {
            const bookId = target.getAttribute('data-id');
            updateCartItem(bookId, -1);
        }
        
        if (target.classList.contains('remove-from-cart')) {
            const bookId = target.getAttribute('data-id');
            removeFromCart(bookId);
        }
        
        // Track order button
        if (target.classList.contains('track-order')) {
            const orderId = target.getAttribute('data-order-id');
            trackOrder(orderId);
        }
    });
    
    console.log("✅ Event listeners setup complete");
}

// Show specific page
function showPage(pageId) {
    console.log("📄 Showing page:", pageId);
    
    // Check authentication for protected pages
    const protectedPages = ['profile', 'cart', 'favorites', 'order-history', 'admin'];
    if (protectedPages.includes(pageId) && !currentUser) {
        showPage('login');
        return;
    }
    
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(`${pageId}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update page-specific content
    switch(pageId) {
        case 'cart':
            renderCart();
            break;
        case 'favorites':
            renderFavorites();
            break;
        case 'profile':
            updateProfileDisplay();
            break;
        case 'order-history':
            renderOrderHistory();
            break;
        case 'home':
            searchInput.value = '';
            filteredBooks = [...books];
            renderBooks();
            break;
    }
}

// Auth functions
// function login(email, password) {
//     console.log("🔐 Logging in:", email);
    
//     // Simple validation
//     if (!email || !password) {
//         alert('Please enter both email and password');
//         return;
//     }
    
//     currentUser = {
//         name: email.split('@')[0],
//         email: email,
//         joinDate: new Date().toLocaleDateString(),
//         address: '',
//         phone: ''
//     };
    
//     // Load user data from localStorage
//     const userData = localStorage.getItem(`user_${email}`);
//     if (userData) {
//         currentUser = { ...currentUser, ...JSON.parse(userData) };
//     }
    
//     // Load user-specific data
//     const savedCart = localStorage.getItem(`cart_${email}`);
//     if (savedCart) cart = JSON.parse(savedCart);
    
//     const savedFavorites = localStorage.getItem(`favorites_${email}`);
//     if (savedFavorites) favorites = JSON.parse(savedFavorites);
    
//     const savedOrders = localStorage.getItem(`orders_${email}`);
//     if (savedOrders) orders = JSON.parse(savedOrders);
    
//     checkAuthState();
//     showPage('home');
//     alert(`Welcome back, ${currentUser.name}!`);
// }


// Auth functions
async function login(email, password) { // ✅ फंक्शनला ASYNC बनवा
    console.log("🔐 Logging in:", email);
    
    if (!email || !password) {
        alert('Please enter both email and password');
        return;
    }
    
    currentUser = {
        name: email.split('@')[0],
        email: email,
        joinDate: new Date().toLocaleDateString(),
        address: '',
        phone: ''
    };
    
    // ... (existing code for loading local storage data) ...
    
    // ✅ महत्त्वाचा बदल: पुस्तके डेटाबेसवरून लोड होण्याची वाट पहा
    await fetchBooks(); 
    
    checkAuthState();
    showPage('home');
    alert(`Welcome back, ${currentUser.name}!`);
}

// function register(name, email, password) {
//     console.log("📝 Registering:", name, email);
    
//     if (!name || !email || !password) {
//         alert('Please fill all fields');
//         return;
//     }
    
//     currentUser = {
//         name: name,
//         email: email,
//         joinDate: new Date().toLocaleDateString(),
//         address: '',
//         phone: ''
//     };
    
//     // Save to localStorage
//     localStorage.setItem(`user_${email}`, JSON.stringify(currentUser));
    
//     // Initialize empty arrays for new user
//     cart = [];
//     favorites = [];
//     orders = [];
    
//     checkAuthState();
//     showPage('home');
//     alert(`Account created successfully! Welcome, ${name}!`);
// }


// register function
async function register(name, email, password) { // ✅ फंक्शनला ASYNC बनवा
    console.log("📝 Registering:", name, email);
    
    if (!name || !email || !password) {
        alert('Please fill all fields');
        return;
    }
    
    currentUser = {
        name: name,
        email: email,
        joinDate: new Date().toLocaleDateString(),
        address: '',
        phone: ''
    };
    
    // ... (existing code for saving to local storage) ...
    
    // ✅ महत्त्वाचा बदल: पुस्तके डेटाबेसवरून लोड होण्याची वाट पहा
    await fetchBooks(); 
    
    // Initialize empty arrays for new user
    cart = [];
    favorites = [];
    orders = [];
    
    checkAuthState();
    showPage('home');
    alert(`Account created successfully! Welcome, ${name}!`);
}


function logout() {
    console.log("🚪 Logging out");
    
    // Save data before logout
    if (currentUser) {
        localStorage.setItem(`cart_${currentUser.email}`, JSON.stringify(cart));
        localStorage.setItem(`favorites_${currentUser.email}`, JSON.stringify(favorites));
        localStorage.setItem(`orders_${currentUser.email}`, JSON.stringify(orders));
    }
    
    currentUser = null;
    cart = [];
    favorites = [];
    orders = [];
    
    checkAuthState();
    showPage('home');
}

function checkAuthState() {
    if (currentUser) {
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
    } else {
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
    }
}

// Cart functions
function addToCart(bookId) {
    if (!currentUser) {
        showPage('login');
        return;
    }
    
    const existingItem = cart.find(item => item.id === bookId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: bookId, quantity: 1 });
    }
    
    renderCart();
    alert('Book added to cart!');
}

function updateCartItem(bookId, change) {
    const item = cart.find(item => item.id === bookId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== bookId);
        }
    }
    
    renderCart();
}

function removeFromCart(bookId) {
    cart = cart.filter(item => item.id !== bookId);
    renderCart();
}

// Favorites functions
function toggleFavorite(bookId) {
    if (!currentUser) {
        showPage('login');
        return;
    }
    
    const book = books.find(b => b.id === bookId);
    const existingIndex = favorites.findIndex(fav => fav.id === bookId);
    
    if (existingIndex >= 0) {
        favorites.splice(existingIndex, 1);
        alert('Removed from favorites');
    } else {
        favorites.push(book);
        alert('Added to favorites!');
    }
    
    renderBooks();
    renderFavorites();
}

function renderFavorites() {
    favoritesGrid.innerHTML = '';
    
    if (favorites.length === 0) {
        favoritesGrid.innerHTML = '<p class="empty-favorites-message">You don\'t have any favorite books yet</p>';
        return;
    }
    
    favorites.forEach(book => {
        const favoriteCard = document.createElement('div');
        favoriteCard.className = 'book-card';
        favoriteCard.innerHTML = `
            <div class="book-cover" style="background-image: url('${book.image}')">
                ${!book.image ? '📚' : ''}
            </div>
            <div class="book-details">
                <h3>${book.title}</h3>
                <p class="author">by ${book.author}</p>
                <p class="genre">${book.genre}</p>
                <div class="rating">
                    ${renderStars(book.rating)}
                    <span class="review-count">(${book.reviews})</span>
                </div>
                <div class="book-price">₹${book.price.toFixed(2)}</div>
                <div class="book-actions">
                    <button class="add-to-cart" data-id="${book.id}">Add to Cart</button>
                    <button class="add-to-favorites" data-id="${book.id}" style="background-color: #e67e22">❤️</button>
                </div>
            </div>
        `;
        
        favoritesGrid.appendChild(favoriteCard);
    });
}

// Order functions
function placeOrder() {
    if (!currentUser || cart.length === 0) return;
    
    const orderId = currentOrderId++;
    const orderDate = new Date().toLocaleDateString();
    let total = 0;
    
    const orderItems = cart.map(item => {
        const book = books.find(b => b.id === item.id);
        total += book.price * item.quantity;
        return { id: item.id, quantity: item.quantity };
    });
    
    const order = {
        id: orderId,
        date: orderDate,
        items: orderItems,
        total: total,
        status: 'processing'
    };
    
    orders.unshift(order);
    
    // Save orders
    localStorage.setItem(`orders_${currentUser.email}`, JSON.stringify(orders));
    
    // Clear cart
    cart = [];
    renderCart();
    
    // Show confirmation
    renderOrderConfirmation(order);
    showPage('order-confirmation');
    
    alert('Order placed successfully!');
}

function renderOrderConfirmation(order) {
    confirmationItems.innerHTML = '';
    
    order.items.forEach(item => {
        const book = books.find(b => b.id === item.id);
        confirmationItems.innerHTML += `
            <div class="order-item">
                <span>${book.title} × ${item.quantity}</span>
                <span>₹${(book.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
    });
    
    confirmationTotal.textContent = `₹${order.total.toFixed(2)}`;
}

function renderOrderHistory() {
    orderHistoryContainer.innerHTML = '';
    
    if (orders.length === 0) {
        orderHistoryContainer.innerHTML = '<p class="empty-orders-message">You haven\'t placed any orders yet</p>';
        return;
    }
    
    orders.forEach(order => {
        const orderCard = document.createElement('div');
        orderCard.className = 'order-card';
        orderCard.innerHTML = `
            <div class="order-header">
                <div>
                    <span class="order-id">Order #${order.id}</span>
                    <span class="order-date">${order.date}</span>
                </div>
                <span class="order-status status-processing">Processing</span>
            </div>
            <div class="order-total">Total: ₹${order.total.toFixed(2)}</div>
        `;
        
        orderHistoryContainer.appendChild(orderCard);
    });
}

// Track order function - ADDED
function trackOrder(orderId) {
    const order = orders.find(o => o.id == orderId);
    if (order) {
        renderOrderConfirmation(order);
        showPage('order-tracking');
    }
}

// Add book to database
// async function addNewBook() {
//     const newBook = {
//         title: document.getElementById('book-title').value,
//         author: document.getElementById('book-author').value,
//         price: parseFloat(document.getElementById('book-price').value),
//         genre: document.getElementById('book-genre').value,
//         image: document.getElementById('book-image').value,
//         rating: parseFloat(document.getElementById('book-rating').value),
//         reviews: parseInt(document.getElementById('book-reviews').value)
//     };

//     try {
//         const response = await fetch('http://127.0.0.1:5000/api/books', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(newBook)
//         });

//         if (response.ok) {
//             alert('Book added successfully to database!');
//             addBookForm.reset();
//             await fetchBooks(); // Refresh the book list
//         } else {
//             alert('Error adding book');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         alert('Error adding book. Check console for details.');
//     }
// }


// Add book to database
async function addNewBook() {
    const newBook = {
        title: document.getElementById('book-title').value,
        author: document.getElementById('book-author').value,
        price: parseFloat(document.getElementById('book-price').value),
        genre: document.getElementById('book-genre').value,
        image: document.getElementById('book-image').value,
        rating: parseFloat(document.getElementById('book-rating').value),
        reviews: parseInt(document.getElementById('book-reviews').value)
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBook)
        });

        if (response.ok) {
            alert('Book added successfully to database! Reloading list...');
            addBookForm.reset();
            
            // ✅ SUCCESS: पुस्तक ॲड झाल्यावर होम पेजवर जाऊन डेटा पुन्हा लोड करा
            await fetchBooks(); 
            showPage('home'); 
        } else {
            const error = await response.json(); // बॅकएंडकडून आलेली त्रुटी वाचा
            alert('Error adding book: ' + (error.message || error.error || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error in POST request:', error);
        alert('Connection error! Make sure Python server is running.');
    }
}

// Profile functions
function updateProfile(address, phone) {
    if (!currentUser) return;
    
    currentUser.address = address;
    currentUser.phone = phone;
    
    localStorage.setItem(`user_${currentUser.email}`, JSON.stringify(currentUser));
    alert('Profile updated successfully!');
}

function updateProfileDisplay() {
    if (!currentUser) return;
    
    profileName.textContent = currentUser.name;
    profileEmail.textContent = currentUser.email;
    profileJoinDate.textContent = currentUser.joinDate;
    document.getElementById('profile-address').value = currentUser.address || '';
    document.getElementById('profile-phone').value = currentUser.phone || '';
}

// Contact form function - ADDED
function sendContactForm(name, email, subject, message) {
    // In a real app, this would be an API call
    console.log('Contact form submitted:', { name, email, subject, message });
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
}

// Review functions
function openReviewModal(bookId) {
    currentReviewBookId = bookId;
    const book = books.find(b => b.id === bookId);
    if (book) {
        reviewBookTitle.textContent = book.title;
        reviewModal.classList.add('active');
        
        // Reset stars and text
        reviewStars.forEach(star => {
            star.classList.remove('selected');
        });
        document.querySelector('.review-text').value = '';
    }
}

function setReviewRating(rating) {
    reviewStars.forEach(star => {
        const starRating = parseInt(star.getAttribute('data-rating'));
        if (starRating <= rating) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });
}

function submitReview() {
    const rating = document.querySelectorAll('.review-star.selected').length;
    const reviewText = document.querySelector('.review-text').value;
    
    if (rating === 0) {
        alert('Please select a rating');
        return;
    }
    
    if (!reviewText.trim()) {
        alert('Please write a review');
        return;
    }
    
    alert(`Thank you for your ${rating}-star review!\n\n"${reviewText}"`);
    reviewModal.classList.remove('active');
    document.querySelector('.review-text').value = '';
    
    // Reset stars
    reviewStars.forEach(star => {
        star.classList.remove('selected');
    });
}

// Chatbot functions
function sendChatbotMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;
    
    addChatbotMessage(message, 'user');
    chatbotInput.value = '';
    
    setTimeout(() => {
        const response = generateChatbotResponse(message);
        addChatbotMessage(response, 'bot');
    }, 500);
}

function addChatbotMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${sender}-message`;
    messageDiv.textContent = text;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function generateChatbotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return "Hello! I'm your BookShelf assistant. How can I help you today?";
    } else if (lowerMessage.includes('help')) {
        return "I can help you with:\n• Book recommendations\n• Order status\n• Account issues\n• General questions";
    } else if (lowerMessage.includes('order') || lowerMessage.includes('track')) {
        return "You can check your order status in the 'Orders' section of your account.";
    } else if (lowerMessage.includes('book') || lowerMessage.includes('recommend')) {
        if (books.length > 0) {
            const randomBook = books[Math.floor(Math.random() * books.length)];
            return `I recommend "${randomBook.title}" by ${randomBook.author}. It's a ${randomBook.genre} book with ${randomBook.rating}★ rating!`;
        }
        return "We have a great collection of books! Browse our homepage to find your next favorite read.";
    } else if (lowerMessage.includes('contact')) {
        return "You can reach us through the Contact Us page or email support@bookshelf.com";
    } else if (lowerMessage.includes('thanks') || lowerMessage.includes('thank you')) {
        return "You're welcome! 😊 Is there anything else I can help you with?";
    } else {
        return "I'm here to help! You can ask me about books, orders, or general questions.";
    }
}


// async function confirmPayment() { // Make it async if you plan for API calls later
//     const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked');

//     if (!selectedPaymentMethod) {
//         alert('Please select a payment method.');
//         return;
//     }

//     if (cart.length === 0) {
//         alert('Your cart is empty. Please add items before placing an order.');
//         return;
//     }

//     const orderId = 'ORD-' + Date.now(); // Simple unique ID
//     const newOrder = {
//         id: orderId,
//         items: [...cart], // Copy current cart items
//         total: calculateCartTotal(), // Assuming you have this function
//         paymentMethod: selectedPaymentMethod.value,
//         date: new Date().toLocaleString(),
//         status: 'Pending' // Initial status
//     };

//     orders.push(newOrder); // Add to global orders array
//     localStorage.setItem(`orders_${currentUser.email}`, JSON.stringify(orders)); // Save to localStorage

//     cart = []; // Clear the cart
//     localStorage.setItem(`cart_${currentUser.email}`, JSON.stringify(cart)); // Update empty cart in localStorage

//     updateCartDisplay(); // Update cart icon and display

//     // Display success and navigate
//     alert('Payment successful! Your order has been placed.');
//     closePaymentModal(); // Assuming you have a function to close the modal
//     showPage('orders'); // Navigate to the orders page
//     renderOrders(); // Render the new list of orders
// }

// function closePaymentModal() {
//     const paymentModal = document.getElementById('payment-modal'); // Assuming your modal has this ID
//     if (paymentModal) {
//         paymentModal.style.display = 'none'; // Hide the modal
//     }
// }

// function renderOrders() {
//     const ordersContainer = document.getElementById('orders-container'); // Assuming you have a div with this ID on your orders page
//     if (!ordersContainer) return;

//     ordersContainer.innerHTML = ''; // Clear previous orders

//     if (orders.length === 0) {
//         ordersContainer.innerHTML = '<p class="text-center">You haven\'t placed any orders yet</p>';
//         return;
//     }

//     orders.forEach(order => {
//         const orderCard = document.createElement('div');
//         orderCard.classList.add('order-card'); // Add a CSS class for styling

//         const itemsHtml = order.items.map(item => `
//             <li>${item.title} - ₹${item.price} x ${item.quantity || 1}</li>
//         `).join('');

//         orderCard.innerHTML = `
//             <h3>Order ID: ${order.id}</h3>
//             <p><strong>Date:</strong> ${order.date}</p>
//             <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
//             <p><strong>Status:</strong> ${order.status}</p>
//             <p><strong>Total:</strong> ₹${order.total.toFixed(2)}</p>
//             <h4>Items:</h4>
//             <ul>${itemsHtml}</ul>
//         `;
//         ordersContainer.appendChild(orderCard);
//     });
// }

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);