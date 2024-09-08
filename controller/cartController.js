const Cart=require('../module/cart')
// controllers/cart.controller.js


// Add item to cart
exports.addToCart = async (req, res) => {
    const { userId, projectId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
            // If cart exists for the user, update it
            const itemIndex = cart.items.findIndex(p => p.projectId == projectId);

            if (itemIndex > -1) {
                // If product exists in the cart, update the quantity
                let projectItem = cart.items[itemIndex];
                projectItem.quantity += quantity;
                cart.items[itemIndex] = projectItem;
            } else {
                // If product does not exist in the cart, add new item
                cart.items.push({ projectId, quantity });
            }
        } else {
            // If no cart exists, create one
            cart = new Cart({
                userId,
                items: [{ projectId, quantity }]
            });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

// Get user's cart
exports.getCart = async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ userId }).populate('items.projectId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
    const { userId, projectId } = req.body;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(p => p.projectId == projectId);

        if (itemIndex > -1) {
            cart.items.splice(itemIndex, 1);
            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

//!  --------------------------------------------------------
