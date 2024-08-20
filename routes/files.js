  const express = require('express')
  const upload = require('../middleware/upload')
  const File = require('../module/file')
  const ProjectDetail = require('../module/projectdetail')
  const mongoose = require('mongoose')
  const ProjectImages = require('../module/image')


  const router = express.Router();

  // Endpoint to upload file and project images
  router.post('/upload', upload, async (req, res) => {
      console.log('Received file:', req.files['file']);
      console.log('Received project images:', req.files['projectImages']);
      console.log('Received project details:', req.body.projectDetailsData);
    const { projectDetailsData } = req.body;
    const fileData = req.files['file'][0];
  
    const projectImagesData = req.files['projectImages'] ? req.files['projectImages'] : ['projectImages'];

    if (!fileData || !projectDetailsData) {
        return res.status(400).json({ error: 'Missing required fields: file or projectDetailsData' });
    }

    // const session = await mongoose.startSession();
    // session.startTransaction();
    try {
      const projectDetails = new ProjectDetail(JSON.parse(projectDetailsData));
      await projectDetails.save();

      const projectImages = await ProjectImages.insertMany(projectImagesData.map(img => ({
        imagePath: img.path,
        file: null // Will set this later
      })));

      const file = new File({
        originalName: fileData.originalName,
        encoding:fileData.encoding,
        mimetype:fileData.mimetype,
        size:fileData.size,
        destination:fileData.destination,
        filename:fileData.filename,
        path: fileData.path,
        projectDetails: projectDetails._id,
        uploadDate:fileData.uploadDate,
        projectImages: projectImages.map(img => img._id)
      });
    await file.save();

      // Update project images to reference the file
      await ProjectImages.updateMany(
        { _id: { $in: projectImages.map(img => img._id) } },
        { $set: { file: file._id } },
       
      );

   
      

      res.status(201).json(file);
    } catch (error) {
      
      res.status(400).json({ error: error.message });
    }
  });

  router.get('/files',async(req,res)=>{
    try {
      const file = await File.find().populate('projectDetails').populate('projectImages').exec();
      res.status(200).json(file)
      
    } catch (error) {
      console.error(error.message);
      
    }
  })
  // Endpoint to get file with project details and images
  router.get('/files/:id', async (req, res) => {
    try {
      const file = await File.findById(req.params.id)
        .populate('projectDetails')
        .populate('projectImages')
        .exec();
      res.status(200).json(file);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  router.delete('/files/:id',async (req,res)=>{
    try {
      const file=await File.findByIdAndDelete(req.params.id);
      if(!file){
        res.status(404).send("project file is not found");
      }
      res.status(200).send("File removed successfully")
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error")
    }

  })
 

  module.exports = router;

// router.post('/projectupload',upload.fields([{name :'file', maxCount:1},{name:'images', maxCount:4}]),async(req,res)=>{
//     const {projectDetailsData}=req.body;
//     const fileData = req.files['file'][0];
//     const projectImagesData = req.files['images'][4]
// })

// const session = await mongoose.startSession();
// session.startTransaction();

// try {
//    const projectDetails = new ProjectDetail(JSON.parse(projectDetailsData));
//    await projectDetails. save({session});

//    const projectImages= new ProjectImages.insertMany(projectImagesData.map(img=>({
//     imagePath:img.path,
//     file:null
//    })),{session})
// } catch (error) {
    
// }
// ! ******************************************************************

// router.post(`/fileupload`, upload.single('file'),async(req,res)=> {
//      const {originalName,encoding,mimetype, size,destination,filename, path, uploadDate} = req.file;

//      try {

//         if(!req.file){
//             res.status(400).json({msg:"File not found"})
//         }
//         const newFile = new File({
//             originalName,encoding,mimetype, size,destination,filename, path, uploadDate
//         })
//         await newFile.save();
//         res.status(200).json({result:newFile,
//             msg:"File uploaded successfully"}
//         )

        
        
//      } catch (error) {
//         console.error(error.message)
//         res.status(500).send("Server Error")
        
//      }
// })

// // router.post('/fileupload',upload.fields([{name:'file', maxCount:1},{name :'images', maxCount:4}]),async(req,res)=>{
// //     const {projectDetailsData}= req.body
// //     const fileData =['file'][0];
// //     const projectImagesData=req.files['images'];

// //     const session = await mongoose.startSession()
// //     session.startTransaction();

// //     try {
// //         const projectDetails= new ProjectDetail(JSON.parse(projectDetailsData))
// //         await projectDetails.save({session})

// //         const projectImages = await Image.insertMany(projectImagesData.map((image)=>{

// //         }))
// //     } catch (error) {
        
// //     }
// // })

// router.get('/fileupload',async(req,re)=>{
//     try {
        
//         const newFile = await File.find();
//         if(!newFile){
//             res.status(404).send("Files are not found")
//         }
//         res.status(200).json(newFile)
//     } catch (error) {
//         console.error(error.message);
//         if(error.kind==="ObjectId"){
//             res.status(404).send('File not found')
//         }
//         res.status(500).send("Server error")
        
//     }
// })

// router.get('/fileupload/:id',  async(req,res)=>{
//     try {
//         const newFile = await File.findById(req.params.id)
//         if(!newFile){
//             res.status(404).send("Files are not found")
//         }
//         res.status(200).json(newFile)

        
//     } catch (error) {
//         console.error(error.message);
//         if(error.kind==="ObjectId"){
//             res.status(404).send('File not found')
//         }
//         res.status(500).send("Server error")
        
//     }
// })

// router.put('/fileupload/:id', upload.single('file'),async(req,res)=>{
//     const {originalName,encoding,mimetype, size
//         ,destination,filename, path, uploadDate} = req.file;
//         const fileField = {}
//         if(originalName)fileField.originalName=originalName;
//         if(encoding)fileField.encoding=encoding;
//         if(mimetype)fileField.mimetype=mimetype;
//         if(size)fileField.size=size;
//         if(destination)fileField.destination=destination;
//         if(filename)fileField.filename=filename;
//         if(path)fileField.path=path;
//         if(uploadDate)fileField.uploadDate=uploadDate
// try {
//     const newFile = await File.findById(req.params.id)
//     if(!newFile){
//         res.status(404).sendStatus("File is not found")
//     }
//     newFile=await File.findByIdAndUpdate(req.params.id,
//         {$set:fileField },{new:true,runValidators:true}
//     )
    
// } catch (error) {
//     console.error(error.message)
//         if(error.kind==='ObjectId'){
//             res.status(404).send("File not fund")
//         }
//         res.status(500).send("Server error")
    
// }
// })

// router.delete('/fileupload/:id', async(req,res)=>{
//     try {
//         const newFile = await File.findByIdAndDelete(req.params.id)
//         if(!newFile){
//             res.status(404).send("Project details are not found")
//         }
       
//         res.status(200).json({msg:"File removed successfully..!"})

        
//     } catch (error) {
//         console.error(error.message);
//         if(error.kind==="ObjectId"){
//             res.status(404).send('File not found')
//         }
//         res.status(500).send("Server error")
        
//     }

// })


// module.exports=router;
