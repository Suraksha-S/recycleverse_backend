const mongoose = require('mongoose');
const OrderItem = require('../module/order-item')
// const {Schema} = mongoose;

const orderSchema = mongoose.Schema({
    orderItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'OrderItem',
        required:true
    }],
    status:{
        type:String,
        required:true,
        default:'Pending'
    },
    totalPrice:{
        type:Number
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    orderDate:{
        type:Date,
        default:Date.now
    }

})

const Order = mongoose.model('Order', orderSchema);
module.exports=Order;