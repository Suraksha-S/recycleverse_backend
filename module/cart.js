const mongoose=require('mongoose');
const {Schema}=mongoose;
const CartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: false},
    items: [
        {
            projectId: { type: Schema.Types.ObjectId, ref: 'File', required: true },
            quantity: { type: Number, required: true, default: 1 }
        }
    ],
    totalPrice: { type: Number, required: true, default: 0 }
});
const Cart=mongoose.model('Cart', CartSchema);
module.exports = Cart;