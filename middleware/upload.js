const multer = require('multer')
const path = require('path')

const storage= multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, 'Uploads/')
    },
    filename:function(req,file, cb){
        cb(null, path.extname(file.originalname)+Date.now())
    }
})


const upload = multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*50
    },
    fileFilter:function(req, file, cb){
        if(file.mimetype=="image/png" ||file.mimetype=="application/zip"  ){
            cb(null,true)
        }
        else{
            console.log("Only zip file is supported")
            cb(null, false)
        }
        

    }
}).fields([
    { name: 'file', maxCount: 1 },
    { name: 'projectImages', maxCount: 4 }
  ]);

module.exports = upload;