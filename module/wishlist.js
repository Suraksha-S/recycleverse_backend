const mongoose=require('mongoose');
const {Schema}=mongoose;

const wishlistSchema=({

    userId: { type: Schema.Types.ObjectId, required: true },
    projectId: { type: Schema.Types.ObjectId,ref:'File', required: true },
    addedAt: { type: Date, default: Date.now },
})
const Wishlist=mongoose.model('Wishlist',wishlistSchema)
module.exports=Wishlist;