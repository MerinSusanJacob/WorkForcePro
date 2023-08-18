const mongoose=require('mongoose');
const employeeSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:String,
    position:{
        type:String,
        required:true
    },
    salary:{
        type:Number
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
});
const employeeModel=mongoose.model('employeesData',employeeSchema);
module.exports=employeeModel;