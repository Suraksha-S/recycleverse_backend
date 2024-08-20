const mongoose = require('mongoose');

const orderItemSchema= mongoose.Schema({
    quantity:{
        type: Number,
        required:true
    },
    // projectDetail:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'ProjectDetail'
    // },
    file:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'File'
    },

})

const OrderItem = mongoose.model('OrderItem', orderItemSchema)
module.exports = OrderItem;