const express=require('express');
const router=express.Router();
const File=require('../module/file');

router.post('/files/:id/like',async(req,res)=>{
    try {
        const project = await File.findById(req.params.id);
        if(!project){
            res.status(404).send("Project not found")

        }
        const userId=req.body.userId;
        //Check if the user has already liked the project
        if(project.likedBy.includes(userId)){
            return res.status(400).send("User has already liked the project");

        }

        //Remove the user from the dislikedBy array if they had disliked i
        if(project.dislikedBy.includes(userId)){
            project.like-=1;
            project.dislikedBy.pull(userId);

        }

        //Add the user to liked by array and increment likes
        project.likedBy.push(userId)
        project.like +=1;
        await project.save();
        res.status(200).json({likes:project.like,dislikes:project.dislike})
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
        
    }
});
//Dislike a project
router.post('/files/:id/dislike',async(req,res)=>{
    try {
        const project=await File.findById(req.params.id);
        if(!project){
            res.status(404).send("Project is not found")
        }
        const userId=req.body.userId

        //Check if the user has already disliked the project
        if(project.dislikedBy.includes(userId)){
            res.status(400).send("User has already disliked the project")

        }
        //Remove the user from  the likedBy array if they had liked it
        if(project.likedBy.includes(userId)){
            project.like-=1;
            project.likedBy.pull(userId);
        }

        // Add the user to dislikedBy array and increment dislike
        project.dislikedBy.push(userId);
        project.dislike+=1;
        await project.save();
        res.status(200).json({likes:project.like, dislikes:project.dislike})
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
        
    }
})
module.exports = router;
