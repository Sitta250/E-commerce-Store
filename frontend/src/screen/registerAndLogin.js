const registerAndLoginScreen = {
  render: async()=>{
    try{
      console.log('register/login page called');
      const landingForm = `
        <div class="landing-form" id="landing-form">
          <button type="button" class="submit-btn" id="register-btn">Register</button>
          <button type="button" class="submit-btn" id="login-btn">Login</button>
      </div>
      `
      const registerForm =`
        <form id="register-form" class=" hidden register-form">
        <div class="form-title">Welcome!</div>
        <div class="form-description">Let's create your account...</div>
        <label for="registerEmail">Email:</label>
        <input type="email" class="input" id="registerEmail" name="email" required />
        <label for="registerUsername:">Username:</label>
        <input type="text" class="input" id="registerUsername" name="username" required />
        <label for="registerPassword">Password:</label>
        <input type="password" class="input" id="registerPassword" name="password" required />
        <button type="submit" class="submit-btn">Register</button>
      </form>
      `
      const loginForm= `
        <form id="login-form" class="hidden login-form">
          <div class="form-title">Welcome back!</div>
          <div class="form-description"></div>
          <label for="loginEmail">Email:</label>
          <input type="email" class="input" id="loginEmail" name="email" required />
          <label for="loginPassword">Password:</label>
          <input type="password" class="input" id="loginPassword" name="password" required />
          <button type="submit" class="submit-btn">Login</button>
        </form>
      `

      return `
        <div>
        ${landingForm}
        ${registerForm}
        ${loginForm}
        </div>
      `
    }
    catch{
      console.log('Error displaying register/login page');
      return `<div>Unable to show register/login page</div>`
    }
  },
  after_render: async()=>{
    document.getElementById('register-form').addEventListener('submit', async(e)=>{
      e.preventDefault();
      const email = document.getElementById('registerEmail').value;
      const username = document.getElementById('registerUsername').value;
      const password = document.getElementById('registerPassword').value;
      try{
        const response = await fetch("http://localhost:5001/api/users/register",{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({email, username, password}),
        })
        const result = await response.json();
        if(response.ok){
          alert("Registration successful. Please log in!");
          window.location.reload();
        }else{
          alert(result.message || 'Error during registration');
        }
      }
      catch(err){
        console.error("Error during registration:", err);
        alert("Registration failed. Please try again.");
      }
    });

    document.getElementById('login-form').addEventListener('submit', async(e)=>{
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      try{
        const response = await fetch("http://localhost:5001/api/users/login",{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({email, password})
        })
        const result = await response.json();
        if(response.ok){
          alert('login successful');
          localStorage.setItem("token", result.token);
          localStorage.setItem("username", result.username); 
          window.location.href='/'
        }else{
          alert(result.message || "Invalid credentials");
        }
      }
      catch{
        console.error("Error during login:", err);
        alert("Login failed. Please try again.");
      }
    })
    function choose(option) {
      console.log(`${option} option selected`);
      if (option === 'register') {
        document.getElementById('landing-form').classList.add('hidden');
        document.getElementById('register-form').classList.remove('hidden');
      } else if (option === 'login') {
        document.getElementById('landing-form').classList.add('hidden');
        document.getElementById('login-form').classList.remove('hidden');
      }
    }
    // Attach event listeners to buttons
    document.getElementById('register-btn').addEventListener('click', () => {
      choose('register');
    });
    document.getElementById('login-btn').addEventListener('click', () => {
      choose('login');
    });
    
  }
}
export default registerAndLoginScreen;