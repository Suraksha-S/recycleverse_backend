  const express = require('express')
  const upload = require('../middleware/upload')
  const File = require('../module/file')
  const ProjectDetail = require('../module/projectdetail')
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

