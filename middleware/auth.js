const jwt=require('jsonwebtoken')  //to verify token we need jwt to importing here
const config=require('../utils/config') //to get secret
const User=require('../models/user')


const auth={ 
    verifyToken:(request,response,next)=>{
        try{

            // get token from request headers
            const token=request.cookies.token;
            
            //if token not exist, return error
            if(!token){
                return response.status(401).json({message:'unauthorised'})
            }
            //verify token
            try{
                const decodedToken=jwt.verify(token,config.JWT_SECRET)

                //set userid in request object
                request.userId=decodedToken.id;

                //call the next middleware
                next();

            }catch{
                response.status(401).json({message:'invalid token'})
            }
        }
        catch(error){
            response.status(500).json({message:error.message})
        }
    },
    isAdmin: async (request, response, next) => {
        try {
            // Get the user id from the request object
            const userId = request.userId;

            // Find the user by id
            const user = await User.findById(userId);

            // If the user is not an admin, return an error
            if (user.role !== 'admin') {
                return response.status(403).json({ message: 'Forbidden' });
            }

            // if the user is an admin, call the next middleware
            next();
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
}

//export auth object
module.exports=auth;