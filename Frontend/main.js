const state = {
  currentUser: null,
  books: [],
  cart: [],
  favorites: [],
  filteredBooks: [],
  orders: [],
  currentOrderId: 1001,
  currentReviewBookId: null,
  reviewRating: 0,
  findMyBookResults: null
};

const STORAGE_KEYS = {
  user: (email) => `user_${email}`,
  cart: (email) => `cart_${email}`,
  favorites: (email) => `favorites_${email}`,
  orders: (email) => `orders_${email}`,
  session: 'bookshelf_session'
};

document.addEventListener('DOMContentLoaded', init);

function init() {
  setupEventListeners();
  checkTheme();
  const sessionEmail = localStorage.getItem(STORAGE_KEYS.session);
  if (sessionEmail) {
    const savedUser = readStoredJson(STORAGE_KEYS.user(sessionEmail), null);
    if (savedUser && savedUser.email === sessionEmail) {
      state.currentUser = savedUser;
      state.cart = readStoredJson(STORAGE_KEYS.cart(sessionEmail), []);
      state.favorites = readStoredJson(STORAGE_KEYS.favorites(sessionEmail), []);
      state.orders = readStoredJson(STORAGE_KEYS.orders(sessionEmail), []);
      state.cart = Array.isArray(state.cart) ? state.cart : [];
      state.favorites = Array.isArray(state.favorites) ? state.favorites : [];
      state.orders = Array.isArray(state.orders) ? state.orders : [];
      state.currentOrderId = state.orders.reduce(
        (nextId, order) => Math.max(nextId, Number(order.id) + 1 || nextId),
        state.currentOrderId
      );
    } else {
      localStorage.removeItem(STORAGE_KEYS.session);
    }
  }
  checkAuthState();
  fetchBooks();
}

function getElement(id) {
  return document.getElementById(id);
}


function getApiUrl(path) {
    const backendUrl = 'https://bookshelf-backend-tfwg.onrender.com';
    const servedByBackend =
        window.location.protocol !== 'file:' &&
        window.location.port === '5000';

    return `${servedByBackend ? '' : backendUrl}${path}`;
}


function readStoredJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || 'null');
    return value === null ? fallback : value;
  } catch (error) {
    console.warn(`Ignoring invalid saved data for ${key}`, error);
    return fallback;
  }
}

function persistUserData() {
  if (!state.currentUser) return;

  localStorage.setItem(STORAGE_KEYS.user(state.currentUser.email), JSON.stringify(state.currentUser));
  localStorage.setItem(STORAGE_KEYS.cart(state.currentUser.email), JSON.stringify(state.cart));
  localStorage.setItem(STORAGE_KEYS.favorites(state.currentUser.email), JSON.stringify(state.favorites));
  localStorage.setItem(STORAGE_KEYS.orders(state.currentUser.email), JSON.stringify(state.orders));
}

async function fetchBooks() {
  try {
    const response = await fetch(getApiUrl('/api/books'));
    if (!response.ok) throw new Error('Failed to fetch books');

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error('The books service returned an unexpected response. Please make sure the Python backend is running on port 5000.');
    }

    const data = await response.json();
    state.books = Array.isArray(data) ? data : [];
    state.filteredBooks = [...state.books];
    renderBooks();
    const urlSearch = new URLSearchParams(window.location.search).get('search');
    if (urlSearch) {
      showPage('home');
      const searchInput = getElement('search-input');
      if (searchInput) searchInput.value = urlSearch;
      searchBooks(urlSearch);
    }
  } catch (error) {
    console.error('Error loading books:', error);
    const container = getElement('featured-books');
    if (container) {
      container.innerHTML = `
        <div class="error-message">
          <h3>Unable to load books</h3>
          <p>Please start the Python backend on port 5000.</p>
        </div>
      `;
    }
  }
}

