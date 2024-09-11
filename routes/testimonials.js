const express= require('express');
const router = express.Router();
const Testimonial = require('../module/testimonial')

router.post('/testimonial',async(req,res)=>{
    const {name, message,rating,date}=req.body;

    try {
        if(!req.body){
            res.status(400).send("Cannot send the testimonials")
        }

        const newTestimonial=new Testimonial(
            {name, message,rating,date}
        )
        await newTestimonial.save()
        res.status(200).json({msg:"testimonial sent successfully..!",
            testimonial:newTestimonial
        })

        
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server error")
        
    }
})

router.get('/testimonial', async(req,res)=>{
    try {
        const testimonial= await Testimonial.find();
        if(!testimonial){
            res.status(400).send("Testimonials are not found")
        }
        res.status(200).json(testimonial)
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error")
        
    }


})
router.get('/testimonial/:id', async(req,res)=>{
    try {
       const testimonial =await Testimonial.findById(req.params.id);
       if(!testimonial){
        res.status(404).send("The testimonial is not found");
       }
       res.status(200).send(testimonial)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server error")
        
    }
})
router.delete('/testimonial/remove/:id', async(req,res)=>{
    try {
        const testimonial=await Testimonial.findByIdAndDelete(req.params.id);
    if(!testimonial){
        res.status(404).send("Testimomial not found")
    }
    
    res.status(200).send("Testimonial removed successfully")
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error")
        
    }
    
});
router.put('/testimonial/update/:id',async(req,res)=>{
     const {name, message,rating,date}=req.body;
     const testimonialField={};
     if(name)testimonialField.name=name;
     if(message)testimonialField.message=message;
     if(rating)testimonialField.rating=rating;
     if(date)testimonialField.date=date;
    try {
       let testimonial=await  Testimonial.findById(req.params.id)
        if(!testimonial){
            res.status(404).send("Testimonial is not found")
        }
      testimonial=await Testimonial.findByIdAndUpdate(req.params.id,
                    {$set:testimonialField },{new:true,runValidators:true}
                   )
            
                   res.status(200).json(testimonial)


        
    } catch (error) {
        
        console.error(error.message)
        res.status(500).send("Server error")
    }
})

module.exports=router;