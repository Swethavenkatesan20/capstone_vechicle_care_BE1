const mongoose=require('mongoose')

//create schema
const userSchema=new mongoose.Schema({
    email:String,
    passwordHash:String,
    name: String,
    location:{
        type: String,
        default: 'unknown'
    },
    role:{
        type : String,
        enum:['user','admin'],
        default:'user'
        
    }
})

module.exports=mongoose.model('User',userSchema,'users');
