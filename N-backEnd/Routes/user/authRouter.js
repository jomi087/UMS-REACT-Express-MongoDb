import express from 'express'
import { signUp, signIn, logout } from '../../controllers/authControllers.js'
import upload from '../../utils/multer.js'

const authRouter = express.Router()

authRouter.post('/signup', upload.single("image"), signUp) //authentication 
authRouter.post('/signin', signIn) //authentication 
authRouter.post("/logout", logout); 


export default authRouter 