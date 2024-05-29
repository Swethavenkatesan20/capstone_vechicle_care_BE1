//import express router
const express=require('express');
const userController = require('../controllers/userControllers');
const userRouter=express.Router();
const auth=require('../middleware/auth')


//definig endpoints
// POST/api/users/register : to register new user
userRouter.post('/register',userController.register);
userRouter.post('/login',userController.login);

//auth.verifyToken --this is middleware if token if verified profile will be fetched from this. then i would have written next() in middleware/auth so next function which is fetching profile will hapen
userRouter.get('/profile', auth.verifyToken,userController.getUser);
userRouter.put('/profile',auth.verifyToken,userController.updateUser);
userRouter.delete('/profile',auth.verifyToken,userController.deleteUser);
userRouter.get('/logout', auth.verifyToken, userController.logout);

module.exports=userRouter;
