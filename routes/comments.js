const express=require('express');
const router=express.Router();
const Comment=require('../module/comment')

router.post('/comments',async(req,res)=>{
    const {projectId, comment}=req.body;
    try {
       const newComment=new Comment({
        projectId, comment
       })
       await newComment.save();
       res.status(200).json({
        msg:"Comment sent successfully",
        result:newComment
       })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
        
    }
});

router.get('/comments',async(req,res)=>{
    try {
       const comment=await Comment.find();
       if(!comment){
        res.status(404).send("comment is not found");

       } 
       res.status(200).json(comment);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error")
        
    }
});
router.get('/comments/:id',async(req,res)=>{
    try {
        const comment=await Comment.findById(req.params.id);
        if(!comment){
            res.status(404).send("Comment not found")
        }
        res.status(200).json({
            msg:"Comment fetchedsuccessfully",
            result:comment
        })
           
    } catch (error) {
        console.error(error.message);
        res.status.send("server error")
        
    }
})
router.put('/comments/:id',async(req,res)=>{
    const {projectId, comment}=req.body;
    const commentField={}
    if(projectId)commentField.projectId=projectId;
    if(comment)commentField.projectId=comment;
    
    try {
        const newcomment = await Comment.findById(req.params.id)
        if(!newcomment){
            res.status(404).sendStatus("comments are not found")
        }
       newcomment=await Comment.findByIdAndUpdate(req.params.id,
        {$set:commentField },{new:true,runValidators:true}
       )

       res.status(200).json(newcomment)


        
    } catch (error) {
        console.error(error.message)
        if(error.kind==='ObjectId'){
            res.status(404).send("page not fund")
        }
        res.status(500).send("Server error")

    }

})
router.delete('/comments/:id',async(req,res)=>{
    try {
        const comment= await Comment.findByIdAndDelete(req.params.id);
        if(!comment){
            res.status(404).send("Comment is not found")
        }
      
        res.status(200).send("Comment deleted successfully")
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error")
    }
})
module.exports=router;