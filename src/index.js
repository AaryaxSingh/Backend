import moongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
})


connectDB()
.then(()=>{
    application.listen(process.env.PORT || 8000,()=>{
        console.log(`App is listening on PORT ${process.env.PORT || 8000}`);
    })
})
.catch((err)=>{
    console.log("connection failed with DB",err);
})










/*
import express from "express";

const app = express();
*/




/*
(async()=>{
    try{
       await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
       app.on("error",()=>{
        console.log("ERRR",error);
        throw error
       })

       app.listen(process.env.PORT,()=>{
        console.log(`App is listening on PORT ${process.env.PORT}`)
       })
    }
    catch(error){
        console.error("Error connecting to database", error)
        throw error
    }
})()
*/