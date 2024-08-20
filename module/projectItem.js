const mongoose = require('mongoose');

const {Schema}=mongoose;

const projectItemSchema= new Schema({
    file:{
        type:Schema.Types.ObjectId,
        ref:'File'
    },
   
    images:[{
        type:Schema.Types.ObjectId,
        ref:'Image'
    }]

})

const ProjectItem = mongoose.model('ProjectItem',projectItemSchema);
module.exports = ProjectItem;
