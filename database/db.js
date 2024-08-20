const mongoose = require('mongoose')
const ProjectDetail = require('../module/projectdetail')


const connectDb= async()=>{
    
        mongoose.connect('mongodb://localhost:27017/recycleverse')
        console.log("MongoDB connected")
        
        try {
            const projectData = await ProjectDetail.find({})
            
            console.log('Project data', projectData)

   
        
    } catch (error) {
        console.error(error.message)
        process.exit(1)

        
    }
   

}

module.exports=connectDb;