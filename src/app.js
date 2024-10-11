import express from 'express';
import cors from "cors"
import cookieParser from 'cookie-parser';
const app=express();
app.use(cors(
    {
        origin:process.env.CORS_ORIGION,
        credentials:true
    }
))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
export { app }

//routes import
import {userRouter} from "./routes/user.routes.js";

//routes declearaton
app.use("/api/v1/users",userRouter)
// http://localhost:8000/api/v1/users/register