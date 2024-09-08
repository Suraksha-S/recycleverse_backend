
const Cart = require('../module/cart');
const Order = require('../module/order');
const OrderItem = require('../module/order-item');

// Create an order from the cart
exports.createOrderFromCart = async (req, res) => {
    const { userId } = req.body;

    try {
        // Find the user's cart
        const cart = await Cart.findOne({ userId }).populate('items.projectId');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Create OrderItems from Cart Items
        const orderItems = [];
        let totalAmount = 0;

        for (const item of cart.items) {
            const orderItem = new OrderItem({
                projectId: item.projectId._id,
                quantity: item.quantity,
                price: item.projectId.price,  // Assuming project has a price field
            });

            await orderItem.save();
            orderItems.push(orderItem._id);

            // Calculate total amount
            totalAmount += item.quantity * item.projectId.price;
        }

        // Create the Order
        const order = new Order({
            userId: userId,
            orderItems: orderItems,
            totalAmount: totalAmount,
            status: 'pending',
        });

        await order.save();

        // Clear the cart after order is placed
        await Cart.findOneAndDelete({ userId });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};