function renderBooks() {
  const container = getElement('featured-books');
  if (!container) return;

  container.innerHTML = '';

  if (!state.filteredBooks.length) {
    container.innerHTML = '<p class="empty-message">No books found matching your search.</p>';
    return;
  }

  state.filteredBooks.forEach((book) => {
    const isFavorite = state.favorites.some((favorite) => favorite.id === book.id);
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
      <div class="book-cover" style="background-image: url('${escapeHtml(book.image || '')}')">${book.image ? '' : '📚'}</div>
      <div class="book-details">
        <h3>${escapeHtml(book.title)}</h3>
        <p>by ${escapeHtml(book.author)}</p>
        <p>${escapeHtml(book.genre)}</p>
        <div class="rating">${renderStars(book.rating)} <span>(${book.reviews})</span></div>
        <div class="book-price">₹${Number(book.price || 0).toFixed(2)}</div>
        <div class="book-actions">
          <button class="add-to-cart" data-id="${book.id}">Add to Cart</button>
          <button class="add-to-favorites" data-id="${book.id}" style="background-color: ${isFavorite ? '#e67e22' : '#f1c40f'}">
            ${isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderStars(rating = 0) {
  const safeRating = Number(rating) || 0;
  const fullStars = Math.floor(safeRating);
  let stars = '';

  for (let i = 1; i <= 5; i += 1) {
    stars += i <= fullStars ? '★' : '☆';
  }

  return stars;
}

function renderCart() {
  const cartItems = getElement('cart-items');
  const cartSummary = getElement('cart-summary');
  const cartTotal = getElement('cart-total');
  const count = getElement('cart-count');

  if (!cartItems || !cartSummary || !cartTotal || !count) return;

  cartItems.innerHTML = '';

  if (!state.cart.length) {
    cartItems.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
    cartSummary.style.display = 'none';
    count.textContent = '0';
    cartTotal.textContent = '₹0.00';
    return;
  }

  cartSummary.style.display = 'block';

  let total = 0;
  state.cart.forEach((item) => {
    const book = state.books.find((b) => String(b.id) === String(item.id));
    if (!book) return;

    total += Number(book.price) * Number(item.quantity || 1);

    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <div class="cart-item-cover" style="background-image: url('${escapeHtml(book.image || '')}')">${book.image ? '' : '📚'}</div>
      <div class="cart-item-details">
        <div class="cart-item-title">${escapeHtml(book.title)}</div>
        <div class="cart-item-price">₹${(Number(book.price) * Number(item.quantity || 1)).toFixed(2)}</div>
      </div>
      <div class="cart-item-actions">
        <button class="decrease-quantity" data-id="${book.id}">-</button>
        <div class="cart-item-quantity">${item.quantity}</div>
        <button class="increase-quantity" data-id="${book.id}">+</button>
        <button class="remove-from-cart" data-id="${book.id}">×</button>
      </div>
    `;
    cartItems.appendChild(row);
  });

  count.textContent = state.cart.reduce((sum, item) => sum + Number(item.quantity || 1), 0);
  cartTotal.textContent = `₹${total.toFixed(2)}`;
}

function renderFavorites() {
  const favoritesGrid = getElement('favorites-grid');
  if (!favoritesGrid) return;

  favoritesGrid.innerHTML = '';

  if (!state.favorites.length) {
    favoritesGrid.innerHTML = '<p class="empty-favorites-message">You don\'t have any favorite books yet</p>';
    return;
  }

  state.favorites.forEach((book) => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
      <div class="book-cover" style="background-image: url('${escapeHtml(book.image || '')}')">${book.image ? '' : '📚'}</div>
      <div class="book-details">
          <h3>${escapeHtml(book.title)}</h3>
          <p>by ${escapeHtml(book.author)}</p>
          <p>${escapeHtml(book.genre)}</p>
        <div class="rating">${renderStars(book.rating)} <span>(${book.reviews})</span></div>
        <div class="book-price">₹${Number(book.price || 0).toFixed(2)}</div>
        <div class="book-actions">
          <button class="add-to-cart" data-id="${book.id}">Add to Cart</button>
          <button class="add-to-favorites" data-id="${book.id}" style="background-color: #e67e22">❤️</button>
        </div>
      </div>
    `;
    favoritesGrid.appendChild(card);
  });
}

function renderOrderHistory() {
  const orderHistory = getElement('order-history');
  if (!orderHistory) return;

  orderHistory.innerHTML = '';

  if (!state.orders.length) {
    orderHistory.innerHTML = '<p class="empty-orders-message">You haven\'t placed any orders yet</p>';
    return;
  }

  state.orders.forEach((order) => {
    const card = document.createElement('div');
    card.className = 'order-card';
    card.innerHTML = `
      <div class="order-header">
        <div>
          <span class="order-id">Order #${order.id}</span>
          <span class="order-date">${order.date}</span>
        </div>
        <span class="order-status status-processing">${order.status}</span>
      </div>
      <div class="order-total">Total: ₹${Number(order.total || 0).toFixed(2)}</div>
    `;
    orderHistory.appendChild(card);
  });
}

function showPage(pageId) {
  const protectedPages = ['profile', 'cart', 'favorites', 'order-history'];
  if (protectedPages.includes(pageId) && !state.currentUser) {
    pageId = 'login';
  }

  document.querySelectorAll('.page').forEach((page) => page.classList.remove('active'));
  const targetPage = getElement(`${pageId}-page`);
  if (targetPage) {
    targetPage.classList.add('active');
  } else {
    return;
  }

  if (pageId === 'cart') renderCart();
  if (pageId === 'favorites') renderFavorites();
  if (pageId === 'order-history') renderOrderHistory();
  if (pageId === 'profile') updateProfileDisplay();
  if (pageId === 'find-my-book') renderFindMyBookResults();
  if (pageId === 'home') {
    const searchInput = getElement('search-input');
    if (searchInput) searchInput.value = '';
    state.filteredBooks = [...state.books];
    renderBooks();
  }
}

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function displayFindBookValue(value, prefix = '') {
    return value === null || value === undefined || value === ''
      ? 'Not available'
      : `${prefix}${escapeHtml(value)}`;
  }

  function safeResultUrl(value) {
    try {
      const url = new URL(String(value || ''), window.location.origin);
      if (url.protocol !== 'http:' && url.protocol !== 'https:') return '#';
      return escapeHtml(url.href);
    } catch (error) {
      return '#';
    }
  }

  function sortFindBookResults(results, sortBy) {
    return [...results].sort((first, second) => {
      if (sortBy === 'relevance') return 0;
      const firstValue = sortBy === 'rating-desc' ? first.rating : first.price;
      const secondValue = sortBy === 'rating-desc' ? second.rating : second.price;
      if (firstValue === null || firstValue === undefined) return 1;
      if (secondValue === null || secondValue === undefined) return -1;
      return sortBy === 'price-desc' || sortBy === 'rating-desc'
        ? Number(secondValue) - Number(firstValue)
        : Number(firstValue) - Number(secondValue);
    });
  }

  function renderFindMyBookResults() {
    const container = getElement('find-book-results');
    if (!container || !state.findMyBookResults) return;

    const sortBy = getElement('find-book-sort')?.value || 'relevance';
    const recommendations = sortFindBookResults(
      state.findMyBookResults.recommendations || [],
      sortBy
    );
    const sections = [
      ['new_books', 'New Books'],
      ['second_hand_books', 'Second-Hand Books']
    ];
    const budgetInput = getElement('find-book-budget')?.value.trim();
    const budget = Number(budgetInput);

    const renderCard = (result, isRecommendation = false) => `
      <article class="seller-card ${isRecommendation ? 'recommendation-card' : ''}">
        <div class="seller-card-top">
          <div class="seller-identity">
            <span class="seller-icon" aria-hidden="true">${escapeHtml(result.icon || (isRecommendation ? '📖' : '↗'))}</span>
            <h4>${escapeHtml(result.seller || 'Seller')}</h4>
          </div>
          ${isRecommendation ? `<span class="seller-source">${escapeHtml(result.data_source || 'External seller search link')}</span>` : ''}
        </div>
        <p class="seller-title">${escapeHtml(result.title || state.findMyBookResults.query)}</p>
        ${isRecommendation
          ? `
            ${result.author ? `<p class="seller-author">by ${escapeHtml(result.author)}</p>` : ''}
            <dl class="seller-details">
              <div><dt>Relevance</dt><dd>${displayFindBookValue(result.relevance)}</dd></div>
              <div><dt>Price</dt><dd>${displayFindBookValue(result.price, '₹')}</dd></div>
              <div><dt>Rating</dt><dd>${displayFindBookValue(result.rating)}</dd></div>
              <div><dt>Reviews</dt><dd>${displayFindBookValue(result.reviews)}</dd></div>
              <div><dt>Condition</dt><dd>${displayFindBookValue(result.condition)}</dd></div>
              <div><dt>Delivery</dt><dd>${displayFindBookValue(result.delivery_charges, '₹')}</dd></div>
            </dl>
          `
          : '<p class="seller-description">Browse marketplace listings that match your search prompt.</p>'}
        <a class="seller-link" href="${safeResultUrl(result.url)}" target="_blank" rel="noopener noreferrer">${isRecommendation ? 'View in BookShelf ↗' : `Search on ${escapeHtml(result.seller || 'seller')} ↗`}</a>
      </article>
    `;

    const recommendationSection = recommendations.length
      ? `
        <section class="find-book-section recommendation-section">
          <div class="find-book-section-heading">
            <h3>Recommended for You</h3>
            <span>${recommendations.length} local matches</span>
          </div>
          <div class="seller-grid recommendation-grid">
            ${recommendations.map((result) => renderCard(result, true)).join('')}
          </div>
        </section>
      `
      : `
        <section class="find-book-section">
          <div class="find-book-empty">No matching books were found in the BookShelf catalog. Try the marketplace links below.</div>
        </section>
      `;

    const marketplaceSections = sections.map(([key, label]) => {
      const allResults = state.findMyBookResults.results[key] || [];
      const budgetResults = budgetInput && Number.isFinite(budget) && budget >= 0
        ? allResults.filter((result) => result.price === null || result.price === undefined || Number(result.price) <= budget)
        : allResults;
      const results = sortFindBookResults(budgetResults, sortBy);
      return `
        <section class="find-book-section">
          <div class="find-book-section-heading">
            <h3>${label}</h3>
            <span>${results.length} marketplace links</span>
          </div>
          <div class="seller-grid">
            ${results.map((result) => renderCard(result)).join('')}
          </div>
        </section>
      `;
    }).join('');

    container.innerHTML = recommendationSection + marketplaceSections;
  }

  async function findMyBook(event) {
    event.preventDefault();
    const query = getElement('find-book-query')?.value.trim();
    const budget = getElement('find-book-budget')?.value.trim();
    const status = getElement('find-book-status');
    if (!query) {
      if (status) status.textContent = 'Enter a book title, author, ISBN, or description to search.';
      return;
    }
    if (budget && (!Number.isFinite(Number(budget)) || Number(budget) < 0)) {
      if (status) status.textContent = 'Maximum budget must be a valid non-negative number.';
      return;
    }

    if (status) status.textContent = 'Finding recommendations and marketplace search links...';
    try {
      const params = new URLSearchParams({ q: query });
      if (budget) params.set('max_price', budget);
      const response = await fetch(getApiUrl(`/api/find-my-book?${params.toString()}`));
      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error('The book search service returned an unexpected response.');
      }
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to search for this book.');
      state.findMyBookResults = data;
      renderFindMyBookResults();
      if (status) {
        status.textContent = data.warning
          ? `${data.notice} ${data.warning}`
          : data.notice;
      }
    } catch (error) {
      console.error('Find My Book search failed:', error);
      if (status) status.textContent = error.message || 'Unable to search right now. Please try again.';
    }
  }
function checkTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'night') {
    document.body.classList.add('night-mode');
    const button = getElement('theme-toggle');
    if (button) button.textContent = 'Day Mode';
  }
}

function toggleNightMode() {
  document.body.classList.toggle('night-mode');
  const button = getElement('theme-toggle');
  if (document.body.classList.contains('night-mode')) {
    button.textContent = 'Day Mode';
    localStorage.setItem('theme', 'night');
  } else {
    button.textContent = 'Night Mode';
    localStorage.setItem('theme', 'day');
  }
}

function checkAuthState() {
  const loginBtn = getElement('login-btn');
  const logoutBtn = getElement('logout-btn');

  if (state.currentUser) {
    if (loginBtn) loginBtn.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'block';
  } else {
    if (loginBtn) loginBtn.style.display = 'block';
    if (logoutBtn) logoutBtn.style.display = 'none';
  }
}

function login(email, password) {
  if (!email || !password) {
    alert('Please enter both email and password');
    return;
  }

  const existingUser = readStoredJson(STORAGE_KEYS.user(email), null);
  const userData = existingUser || {
    name: email.split('@')[0],
    email,
    joinDate: new Date().toLocaleDateString(),
    address: '',
    phone: ''
  };

  state.currentUser = userData;
  const savedCart = readStoredJson(STORAGE_KEYS.cart(email), []);
  const savedFavorites = readStoredJson(STORAGE_KEYS.favorites(email), []);
  const savedOrders = readStoredJson(STORAGE_KEYS.orders(email), []);

  state.cart = Array.isArray(savedCart) ? savedCart : [];
  state.favorites = Array.isArray(savedFavorites) ? savedFavorites : [];
  state.orders = Array.isArray(savedOrders) ? savedOrders : [];

  localStorage.setItem(STORAGE_KEYS.user(email), JSON.stringify(state.currentUser));
  localStorage.setItem(STORAGE_KEYS.session, email);
  checkAuthState();
  showPage('home');
  alert(`Welcome back, ${state.currentUser.name}!`);
}

function register(name, email, password) {
  if (!name || !email || !password) {
    alert('Please fill all fields');
    return;
  }

  const userData = {
    name,
    email,
    joinDate: new Date().toLocaleDateString(),
    address: '',
    phone: ''
  };

  state.currentUser = userData;
  state.cart = [];
  state.favorites = [];
  state.orders = [];
  localStorage.setItem(STORAGE_KEYS.user(email), JSON.stringify(userData));
  localStorage.setItem(STORAGE_KEYS.session, email);
  checkAuthState();
  showPage('home');
  alert(`Account created successfully! Welcome, ${name}!`);
}

function logout() {
  if (state.currentUser) {
    localStorage.setItem(STORAGE_KEYS.cart(state.currentUser.email), JSON.stringify(state.cart));
    localStorage.setItem(STORAGE_KEYS.favorites(state.currentUser.email), JSON.stringify(state.favorites));
    localStorage.setItem(STORAGE_KEYS.orders(state.currentUser.email), JSON.stringify(state.orders));
  }

  state.currentUser = null;
  state.cart = [];
  state.favorites = [];
  state.orders = [];
  localStorage.removeItem(STORAGE_KEYS.session);
  checkAuthState();
  showPage('home');
}

function updateProfile(address, phone) {
  if (!state.currentUser) return;

  state.currentUser.address = address;
  state.currentUser.phone = phone;
  persistUserData();
  updateProfileDisplay();
  alert('Profile updated successfully!');
}

function updateProfileDisplay() {
  if (!state.currentUser) return;

  const profileName = getElement('profile-name');
  const profileEmail = getElement('profile-email');
  const profileJoinDate = getElement('profile-join-date');
  const profileAddress = getElement('profile-address');
  const profilePhone = getElement('profile-phone');

  if (profileName) profileName.textContent = state.currentUser.name;
  if (profileEmail) profileEmail.textContent = state.currentUser.email;
  if (profileJoinDate) profileJoinDate.textContent = state.currentUser.joinDate;
  if (profileAddress) profileAddress.value = state.currentUser.address || '';
  if (profilePhone) profilePhone.value = state.currentUser.phone || '';
}

function addToCart(bookId) {
  if (!state.currentUser) {
    showPage('login');
    return;
  }

  const existingItem = state.cart.find((item) => String(item.id) === String(bookId));
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cart.push({ id: String(bookId), quantity: 1 });
  }

  persistUserData();
  renderCart();
  alert('Book added to cart!');
}

