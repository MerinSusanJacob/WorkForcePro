const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
});
const userModel=mongoose.model('userData',userSchema);
module.exports=userModel;