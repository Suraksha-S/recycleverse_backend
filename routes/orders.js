const express = require('express');
const Order = require('../module/order')
const OrderItem = require('../module/order-item')

const router = express.Router();


router.post('/orderitems', async(req,res)=>{
    const orderItemsIds = Promise.all(req.body.orderItems.map(async(orderItem)=>{
        let newOrderItem = new OrderItem({
            quantity:orderItem.quantity,
            file:orderItem.file

        });
        newOrderItem= await newOrderItem.save()
        return newOrderItem._id
        
    }))
   
    const orderItemsIdsResolved = await orderItemsIds;
    console.log(orderItemsIdsResolved)



    let order = new Order({
        orderItems:orderItemsIdsResolved ,
        status:req.body.status,
        totalPrice:req.body.totalPrice,
        user:req.body.user
    })
    order = await order.save()
    if(!order){
        return res.status(400).send("The order cannot be created")
    }
    res.send(order)

})

router.get('/orders', async (req,res)=>{

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