function updateCartItem(bookId, change) {
  const item = state.cart.find((cartItem) => String(cartItem.id) === String(bookId));
  if (!item) return;

  item.quantity += change;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter((cartItem) => String(cartItem.id) !== String(bookId));
  }

  persistUserData();
  renderCart();
}

function removeFromCart(bookId) {
  state.cart = state.cart.filter((item) => String(item.id) !== String(bookId));
  persistUserData();
  renderCart();
}

function toggleFavorite(bookId) {
  if (!state.currentUser) {
    showPage('login');
    return;
  }

  const existingIndex = state.favorites.findIndex((favorite) => String(favorite.id) === String(bookId));
  if (existingIndex >= 0) {
    state.favorites.splice(existingIndex, 1);
  } else {
    const selectedBook = state.books.find((book) => String(book.id) === String(bookId));
    if (selectedBook) state.favorites.push(selectedBook);
  }

  persistUserData();
  renderBooks();
  renderFavorites();
}

function placeOrder() {
  if (!state.currentUser || !state.cart.length) return;

  const orderId = state.currentOrderId;
  state.currentOrderId += 1;

  let total = 0;
  const items = state.cart.map((item) => {
    const book = state.books.find((b) => String(b.id) === String(item.id));
    if (!book) return null;
    total += Number(book.price) * Number(item.quantity || 1);
    return { id: String(item.id), quantity: Number(item.quantity || 1) };
  }).filter(Boolean);

  const order = {
    id: orderId,
    date: new Date().toLocaleDateString(),
    items,
    total,
    status: 'Processing'
  };

  state.orders.unshift(order);
  state.cart = [];
  persistUserData();
  renderCart();
  renderOrderHistory();

  const confirmationItems = getElement('confirmation-items');
  const confirmationTotal = getElement('confirmation-total');
  if (confirmationItems) {
    confirmationItems.innerHTML = items.map((item) => {
      const book = state.books.find((b) => String(b.id) === String(item.id));
      return `<div class="order-item"><span>${book ? book.title : 'Book'} × ${item.quantity}</span><span>₹${(Number(book ? book.price : 0) * item.quantity).toFixed(2)}</span></div>`;
    }).join('');
  }
  if (confirmationTotal) confirmationTotal.textContent = `₹${total.toFixed(2)}`;

  const trackingOrderId = getElement('tracking-order-id');
  const trackingOrderDate = getElement('tracking-order-date');
  const trackingDeliveryDate = getElement('tracking-delivery-date');
  const trackingAddress = getElement('tracking-address');
  if (trackingOrderId) trackingOrderId.textContent = order.id;
  if (trackingOrderDate) trackingOrderDate.textContent = order.date;
  if (trackingDeliveryDate) {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);
    trackingDeliveryDate.textContent = deliveryDate.toLocaleDateString();
  }
  if (trackingAddress) trackingAddress.textContent = state.currentUser.address || 'Address not provided';

  showPage('order-confirmation');
  alert('Order placed successfully!');
}

