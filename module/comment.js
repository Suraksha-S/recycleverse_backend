const mongoose=require ('mongoose');
const {Schema}=mongoose;

const commentSchema=new Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'File'
    },
    
    comment: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Comment = mongoose.model('Comment',commentSchema);
module.exports=Comment;