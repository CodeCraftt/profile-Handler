import mongoose from "mongoose";


export const dbConnection=()=>{
    mongoose.connect(process.env.mongoURI,{dbName:"auth"})
.then(()=>{
    console.log("Database connected successfully");
})
.catch((e)=>{
   console.log("Some error occured while connecting the database.");
})
}