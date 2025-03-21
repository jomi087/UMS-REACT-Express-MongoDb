import express from 'express'
import upload from '../utils/multer.js'
import { logout, signUp } from '../controllers/authController.js'

const router = express.Router()

router.post('/signup', upload.single("image"), signUp) //authentication 
router.post("/logout", logout); 

export default router