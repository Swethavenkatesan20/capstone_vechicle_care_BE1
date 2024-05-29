//import mongoose
const mongoose=require('mongoose')
//import config module
const config=require('./utils/config')
//import express
const app=require('./app')



//console statement
console.log('connecting to db')



// connect to database
mongoose.connect(config.MONGODB_URI)
.then(()=>{
    console.log("connected to mongodb");

//listen to port
    app.listen(config.PORT,()=>{
    console.log("server running at the port",config.PORT);
})
})
.catch((error)=>{
console.log("error occured",error.message);
})



