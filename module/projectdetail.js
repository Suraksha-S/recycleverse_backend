const mongoose= require('mongoose')


const {Schema} = mongoose;

const projectdetailSchema = new Schema({
    file:{
        type:Schema.Types.ObjectId,
        ref:'File'

    },
    // projectitems:{

    //     type:Schema.Types.ObjectId,
    //     ref:'ProjectItem',
    //     required:true

    // },
    category:{
        type:String,
        required:true
    },
    domain:{
        type:String,
        required:true

    },
    title:{ 
        type:String,
        required:true

    },
    description:{
        type:String,
        required:true
    },
    technology:{
        type:String,
        required:true
    },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
    createdAt:{
        type:Date,
        default:Date.now
    },
    // file:[{
    //     type:Schema.Types.ObjectId,
    //     ref:'File'
    // }],
   
  
    createdAt:{
        type:Date,
        default:Date.now

    },
    updatedAt:{
        type:Date,
        default:Date.now
    }

})

const ProjectDetail = mongoose.model('ProjectDetail', projectdetailSchema);
module.exports= ProjectDetail;