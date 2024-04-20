import express from 'express';
import dotenv from 'dotenv';
import {dbConnection} from './dbConnect/dbConnection.js';
import userRoutes from './routes/userRoute.js';
import authRoutes from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
import path from 'path';


const __dirname=path.resolve();


const app=express();

app.use(express.static(path.join(__dirname,'/frontend/dist')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'frontend','dist','index.html'));
});

dotenv.config({path:"./.env"});
dbConnection();

app.use(express.json());

app.use(cookieParser());


app.use("/api/user",userRoutes);
app.use('/api/auth',authRoutes);


app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message || "Internal server error";
    
    return res.status(statusCode).json({
        success:false,
        message
    })
})

app.use


app.listen(3000,()=>{
    console.log("Server is running on 3000");
})