const User = require("../models/user");
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const config=require('../utils/config')

//define the controllers
const userController={
    register:async (request,response)=>{
        try{
            //get user inputs from request body
            const {email,password,name,location,role}=request.body;


            // Check if the role is provided and it's "admin"
            const isAdmin = role && role.toLowerCase() === 'admin';

            //to check user already exist in database
            const user=await User.findOne({email});

            //if user user exist return error
            if(user){
                return response.status(400).json({message:'user already exist'});
            }

            //hash password
            const passwordHash= await bcrypt.hash(password,10)
            //if does not exist
            const newUser=new User({
                email,
                passwordHash,
                name,
                location,
                role: isAdmin ? 'admin' : 'user'    // if the role is not admin by default it will add role as
            })

            //save user to database
            const savedUser=await newUser.save()

            //return saved user
            response.status(201).json({
                message:"user created successfully",
                user:savedUser
            })

        }
        catch(error){
            response.status(500).json({message:error.message})
        }
    },
    login: async(request,response)=>{
        try{
            //get the username password from request body
            const {email,password}=request.body

            //check user exist in database
            const user=await User.findOne({email});
            
            //if user does not exist return error
            if(!user){
                return response.status(400).json({message:'user does not exist'});
            }
            //if user exist and check password 
            const isPasswordCorrect= await bcrypt.compare(password,user.passwordHash)

            //if password incorrect, return error
            if(!isPasswordCorrect)
            {
                return response.status(400).json({message: 'invalid credendials'})
            }

            //if password correct generate token for user and retuen
            const token=jwt.sign({
                email:user.email,
                id:user._id,
                name:user.name,
                    },config.JWT_SECRET)

            //set http cookies
            response.cookie('token',token,{
                httpOnly:true,
                sameSite:'none',
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                secure:true,
            });
            //return the token
            response.json({message:'login successful',token})
        }catch(error){
            response.status(500).json({message:error.message})

        }
    },
    getUser: async (request, response) => {
        try {
          // get the user id from the request object
          const userId = request.userId;
    
          // find the user by id from the database
          const user = await User.findById(userId).select('-passwordHash -__v -_id');
    
          // if the user does not exist, return an error
          if (!user) {
            return response.status(404).json({ message: 'User not found' });
          }
    
          // if the user exists, return the user
          response.json({ message: 'User found', user });
        } catch (error) {
          response.status(500).json({ message: error.message });
        }
      },
    
    updateUser: async (request, response) => {
        try {
            // get the user id from the request object
            const userId = request.userId;

            // get the user inputs from the request body
            const { name, location } = request.body;

            // find the user by id from the database
            const user = await User.findById(userId);

            // if the user does not exist, return an error
            if (!user) {
                return response.status(404).json({ message: 'User not found' });
            }

            // update the user if the user exists
            if (name) user.name = name;
            if (location) user.location = location;

            // save the updated user to the database
            const updatedUser = await user.save();

            // return the updated user
            response.json({ message: 'User updated successfully', user: updatedUser });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },

    deleteUser: async (request, response) => {
        try {
            // get the user id from the request object
            const userId = request.userId;

            // find the user by id from the database
            const user = await User.findById(userId);

            // if the user does not exist, return an error
            if (!user) {
                return response.status(404).json({ message: 'User not found' });
            }

            // delete the user if the user exists
            await user.remove()

            // return a success message
            response.json({ message: 'User deleted successfully' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    logout: async (request, response) => {
        try {
            // clear the token cookie
            response.clearCookie('token');

            // return a success message
            response.json({ message: 'Logout successful' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
}

//export controllers
module.exports=userController;