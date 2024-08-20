const mongoose = require('mongoose')
const ProjectDetail = require('../module/projectdetail')

// const { MongoClient }=require('mongodb')

// async function connectDb(){
//     const uri='mongodb://localhost:27017/recycleverse'
//     const client= new MongoClient(uri, {useNewUrlParser:true, useUnifiedTopology:true, socketTimeoutMS: 45000,
//         connectTimeoutMS: 30000,
//         serverSelectionTimeoutMS: 5000,
//         });
//     try {
//         console.log("MongoDB connected")
//         await client.connect()
//         const database = client.db('recycleverse');
//         const projectDetailsCollection=database.collection('projectdetails');
//         const categoryCollection = database.collection('category')
//         const query={};
//         const options={};

//         const projectData=await projectDetailsCollection.find({}).toArray();
//         const categoryData=await categoryCollection.find({}).toArray();

//         console.log(projectData)
       

//         global.projectDetailsCollection = projectData;
//         global.categoryCollection = categoryData;

//     } catch (error) {
//         console.error('Error occurred while fetching the data', error)
        
//     } finally{
//         await client.close();
//     }

// }
// module.exports=connectDb;

const connectDb= async()=>{
    
        mongoose.connect('mongodb://localhost:27017/recycleverse'
        //    {
        //     useNewUrlParser:true,
        //     useUnifiedTopology:true
        //    } 
        )
        console.log("MongoDB connected")
        
        try {
            const projectData = await ProjectDetail.find({})
            // const categoryData = await ProjectDetail.find({})
            console.log('Project data', projectData)

            // console.log('Category data', categoryDataData)
   
        
    } catch (error) {
        console.error(error.message)
        process.exit(1)

        
    }
   

}

module.exports=connectDb;