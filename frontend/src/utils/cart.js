export const handleQuantityChange = (productID, action) => {
  const qtyInput = document.querySelector(`.cart-qty-input[data-id="${productID}"]`);
  console.log(productID);
  if (!qtyInput) {
    console.error(`Quantity input for product ID ${productID} not found.`);
    return;
  }
  
  let qty = parseInt(qtyInput.value);

  // Handle increment and decrement actions
  if (action === 'increment') {
    qty += 1;
  } else if (action === 'decrement' && qty > 1) {
    qty -= 1;
  }

  // Update the quantity input value
  qtyInput.value = qty;

  const productPrice = parseFloat(document.querySelector(`.cart-item-price[data-id="${productID}"]`).textContent.replace('$',''))
  const totalElement = document.querySelector(`.cart-item-total[data-id="${productID}"]`)
  const totalPrice = (qty * productPrice).toFixed(2);
  totalElement.textContent=`$${totalPrice}`;
  console.log(`Updated Total for Product ID ${productID}: $${totalPrice}`);

};