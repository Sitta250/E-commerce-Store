const HomeScreen = {
  render: async () => {
    try {
      console.log('Fetching products...');
      const response = await axios.get('http://localhost:5001/api/products');
      const products= response.data;
      if (!products || products.length===0) {
        throw new Error('Error fetching data');
      }
      
      console.log('Fetched products:', products);
      const productList = products
        .map(
          (product) => `
            <li>
              <div class="product">
                <a href="#/product/${product._id}">
                  <img src="${product.image}" alt="${product.name}">
                </a>
                <div class="product-name">${product.name}</div>
                <div class="product-rating">Review:${product.rating}</div>
                <div class="product-brand">${product.brand}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
              </div>
            </li>
          `
        )
        .join('');

      return `
        <ul class="products">
          ${productList}
        </ul>
      `;
    } catch (err) {
      console.error('Error:', err);
      return `
        <div>Error loading products: ${err.message}</div>
      `;
    }
  },
};
export default HomeScreen;