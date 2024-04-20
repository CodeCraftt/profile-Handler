import express from 'express';
import {verifyToken} from '../utils/verifyUser.js';
import { updateUser,deleteUser } from '../controllers/userController.js';

const router=express.Router();


router.get("/",(req,res)=>{
    res.status(200).json({message:"HELLO"})
})


router.post('/update/:id',verifyToken,updateUser);

router.delete('/delete/:id',verifyToken,deleteUser);



export default router;