function searchBooks(query) {
  const q = query.trim().toLowerCase();
  state.filteredBooks = q
    ? state.books.filter((book) => `${book.title} ${book.author} ${book.genre}`.toLowerCase().includes(q))
    : [...state.books];
  renderBooks();
}

function setupEventListeners() {
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const pageId = link.getAttribute('data-page');
      if (pageId) showPage(pageId);
    });
  });

  const themeToggle = getElement('theme-toggle');
  if (themeToggle) themeToggle.addEventListener('click', toggleNightMode);

  const loginBtn = getElement('login-btn');
  if (loginBtn) loginBtn.addEventListener('click', () => showPage('login'));

  const logoutBtn = getElement('logout-btn');
  if (logoutBtn) logoutBtn.addEventListener('click', logout);

  const searchButton = getElement('search-button');
  if (searchButton) {
    searchButton.addEventListener('click', () => {
      const input = getElement('search-input');
      if (input) searchBooks(input.value);
    });
  }

  const searchInput = getElement('search-input');
  if (searchInput) {
    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') searchBooks(searchInput.value);
    });
  }

  const loginForm = getElement('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = getElement('login-email').value.trim();
      const password = getElement('login-password').value.trim();
      login(email, password);
    });
  }

  const registerForm = getElement('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = getElement('register-name').value.trim();
      const email = getElement('register-email').value.trim();
      const password = getElement('register-password').value.trim();
      register(name, email, password);
    });
  }

  const showRegister = getElement('show-register');
  const showLogin = getElement('show-login');
  if (showRegister) {
    showRegister.addEventListener('click', (event) => {
      event.preventDefault();
      const loginFormEl = getElement('login-form');
      const registerFormEl = getElement('register-form');
      if (loginFormEl) loginFormEl.style.display = 'none';
      if (registerFormEl) registerFormEl.style.display = 'block';
    });
  }
  if (showLogin) {
    showLogin.addEventListener('click', (event) => {
      event.preventDefault();
      const registerFormEl = getElement('register-form');
      const loginFormEl = getElement('login-form');
      if (registerFormEl) registerFormEl.style.display = 'none';
      if (loginFormEl) loginFormEl.style.display = 'block';
    });
  }

  const profileForm = getElement('profile-form');
  if (profileForm) {
    profileForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const address = getElement('profile-address').value.trim();
      const phone = getElement('profile-phone').value.trim();
      updateProfile(address, phone);
    });
  }

  const checkoutButton = getElement('checkout-button');
  if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
      if (!state.cart.length) {
        alert('Your cart is empty!');
        return;
      }
      const paymentModal = getElement('payment-modal');
      if (paymentModal) paymentModal.classList.add('active');
    });
  }

  const closePaymentModal = getElement('close-payment-modal');
  if (closePaymentModal) {
    closePaymentModal.addEventListener('click', () => {
      const paymentModal = getElement('payment-modal');
      if (paymentModal) paymentModal.classList.remove('active');
    });
  }

  const paymentForm = getElement('payment-form');
  if (paymentForm) {
    const updatePaymentDetails = () => {
      const selectedMethod = paymentForm.querySelector('input[name="payment-method"]:checked')?.value;
      paymentForm.querySelectorAll('.payment-details').forEach((section) => {
        const isActive = section.id === `${selectedMethod}-details`;
        section.style.display = isActive ? 'block' : 'none';
        section.querySelectorAll('input, select').forEach((field) => {
          field.required = isActive;
        });
      });
    };
    paymentForm.querySelectorAll('input[name="payment-method"]').forEach((method) => {
      method.addEventListener('change', updatePaymentDetails);
    });
    updatePaymentDetails();
    paymentForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const paymentModal = getElement('payment-modal');
      if (paymentModal) paymentModal.classList.remove('active');
      placeOrder();
    });
  }

  const contactForm = getElement('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      alert('Your message has been sent successfully. We will contact you soon!');
      contactForm.reset();
    });
  }

  const contactFindBookButton = getElement('contact-find-book-button');
  if (contactFindBookButton) {
    contactFindBookButton.addEventListener('click', () => showPage('find-my-book'));
  }

  const findBookForm = getElement('find-book-form');
  if (findBookForm) findBookForm.addEventListener('submit', findMyBook);

  const findBookSort = getElement('find-book-sort');
  if (findBookSort) findBookSort.addEventListener('change', renderFindMyBookResults);
  const findBookBudget = getElement('find-book-budget');
  if (findBookBudget) findBookBudget.addEventListener('input', renderFindMyBookResults);

  const viewTrackingButton = getElement('view-tracking-button');
  if (viewTrackingButton) viewTrackingButton.addEventListener('click', () => showPage('order-tracking'));

  const continueShoppingButton = getElement('continue-shopping-button');
  if (continueShoppingButton) continueShoppingButton.addEventListener('click', () => showPage('home'));

  const backToOrdersButton = getElement('back-to-orders-button');
  if (backToOrdersButton) backToOrdersButton.addEventListener('click', () => showPage('order-history'));

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('add-to-cart')) {
      addToCart(target.dataset.id);
    }

    if (target.classList.contains('add-to-favorites')) {
      toggleFavorite(target.dataset.id);
    }

    if (target.classList.contains('increase-quantity')) {
      updateCartItem(target.dataset.id, 1);
    }

    if (target.classList.contains('decrease-quantity')) {
      updateCartItem(target.dataset.id, -1);
    }

    if (target.classList.contains('remove-from-cart')) {
      removeFromCart(target.dataset.id);
    }
  });

  const chatbotToggle = getElement('chatbot-toggle');
  const chatbotWindow = getElement('chatbot-window');
  const chatbotClose = getElement('chatbot-close');
  const chatbotSend = getElement('chatbot-send');
  const chatbotInput = getElement('chatbot-input');

  if (chatbotToggle && chatbotWindow) {
    chatbotToggle.addEventListener('click', () => chatbotWindow.classList.toggle('active'));
  }
  if (chatbotClose && chatbotWindow) {
    chatbotClose.addEventListener('click', () => chatbotWindow.classList.remove('active'));
  }
  if (chatbotSend && chatbotInput) {
    chatbotSend.addEventListener('click', () => sendChatbotMessage(chatbotInput));
  }
  if (chatbotInput) {
    chatbotInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') sendChatbotMessage(chatbotInput);
    });
  }
}

