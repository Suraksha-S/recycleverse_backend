const mongoose = require('mongoose');
// const OrderItem = require('../module/order-item')
const {Schema} = mongoose;



const OrderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [{ type: Schema.Types.ObjectId, ref: 'OrderItem' }], // References the OrderItem model
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'pending' }, // Could be pending, 
    orderDate:{type:Number,default:Date.now}
}, { timestamps: true });





const Order = mongoose.model('Order', OrderSchema);
module.exports=Order;