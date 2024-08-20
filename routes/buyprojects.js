const express = require('express');



const router = express.Router();
const File=require('../module/file');
const { route } = require('./buyprojects');


router.get('/buyprojects',async(req,res)=>{
    
    try {

        const projectDetails=await File.find()
        res.json(projectDetails)
        // console.log(projectDetails)
    } catch (error) {
        res.status(500).json({error:"An error occured while fetching products"})
        
    }
})

//buy projects based on id
router.get('/buyprojects/:id', async(req,res)=>{
    try { 
        const projectDetails = await File.findById(req.params.id)
        res.status(200).json(projectDetails)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({msg:"Server error"})
        
    }

})

//Buy projects based on category
router.get('/buyprojects/category/:category', async(req,res)=>{
    try { 
        const category = req.params.category
        const projectDetails = await File.find({category})
        res.status(200).json(projectDetails)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({msg:"Server error"})
        
    }

})
//Buy projects based on domain
router.get('/buyprojects/domain/:domain',async(req,res)=>{
    try {
        const domain = req.params.domain;
        const projectDetails= await File.find({domain})
        res.status(200).json({projectDetails})
        
    } catch (error) {
        console.error(error.message)
        res.status(500).json({msg:"Server error"})
        
    }
})
//Buy projects based on project title/name
router.get('/buyprojects/title/:title',async(req,res)=>{
    try {
        const title = req.params.title;
        const projectDetails= await File.find({title})
        res.status(200).json({projectDetails})
        
    } catch (error) {
        console.error(error.message)
        res.status(500).json({msg:"Server error"})
        
    }
})



module.exports=router;