function sendChatbotMessage(inputElement) {
  if (!inputElement) return;

  const message = inputElement.value.trim();
  if (!message) return;

  const chatMessages = getElement('chatbot-messages');
  if (!chatMessages) return;

  const userMessage = document.createElement('div');
  userMessage.className = 'chatbot-message user-message';
  userMessage.textContent = message;
  chatMessages.appendChild(userMessage);

  const botMessage = document.createElement('div');
  botMessage.className = 'chatbot-message bot-message';
  botMessage.textContent = generateBotReply(message);
  chatMessages.appendChild(botMessage);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  inputElement.value = '';
}

function generateBotReply(message) {
  const lower = message.toLowerCase();

  if (/hello|hi|hey/.test(lower)) return 'Hello! I can help you with book recommendations, orders, or account support.';
  if (/book|recommend|suggest/.test(lower)) {
    const book = state.books[Math.floor(Math.random() * state.books.length)];
    return book ? `I recommend "${book.title}" by ${book.author}. It is a great ${book.genre} pick.` : 'Check out our featured books section for recommendations.';
  }
  if (/order|track/.test(lower)) return 'You can view your orders from the Orders tab in the navigation menu.';
  if (/contact|support/.test(lower)) return 'You can reach our support team through the Contact Us page or email us at support@bookshelf.com.';
  if (/thanks|thank you/.test(lower)) return 'You are welcome! Let me know if you need anything else.';
  return 'I can help with book choices, cart questions, or order tracking. Ask me anything about BookShelf.';
}

window.addEventListener('beforeunload', () => {
  if (state.currentUser) {
    localStorage.setItem(STORAGE_KEYS.cart(state.currentUser.email), JSON.stringify(state.cart));
    localStorage.setItem(STORAGE_KEYS.favorites(state.currentUser.email), JSON.stringify(state.favorites));
    localStorage.setItem(STORAGE_KEYS.orders(state.currentUser.email), JSON.stringify(state.orders));
  }
});
