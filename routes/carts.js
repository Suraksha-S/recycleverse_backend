const express=require('express');
const router =express.Router();


const cartController = require('../controller/cartController')

// Add item to cart
router.post('/cart', cartController.addToCart);

// Get cart for a user
router.get('/cart/:userId', cartController.getCart);

// Remove item from cart
router.post('/cart/remove', cartController.removeFromCart);

module.exports = router;



