const express = require('express')
const app = express()
const connectDb = require('./database/db')
const fileRoute = require('./routes/files')
const projectdetailRoute = require('./routes/projectdetails')
const buyprojectRoute = require('./routes/buyprojects')
const imageRoute = require('./routes/images')
const orderRoute = require('./routes/orders')
const testimonialRoute=require('./routes/testimonials')
const commentRoute=require('./routes/comments');
const likedislikeRoute=require('./routes/likesdislikes');
const wishlistRoute= require('./routes/wishlists');
const cartRoute =require('./routes/carts');




//Middleware
app.use(express.json())
// app.use('/imageuploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/rv', fileRoute)  //Routes to upload the file
app.use('/api/rv',projectdetailRoute)
app.use('/api/rv',buyprojectRoute)
// app.use('/api/rv', imageRoute)

app.use('/api/rv' ,testimonialRoute)
app.use('/api/rv',commentRoute);
app.use('/api/rv',likedislikeRoute)

app.use('/api/rv',wishlistRoute)
app.use('/api/rv',cartRoute);
app.use('/api/rv', orderRoute)



//Connecting database
connectDb();

app.get('/',(req,res)=>{
    res.send("hello backend")
})

app.listen(3000,()=>{

    console.log("Server is running at http://localhost:3000")

})