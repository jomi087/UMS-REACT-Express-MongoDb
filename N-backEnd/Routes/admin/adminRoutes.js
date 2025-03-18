import express from 'express'
const adminRouter = express.Router()

import  {adminSignIn} from '../../controllers/admin/adminControllers.js'

adminRouter.post('/signin', adminSignIn)


export default adminRouter