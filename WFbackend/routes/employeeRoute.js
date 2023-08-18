const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');

router.use(express.json());
router.use(express.urlencoded({extended:true}));

const emData=require('../model/employeeData');
const auth=require('../auth/auth');

//to view dashboard
router.get('/getemdata/:token',async (req,res)=>{
    try {
        const data=await emData.find();
        jwt.verify(req.params.token,"emp",
        (error,decoded)=>{
            if(decoded && decoded.email){
                res.json(data);
            }
            else{
                res.json({message:"Unauthorised user"});
            }
        })  
    } catch (error) {
         res.json({message:"Not successful"});
    }
    
})


//to post employee data to database
router.post('/postemdata',auth,(req,res)=>{
    try {
        const item=req.body;
        const newdata=new emData(item);
        jwt.verify(req.body.token,"emp",
        (error,decoded)=>{
            if(decoded && decoded.email){
                newdata.save();
                res.json({message:"Posted successfully"});
            }
            else{
                res.json({message:"Unauthorised user"});
            }
        })
    } catch (error) {
        res.json({message:"Post not successful"});   
    }
})

//to update employee details
router.put('/putemdata/:id',auth, async (req,res)=>{
    try {
        const item=req.body;
        const index=req.params.id;
        jwt.verify(req.body.token,"emp",
        (error,decoded)=>{
            if(decoded && decoded.email){
                emData.findByIdAndUpdate(index,item).exec();
                res.json({message:"Updated successfully"});
            }
            else{
                res.json({message:"Unauthorised user"});
            }
        })
    } catch (error) {
        res.json({message:"Updation not successful"});
    }
})

//to delete employee details
router.delete('/delemdata/:id/:token/:role',auth, (req,res)=>{
    try {
        const ind=req.params.id;
        jwt.verify(req.params.token,"emp",
        (error,decoded)=>{
            if(decoded && decoded.email){
                emData.findByIdAndDelete(ind).exec();
                res.json({message:"Deleted successfully"});
            }
            else{
                res.json({message:"Unauthorised user"});
            }
        })
    } catch (error) {
        res.json({message:'Deletion not successful'});
    }
})

module.exports=router;