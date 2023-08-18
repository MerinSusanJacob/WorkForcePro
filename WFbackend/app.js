const express=require('express');
const app=express();
const morgan=require('morgan');
const cors = require('cors');
app.use(morgan('dev'));
require('dotenv').config();
app.use(cors());
const path = require('path');

require('./db/mongodb');

const api=require('./routes/employeeRoute');
const user=require('./routes/userRoute');
app.use('/api',api);
app.use('/api',user);

app.use(express.static(path.join(__dirname,'/build')));

app.get('/*', function(req,res){
    res.sendFile(path.join(__dirname,'/build/index.html'))
});


const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server running in PORT ${PORT}`);
});