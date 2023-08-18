const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
router.use(express.json());
router.use(express.urlencoded({extended:true}));

const usData=require('../model/userData');

//login
router.post('/login',async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const user=await usData.findOne({username:username});
    if(!user){
        res.json({message:"user not found"});
    }
    try {
        if(user.password===password){
            jwt.sign({email:username,id:user._id},"emp",{expiresIn:'1d'},
            (err,token)=>{
                if (err) {
                    res.json({message:"Token not generated"});
                } else {
                    res.json({message:"Login successful",token:token,data:user});
                }
            })   
        }
        else{
            res.json({message:"Login failed"});
        }
    } catch (error) {
        console.log(error);
    }
})
//sign up
router.post('/postusdata',async (req,res)=>{
    try {
        const item=req.body;
        const newdata=new usData(item);
        await newdata.save();
        res.json({message:"Registered successfully"});
    } catch (error) {
        //res.json({message:"Registeration not successfull"});
        console.log(error);
    }
});

module.exports=router;