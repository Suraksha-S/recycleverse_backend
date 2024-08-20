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
  // imagePath:{
  //   type:String,
  //   required:true
  // },
  // file:{
  //   type:Schema.Types.ObjectId,
  //   ref:'File'
  // }
  // url:{
  //   type:String,
  //   required:true

  // },
  //   image: {
  //     data: Buffer,
  //     contentType: String,
  //   },
  //   filename: {
  //     type: String,
  //     required: true
  //   },
  //   size: {
  //     type: Number,
  //     required: true
  //   },
  //   file:{
  //     type:Schema.Types.ObjectId, ref:'File'
  //   }

  //   projectDetail:{type:Schema.Types.ObjectId,
  //     ref:'ProjectDetail'
  // },
  });

const ProjectImages = mongoose.model('ProjectImages', imageSchema);
module.exports = ProjectImages;