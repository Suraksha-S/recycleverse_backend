const express = require('express');
const Order = require('../module/order')
const OrderItem = require('../module/order-item')

const router = express.Router();


const orderController = require('../controller/orderController');

// Route to create an order from the cart
router.post('/order/create-from-cart', orderController.createOrderFromCart);




router.get('/order/create-from-cart', async (req,res)=>{

    try {
        const orderList = await Order.find().populate('user')
        if(!orderList){
            res.status(400).send("The order list cannot be found")
        }
        res.status(200).json({orderList:orderList})
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server error")
        
    }
   


})
module.exports = router