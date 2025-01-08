# E-commerce-Store
A full-stack e-commerce web application built using modern technologies to provide a seamless shopping experience. The application includes user authentication, product browsing, a shopping cart, and a checkout system. This project is designed for learning purposes and demonstrates the integration of backend and frontend technologies.

## Key Features:
- **User Authentication**: Secure registration, login, and logout functionalities using JSON Web Tokens (JWT).
- **Product Display**: Dynamic product catalog with images, pricing, ratings, and brand information.
- **Shopping Cart**: Add, update, and remove items in the shopping cart with real-time price updates.
- **Backend API**: RESTful API built with Express.js and MongoDB for handling products, users, and cart data.
- **Frontend**: Responsive user interface built with vanilla JavaScript, Bootstrap, and custom CSS.
- **Data Seeding**: Seeder script to populate the MongoDB database with product data.

## Technologies Used:
- **Frontend**: HTML, CSS, JavaScript, Bootstrap
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT), bcrypt for password hashing
- **Other Tools**: Axios for API calls, Postman for testing, Git for version control

## Project Walkthrough:

### 1) Register/Login Page
- **Register**: Users enter email, username, and password, which are hashed and stored in MongoDB in the `users` collection.
- **Login**: Users provide email and password; upon success, a JWT token and username are sent back and stored in `localStorage`.
- **Purpose**: Secures the app and provides access to personalized features.
![Register/Login Page](https://github.com/user-attachments/assets/cb1699f5-553f-43e1-824c-83ded51842bb)

### 2) Home Page
- Displays all available products in a grid format with images, names, ratings, brands, and prices.
- Data is fetched from the `/api/products` endpoint.
- Users can click on a product to view details.
![Home Page](https://github.com/user-attachments/assets/4a8ef551-ee1c-4475-8ca4-f967356f344d)

### 3) Product Page
- Shows product details, including name, image, price, rating, and brand.
- Users can add the product to the cart via the "Add to Cart" button, sending data to MongoDB.
- Provides a detailed view for informed purchase decisions.
![Product Page](https://github.com/user-attachments/assets/c5e408af-a778-471f-b8a5-075d39272fba)

### 4) Cart Page
- Displays cart items with product image, name, brand, quantity, and total price.
- Users can increment, decrement, or update quantities, reflecting changes in MongoDB.
- Shows total cart price dynamically.
![Cart Page](https://github.com/user-attachments/assets/d64025e0-8827-48d7-969e-a48e50a3b085)
