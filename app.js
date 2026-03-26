// Mobile menu toggle functionality
const mobileToggle = document.getElementById('mobileToggle');
const mobileNav = document.getElementById('mobileNav');

if (mobileToggle && mobileNav) {
  mobileToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
  });
}

// all prodicts js

// Sample Products Data
const products = [
  { id: 1, name: "Wireless Noise Cancelling Headphones", category: "electronics", price: 199.99, originalPrice: 299.99, rating: 4.8, stock: 45, badge: "sale", image: "🎧", isNew: true },
  { id: 2, name: "Premium Cotton T-Shirt", category: "fashion", price: 29.99, originalPrice: null, rating: 4.5, stock: 120, badge: null, image: "👕" },
  { id: 3, name: "Smart Watch Ultra", category: "electronics", price: 249.99, originalPrice: 299.99, rating: 4.7, stock: 28, badge: "hot", image: "⌚" },
  { id: 4, name: "Minimalist Desk Lamp", category: "home", price: 45.99, originalPrice: 69.99, rating: 4.6, stock: 67, badge: "sale", image: "💡" },
  { id: 5, name: "Bestseller Novel Collection", category: "books", price: 34.99, originalPrice: null, rating: 4.9, stock: 89, badge: null, image: "📚" },
  { id: 6, name: "Yoga Mat Premium", category: "sports", price: 39.99, originalPrice: 59.99, rating: 4.4, stock: 52, badge: "sale", image: "🧘" },
  { id: 7, name: "Sterling Silver Necklace", category: "jewelry", price: 89.99, originalPrice: 129.99, rating: 4.8, stock: 23, badge: "hot", image: "💎" },
  { id: 8, name: "Leather Backpack", category: "fashion", price: 79.99, originalPrice: 119.99, rating: 4.7, stock: 34, badge: "sale", image: "🎒" },
  { id: 9, name: "Gaming Mouse RGB", category: "electronics", price: 49.99, originalPrice: 79.99, rating: 4.6, stock: 78, badge: null, image: "🖱️" },
  { id: 10, name: "Ceramic Coffee Mug Set", category: "home", price: 24.99, originalPrice: null, rating: 4.5, stock: 156, badge: null, image: "☕" },
  { id: 11, name: "Running Shoes", category: "sports", price: 89.99, originalPrice: 129.99, rating: 4.7, stock: 41, badge: "hot", image: "👟" },
  { id: 12 , name: "Bluetooth Speaker", category: "electronics", price: 59.99, originalPrice: 89.99, rating: 4.6, stock: 65, badge: "sale", image: "🔊" },
];

// Function to Render Products
function renderProducts(productList) {
  const productsContainer = document.getElementById('productsContainer');
  if (!productsContainer) return;   
    productsContainer.innerHTML = '';
    productList.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">
                    $${product.price.toFixed(2)}
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                </p>
                <p class="product-rating">Rating: ${product.rating} ⭐</p>
                <p class="product-stock">Stock: ${product.stock}</p>
                ${product.badge ? `<span class="product-badge ${product.badge}">${product.badge.toUpperCase()}</span>` : ''}
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
}
