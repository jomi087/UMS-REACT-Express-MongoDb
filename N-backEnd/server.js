// From node_modules 
import express from 'express'
import 'dotenv/config'
import cors from "cors";
import cookieParser from "cookie-parser"

//From Local files
import dbConnect from './config/dbConnect.js'
import errorHandler from './middleware/errorHandler.js';   //.js is required Since i am using ES modules ("type": "module" in package.json), imports must include .js when importing local files.
import userRouter from './Routes/userRouter.js';
import adminRouter from './Routes/adminRouter.js';
import commonRouter from './Routes/commonRouter.js';


const app = express() ;
const port = process.env.PORT||3000 ;
dbConnect()

const corsOptions = {
    origin: process.env.ALLOWED_URL, // front end url  //this is how we  give access to those url which can access our apis // here its only access for my frontend url how ever  if to make acess forevery one we  user  "*" 
    credentials: true,  //allowing credentials like cookies , headers etc .... 
    //method : The methods option in CORS is used to define which HTTP request methods are allowed when a frontend (client) makes a request to your backend.
    //method : "*"  this will allow all method // if not deffined then  only GET, HEAD, and POST  methods are allowed by default.// PUT, DELETE, PATCH, and other HTTP methods won't work unless explicitly added. so add it we have to do like this methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}

//!Order of Middleware (*ReadMe) 
// 3rd Party Middleware
app.use(cookieParser())  //for reading the cookies from the request (for backend needs ) in short, Express doesn’t need a package to set cookies, but it does need one to read them.[have mentiones the note on cookie in jwt notes check //#Readme  ] 
app.use(cors(corsOptions)) 
app.use(express.json());

// Serve static files
app.use("/uploads", express.static("uploads"));  //path not sure

// Routes
app.use('/api/auth', commonRouter)
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);



// Error Handling Middleware
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`Server is started running in http://localhost:${port}`)
})
