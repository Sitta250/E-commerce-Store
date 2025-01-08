import express from 'express';
import Cart from '../models/cartModel.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all cart items for the logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const cartItems = await Cart.find({ user: req.user._id });
    res.status(200).send(cartItems);
  } catch (err) {
    console.error(`Error fetching cart: ${err.message}`);
    res.status(500).send({ message: 'Error fetching cart' });
  }
});

// Add or update a cart item
router.post('/', protect, async (req, res) => {
  try {
    const { productId, name, price, qty, image, brand } = req.body;
    if (!productId || !name || !price || !qty || !image || !brand) {
      return res.status(400).send({ message: 'Missing required fields' });
    }
    const existingProduct = await Cart.findOne({ user: req.user._id, productId });
    if (existingProduct) {
      existingProduct.qty += qty;
      await existingProduct.save();
      return res.status(200).send({ message: 'Cart updated', existingProduct });
    } else {
      const newCart = new Cart({
        user: req.user._id,
        productId,
        name,
        price,
        qty,
        image,
        brand,
      });
      await newCart.save();
      const savedCart = await newCart.save();
      return res.status(201).send({
        message: 'Product added to cart',
        cartItem: savedCart, // Full cart item with all fields
      });
    }
  } catch (err) {
    console.error(`Error adding to cart: ${err.message}`);
    res.status(500).send({ message: 'Error adding to cart' });
  }
});

// Update quantity for a cart item
router.put('/:id', protect, async (req, res) => {
  try {
    const { action } = req.body;
    const productId = req.params.id;
    const cartItem = await Cart.findOne({ user: req.user._id, productId });

    if (!cartItem) {
      return res.status(404).send({ message: 'Cart item not found' });
    }

    if (action === 'increment') {
      cartItem.qty += 1;
    } else if (action === 'decrement' && cartItem.qty > 1) {
      cartItem.qty -= 1;
    } else {
      return res.status(400).send({ message: 'Invalid action or quantity too low' });
    }

    await cartItem.save();
    res.status(200).send(cartItem);
  } catch (err) {
    console.error(`Error updating cart: ${err.message}`);
    res.status(500).send({ message: 'Error updating cart' });
  }
});

// Delete a cart item
router.delete('/:id', protect, async (req, res) => {
  try {
    const cartItem = await Cart.findOneAndDelete({ user: req.user._id, _id: req.params.id });
    if (!cartItem) {
      return res.status(404).send({ message: 'Cart item not found' });
    }
    res.status(200).send({ message: 'Cart item deleted', cartItem });
  } catch (err) {
    console.error(`Error deleting cart item: ${err.message}`);
    res.status(500).send({ message: 'Error deleting cart item' });
  }
});

export default router;