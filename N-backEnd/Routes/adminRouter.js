import express from 'express'

import adminAuth from '../middleware/adminAuth.js'
import upload from '../utils/multer.js'


import { adminSignIn } from '../controllers/authController.js'
import { getAdminProfile, updateAdminProfile } from '../controllers/admin/adminController.js'
import { addUser, deleteUser, updateUser, userInfo, usersInfo } from '../controllers/admin/adminUserController.js'


const router = express.Router()

//Auth
router.post('/signin', adminSignIn)

//Profile
router.get('/profile', adminAuth, getAdminProfile)
router.put('/profile', adminAuth, upload.single('image'), updateAdminProfile)

//UserManagement
router.get('/users', adminAuth, usersInfo)
router.post('/createUser', adminAuth, upload.single("image"), addUser)
router.get('/editUser/:id', adminAuth, upload.single("image"), userInfo)
router.put('/editUser/:id', adminAuth, upload.single("image"), updateUser)
router.delete('/deleteUser/:id', adminAuth, deleteUser)




export default router








