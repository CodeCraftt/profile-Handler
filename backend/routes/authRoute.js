import express from "express";
import { signin, signup,googleAu, signout } from "../controllers/authController.js";

const router=express.Router();

router.post("/signup",signup);

router.post('/signin',signin);

router.post('/google',googleAu);

router.get('/signout',signout);


export default router;