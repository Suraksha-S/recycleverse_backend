const express=require('express');
const router =express.Router();
const Cart=require('../module/cart');
const File=require('../module/file');

// Add item to cart
router.post('/cart/:userId/add', async (req, res) => {
    const { projectId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId: req.params.userId });
        const project = await File.findById(projectId);

        if (!cart) {
            cart = new Cart({
                userId: req.params.userId,
                items: [{ projectId, quantity }],
                totalPrice: project.price * quantity,
            });
        } else {
            const itemIndex = cart.items.findIndex(item => item.projectId.toString() === projectId);
            if (itemIndex > -1) {
                let item = cart.items[itemIndex];
                item.quantity += quantity;
                cart.totalPrice += project.price * quantity;
            } else {
                cart.items.push({ projectId, quantity });
                cart.totalPrice += project.price * quantity;
            }
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});


// Remove item from cart
router.delete('/cart/:userId/remove/:projectId', async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.params.userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const itemIndex = cart.items.findIndex(item => item.projectId.toString() === req.params.projectId);
        if (itemIndex > -1) {
            const item = cart.items[itemIndex];
            cart.totalPrice -= item.quantity * item.projectPrice;
            cart.items.splice(itemIndex, 1);
        } else {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});


// Update item quantity in cart
router.put('/:userId/update/:projectId', async (req, res) => {
    const { quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId: req.params.userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const itemIndex = cart.items.findIndex(item => item.projectId.toString() === req.params.projectId);
        if (itemIndex > -1) {
            const item = cart.items[itemIndex];
            cart.totalPrice -= item.quantity * item.projectPrice;
            item.quantity = quantity;
            cart.totalPrice += item.quantity * item.projectPrice;
        } else {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

// Get cart by user ID
router.get('/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});
module.exports=router;