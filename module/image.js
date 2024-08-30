const mongoose = require('mongoose')

const {Schema} = mongoose;

const imageSchema = new Schema({

  originalName: String,
    encoding: String,
    mimetype: String,
    size: Number,
    destination: String,
    filename: String,
    path: String,
  
  });

const ProjectImages = mongoose.model('ProjectImages', imageSchema);
module.exports = ProjectImages;