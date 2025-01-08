import { parseRequestURL } from "../utils/utils.js";
import Rating from "../components/rating.js";

const ProductScreen = {
  render: async () => {
    try {
      console.log("ProductScreen render called");
      const request = parseRequestURL();
      console.log("Request call is:", request);
      console.log(`ID: ${request.id}`);

      const response = await axios.get(
        `http://localhost:5001/api/products/${request.id}`
      );
      const product = response.data;

      return `
        <div class="product-display">
          <img src="${product.image}" alt="product-image" class="product-display-image" id="product-display-image" data-image="${product.image}" />
          <div class="product-display-info">
            <div class="product-display-name" id="product-display-name" data-name="${product.name}">${product.name}</div>
            <div class="product-display-rating">
              ${Rating.render({
                value: product.rating,
                text: `${product.numReview} reviews`,
              })}
            </div>
            <div class="product-display-price" id="product-display-price" data-price="${product.price}">$${product.price}</div>
            <div class="product-display-brand" id="product-display-brand" data-brand="${product.brand}">${product.brand}</div>

            <button class="add-to-cart-btn" id="add-to-cart-btn">Add to Cart</button>
          </div>
        </div>
      `;
    } catch (err) {
      console.error("Error fetching product:", err);
      return `<div>Unable to fetch product details</div>`;
    }
  },

  after_render: () => {
    // Handle Add to Cart button click
    document.getElementById('add-to-cart-btn').addEventListener('click', async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to add items to the cart.');
        return;
      }

      // Retrieve product details dynamically from data attributes
      const productId = parseRequestURL().id;
      const productName = document.getElementById('product-display-name').dataset.name;
      const productPrice = document.getElementById('product-display-price').dataset.price;
      const productImage = document.getElementById('product-display-image').dataset.image;
      const productBrand = document.getElementById('product-display-brand').dataset.brand;

      try {
        const response = await fetch(`http://localhost:5001/api/cart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId,
            name: productName,
            price: parseFloat(productPrice),
            qty: 1, // Default quantity
            image: productImage,
            brand: productBrand,
          }),
        });

        const result = await response.json();
        if (response.ok) {
          alert('Product added to cart!');
        } else {
          alert(result.message || 'Error adding product to cart.');
        }
      } catch (err) {
        console.error('Error adding product to cart:', err);
        alert('Failed to add product to cart. Please try again.');
      }
    });
  },
};

export default ProductScreen;