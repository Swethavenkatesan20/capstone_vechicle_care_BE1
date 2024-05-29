//import express
const express=require('express');
//import cors
const cors=require('cors')
//import user router
const userRouter = require('./routes/userRoutes');

//import service router
const serviceRouter = require('./routes/serviceRoutes');

//import appointment router
const appointmentRouter = require('./routes/appointmentRoutes');


//import review router
const reviewRouter = require('./routes/reviewRoutes');







//import cookieParser 
const cookieParser=require('cookie-parser')
//import morgan
const morgan=require('morgan');



//create aplication
const app=express();





//enable cors request
app.use(cors({
    origin: 'http://localhost:5173',  // allow all origin
    credentials: true
}));


//use cookie parser
app.use(cookieParser());
//use morgan to log request to console
app.use(morgan('dev'))



//toenable  express application to parse json
app.use(express.json());  //in postman i have sent data in json it will convert as javascript object and give us

//define endpoints 
//defined endponts in routes
//it is middleware "use" keyword
app.use('/api/users',userRouter);

//for service
app.use('/api/services',serviceRouter)

//for service
app.use('/api/appointments',appointmentRouter)

//for review
app.use('/api/reviews', reviewRouter);


module.exports= app;