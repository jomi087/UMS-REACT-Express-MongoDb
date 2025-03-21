import express from 'express'

import upload from '../utils/multer.js'
import userAuth from '../middleware/userAuth.js'

import { signInUser } from '../controllers/authController.js'
import { getUserProfile, updateUserProfile } from '../controllers/user/userController.js'


const router = express.Router()

router.post('/signin', signInUser) //authentication 

router.get('/profile', userAuth , getUserProfile)
router.put('/profile', userAuth, upload.single('image'), updateUserProfile)


export default router