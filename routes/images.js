// const express = require('express');
// const upload = require('../middleware/uploadimages')
// const Image = require('../module/image')

// const router = express.Router();

// router.post('/imagesupload', upload.array('images', 4), async (req, res) => {
//     try {
//       const files = req.files;
  
//       const imageDocs = files.map(file => ({
//         image: {
//           data: file.buffer,
//           contentType: file.mimetype,
//         },
//         filename: file.originalname, // Add the file name
//         size: file.size // Add the file size
//       }));
  
//       await Image.insertMany(imageDocs);
  
//       res.status(201).send('Images uploaded successfully!');
//     } catch (err) {
//       res.status(500).send(err.message);
//     }
//   });

//   router.get('/imagesupload', async(req,res)=>{
//     try {
//         const newImage = await Image.find()
//         if(!newImage){
//             res.status(404).send("Images are not found")
//         }
//         res.status(200).json(newImage)
//     } catch (error) {
//         console.error(error.message)
//         if(error.kind==="ObjectId"){
//             res.status(404).send("Imager are not found")
//         }
//         res.status(500).send("Server error")
        
//     }
//   })

//   router.get('/imagesupload/:id', async(req,res)=>{
//     try {
//         const newImage = await Image.findById(req.params.id)
//         if(!newImage){
//             res.status(404).send("Images are not found")
//         }
//         res.status(200).json(newImage)
//     } catch (error) {
//         console.error(error.message)
//         if(error.kind==="ObjectId"){
//             res.status(404).send("Imager are not found")
//         }
//         res.status(500).send("Server error")
        
//     }
//   })

//   module.exports = router

// // router.post('/imagesupload', upload.array('images',2), async(req,res)=>{
// //     const {originalName,encoding,mimetype, size,destination,filename, path, uploadDate} = req.files;

// //      try {

// //         if(!req.files){
// //             res.status(400).json({msg:"File not found"})
// //         }
// //         const newImage = new ImageFile({
// //             originalName,encoding, mimetype, size,destination,filename, path, uploadDate
// //         })
// //         await newImage.save();
// //         res.status(200).json({result : newImage}) 

        
        
// //      } catch (error) {
// //         console.error(error.message)
// //         res.status(500).send("Server Error")
        
// //      }
   

// // })

// // router.get('/imagesupload', async(req,res)=>{
// //     try {
// //         const getImages = await ImageFile.find()
// //     res.status(200).json(getImages)
// //     } catch (error) {
// //         console.error(error.message)
// //         res.status(500).send("Server error")
        
// //     }
    
// // })

// // module.exports = router;

// // try {
// //     const files = req.file
// //     if(!files){
// //         res.status(400).send("No files are uploaded")
// //     }
   
// // let images = files.map(file => ({
// //     imageName: file.originalname,
// //     imageData: file.buffer,
// //     contentType: file.mimetype
// //   }));

// //   await ImageFile.insertMany(images);

// //   res.send('Images uploaded successfully.');
    
// // } catch (error) {
// //     console.error(error.message)
// //     res.status(500).send("Sever error")
    
// // }