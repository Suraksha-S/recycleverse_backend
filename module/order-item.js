const mongoose = require('mongoose');
const {Schema}=mongoose;



const OrderItemSchema = new Schema({
    projectId: { type: Schema.Types.ObjectId, ref: 'File', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }, // This stores the price at the time of order
});






const OrderItem = mongoose.model('OrderItem', OrderItemSchema)
module.exports = OrderItem;