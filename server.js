const express = require('express')
const app = express()
const connectDb = require('./database/db')
const fileRoute = require('./routes/files')
const projectdetailRoute = require('./routes/projectdetails')
const buyprojectRoute = require('./routes/buyprojects')
const imageRoute = require('./routes/images')
const orderRoute = require('./routes/orders')
const testimonialRoute=require('./routes/testimonials')
require('dotenv').config();
// const api = process.env.API_URL;


//Middleware
app.use(express.json())
// app.use('/imageuploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/rv', fileRoute)  //Routes to upload the file
app.use('/api/rv',projectdetailRoute)
app.use('/api/rv',buyprojectRoute)
// app.use('/api/rv', imageRoute)
app.use('/api/rv', orderRoute)
app.use('/api/rv' ,testimonialRoute)





//Connecting database
connectDb();

app.get('/',(req,res)=>{
    res.send("hello backend")
})

app.listen(3000,()=>{

    console.log("Server is running at http://localhost:3000")

})