import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs'; 
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import { accessSync } from 'fs';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    
    try {
        const hashedPassword = await bcryptjs.hash(password, 10);
        
      
        const newUser = await User.create({ username, email, password: hashedPassword });
        
        res.status(201).json({ message: "User created successfully." });
    } catch (err) {
       
        next(errorHandler(err.code, err.message));
    }
};



export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            return next(errorHandler(401, 'Authentication failed.'));
        }

        const validPassword = await bcryptjs.compare(password, user.password);
        
        if (!validPassword) {
            return next(errorHandler(401, 'Authentication failed.'));
        }

        const expireDate = new Date(Date.now() + 3600000); 
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        
        // Extracting user data without the password
        const { password: hashedPassword, ...userData } = user._doc;
        
        // Sending the token as a cookie
        res.cookie('token', token, {
            httpOnly: true,
            expires: expireDate,
            // Add other secure flags if applicable, like 'secure' and 'sameSite'
        }).status(200).json(userData);
    } catch (err) {
        next(err);
    }
};



export const googleAu=async (req,res,next)=>{
    try {
        const user=await User.findOne({email:req.body.email});

        if(!user){
           const randompass=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);

           const hashedpass=await bcryptjs.hash(randompass,10);

           const newUser=new User({username:req.body.username.split(" ").join("").toLowerCase()+(Math.floor(Math.random()*10000)).toString(),email:req.body.email,password:hashedpass,profileImage:req.body.profileImage});
           await newUser.save();

           const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET);

           const expiryDate=new Date(Date.now()+3600000);

           const {password:hp,...rest}=newUser._doc;


           res.cookie('token',token,{
            httpOnly:true,
            expires:expiryDate,
           }).status(200).json(rest);

           return ;
        }
        
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
        
        const {password:hashedPassword, ...rest}=user._doc;

        const expiryDate=new Date(Date.now()+3600000);

        res.cookie('token',token,{
            httpOnly:true,
            expires:expiryDate
        }).status(200).json(rest);

        
    } catch (error) {
        next(error);
    }
}

export const signout=async(req,res,next)=>{
    res.clearCookie('token').status(200).json('Signout success.')
}