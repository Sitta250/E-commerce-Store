const Header = {
  render: () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    return `
      <div>
        ${token ? `<a id="logout-btn" href="#">Logout (${username})</a> <a id="cart-btn" href="/#/cart">Cart</a>`: `<a href="/#/land">Sign In</a>`}
      </div>
    `;
  },
  after_render: () => {
    const token = localStorage.getItem("token");

    if (token) {
      const logoutBtn = document.getElementById("logout-btn");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
          e.preventDefault();
          // Clear the token and username from localStorage
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          alert("Logged out successfully!");
          // Reload the page to update the header
          window.location.reload();
        });
      }
    }
  },
};

export default Header;