const mongoose = require('mongoose');
const ProjectDetail = require('./projectdetail');


const {Schema} = mongoose;

const fileSchema = new Schema({
    originalName: String,
    encoding: String,
    mimetype: String,
    size: Number,
    destination: String,
    filename: String,
    path: String,
    projectDetails:{type:Schema.Types.ObjectId,
        ref:'ProjectDetail'
    },
    projectImages:[{
        type:Schema.Types.ObjectId,
        ref:'ProjectImages'
    }],
    uploadDate: { type: Date, default: Date.now }

})

const File = mongoose.model('File', fileSchema);
module.exports = File;