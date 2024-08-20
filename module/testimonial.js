const mongoose = require('mongoose');
const {Schema}=mongoose;

const testimonialSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const Testimonial = mongoose.model('Testimonial', testimonialSchema)
module.exports=Testimonial;