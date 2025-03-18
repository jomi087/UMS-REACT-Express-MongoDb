import express from 'express'
import { getUserProfile, updateUserProfile } from '../../controllers/user/userController.js'
import userAuth from '../../middleware/userAuth.js'
import upload from '../../utils/multer.js'

const userRouter = express.Router()

userRouter.get('/profile', userAuth , getUserProfile)
userRouter.put('/profile', userAuth, upload.single('image'), updateUserProfile)


export default userRouter

