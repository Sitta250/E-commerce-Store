import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    console.log('Authorization Header:', req.headers.authorization); // Debugging: Check the full header
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('Extracted Token:', token); // Debugging: Check the extracted token
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
      console.log('Decoded Payload:', decoded); // Debugging: Check the decoded payload

      req.user = await User.findById(decoded.userId).select('-password');
      console.log('User Found:', req.user); // Debugging: Check if the user was found
      
      next(); // Pass control to the next middleware
    } catch (err) {
      console.error(`JWT verification failed: ${err.message}`);
      return res.status(401).send({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).send({ message: 'Not authorized, no token' });
  }
};

export default protect;