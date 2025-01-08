const CartScreen = {
  render: async () => {
    try {
      console.log("Cart screen render called");

      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to view the cart.');
        return `<div class="cart-container"><h1>Shopping Cart</h1><p>You need to log in to view your cart.</p></div>`;
      }

      // Fetch cart data from the backend with authorization
      const cartResponse = await axios.get('http://localhost:5001/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const cartItems = cartResponse.data;
      console.log(cartItems);

      // Check if the cart is empty
      if (!cartItems || cartItems.length === 0) {
        return `
          <div class="cart-container">
            <h1 class="cart-title">Shopping Cart</h1>
            <p>Your cart is empty.</p>
          </div>
        `;
      }

      const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );

      // Generate cart items dynamically
      const cartHTML = cartItems
        .map(
          (item) => `
          <div class="cart-item">
            <div class="cart-item-details">
              <img src="${item.image}" alt="${item.image}" class="cart-item-image"/>
              <div>
                <p class="cart-product-name">${item.name}</p>
                <p class="cart-product-brand">${item.brand}</p>
                <button class="cart-remove-btn" value="${item.productId}" data-action="remove">Remove</button>
              </div>
            </div>
            <div class="cart-item-quantity">
              <button class="cart-qty-btn dec-btn" value="${item.productId}" data-action="decrement">-</button>
              <input type="number" value="${item.qty}" min="1" class="cart-qty-input" data-id="${item._id}" disabled/>
              <button class="cart-qty-btn inc-btn" value="${item.productId}" data-action="increment">+</button>
            </div>
            <div class="cart-item-price" data-id="${item._id}">$${item.price.toFixed(2)}</div>
            <div class="cart-item-total" data-id="${item._id}">$${(item.qty * item.price).toFixed(2)}</div>
          </div>
        `
        )
        .join(""); 

      // Return the complete cart UI
      return `
        <div class="cart-container">
          <h1 class="cart-title">Shopping Cart</h1>
          <div class="cart-header">
            <div class="cart-header-item">Product Details</div>
            <div class="cart-header-item">Quantity</div>
            <div class="cart-header-item">Price</div>
            <div class="cart-header-item">Total</div>
          </div>
          ${cartHTML}
          <div class="cart-total"> 
            <h2>Total: $${totalPrice.toFixed(2)}</h2>
          </div>
        </div>
      `;
    } catch (err) {
      console.log("Error with fetching cart data: ", err);
      return `<div>Unable to load cart</div>`;
    }
  },
  after_render: () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to modify the cart.');
      return;
    }

    // Handle quantity increment and decrement
    const incButtons = document.querySelectorAll(".inc-btn");
    const decButtons = document.querySelectorAll(".dec-btn");
    const delButtons = document.querySelectorAll(".cart-remove-btn");

    decButtons.forEach((button) => {
      button.addEventListener('click', async () => {
        console.log('Decrement button clicked');
        const productID = button.getAttribute('value');
        try {
          const response = await fetch(`http://localhost:5001/api/cart/${productID}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ action: 'decrement' }),
          });
          if (response.ok) {
            alert('Product quantity decremented successfully');
            window.location.reload();
          } else {
            const result = await response.json();
            alert(result.message || 'Failed to decrement product quantity');
          }
        } catch (err) {
          console.error("Error decrementing product:", err);
          alert("Error decrementing product");
        }
      });
    });

    incButtons.forEach((button) => {
      button.addEventListener('click', async () => {
        console.log('Increment button clicked');
        const productID = button.getAttribute('value');
        try {
          const response = await fetch(`http://localhost:5001/api/cart/${productID}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ action: 'increment' }),
          });
          if (response.ok) {
            alert('Product quantity incremented successfully');
            window.location.reload();
          } else {
            const result = await response.json();
            alert(result.message || 'Failed to increment product quantity');
          }
        } catch (err) {
          console.error("Error incrementing product:", err);
          alert("Error incrementing product");
        }
      });
    });

    delButtons.forEach((button) => {
      button.addEventListener('click', async () => {
        console.log('Remove button clicked');
        const productID = button.getAttribute('value');
        try {
          const response = await fetch(`http://localhost:5001/api/cart/${productID}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            alert('Product removed successfully');
            window.location.reload();
          } else {
            const result = await response.json();
            alert(result.message || 'Failed to remove product');
          }
        } catch (err) {
          console.error("Error removing product from cart:", err);
          alert("Error removing product from cart");
        }
      });
    });
  },
};

export default CartScreen;