const express = require('express');

const ProjectDetail = require('../module/projectdetail')

const router=express.Router();


// !-----------------------------------------------------------------
router.post('/projectdetails',async(req,res)=>{
    const {category,domain, title, description, technology, createdAt, updatedAt}=req.body;
    // const files = req.files;

    try {
        if(!req.body){
            res.status(404).json({msg:"Project details are not found"})
        }
        const newProjectDetail = new ProjectDetail(
            {category, title,domain, description, technology, createdAt, updatedAt}
        )
        await newProjectDetail.save();
        res.status(200).json(newProjectDetail);

       
        
    } catch (error) {
        
        console.error(error.message)
        res.status(500).send("Server Error")
    }

})

router.get('/projectdetails', async(req,res)=>{
    try {
        const newProjectDetail = await ProjectDetail.find()
        if(!newProjectDetail){
            res.status(404).send("Project details are not found")
        }
        res.status(200).json(newProjectDetail)

        
    } catch (error) {
        console.error(error.message);
        if(error.kind==="ObjectId"){
            res.status(404).send('Page not found')
        }
        res.status(500).send("Server error")
        
    }
})

router.get('/projectdetails/:id', async(req,res)=>{
    try {
        const newProjectDetail = await ProjectDetail.findById(req.params.id)
        if(!newProjectDetail){
            res.status(404).send("Project details are not found")
        }
        res.status(200).json(newProjectDetail)

        
    } catch (error) {
        console.error(error.message);
        if(error.kind==="ObjectId"){
            res.status(404).send('Page not found')
        }
        res.status(500).send("Server error")
        
    }

})

router.delete('/projectdetails/:id', async(req,res)=>{
    try {
        const newProjectDetail = await ProjectDetail.findByIdAndDelete(req.params.id)
        if(!newProjectDetail){
            res.status(404).send("Project details are not found")
        }
       
        res.status(200).json({msg:"Project details removed successfully..!"})

        
    } catch (error) {
        console.error(error.message);
        if(error.kind==="ObjectId"){
            res.status(404).send('Page not found')
        }
        res.status(500).send("Server error")
        
    }

})

router.put('/projectdetails/:id', async(req,res)=>{

    const {category, title,domain, description, technology, createdAt, updatedAt}=req.body;
    const projectDetailField={}
    if(category)projectDetailField.category=category;
    if(domain)projectDetailField.domain=domain;
    if(title)projectDetailField.title=title;
    if(description)projectDetailField.description=description;
    if(technology)projectDetailField.technology=technology
    if(createdAt)projectDetailField.createdAt=createdAt;
    if(updatedAt)projectDetailField.updatedAt=updatedAt;

    try {
        const newProjectDetail = await ProjectDetail.findById(req.params.id)
        if(!newProjectDetail){
            res.status(404).sendStatus("project details are not found")
        }
       newProjectDetail=await ProjectDetail.findByIdAndUpdate(req.params.id,
        {$set:projectDetailField },{new:true,runValidators:true}
       )

       res.status(200).json(newProjectDetail)


        
    } catch (error) {
        console.error(error.message)
        if(error.kind==='ObjectId'){
            res.status(404).send("page not fund")
        }
        res.status(500).send("Server error")

    }
})



module.exports=router;