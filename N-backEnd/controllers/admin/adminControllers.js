import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import User from "../../model/userModel.js";


export const adminSignIn = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const userData = await User.findOne({ email: email })
        if (!userData || !userData.isAdmin) {
            const error = new Error("invalid Email & Passw0rd")
            error.statusCode = 401
            return next(error)
        }  
            
        const passwordMatch = await bcrypt.compare(password,userData.password)
        if (! passwordMatch) {
            const error = new Error("invalid Email & Password")
            error.statusCode = 401
            return next(error)
        }

        //JSON WEB TOKEN -> JWT  [*explain in ReadMe]
        //jwt.sign({payload}, secret, {options});
        const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_COOKIE_ENV === "production",
            sameSite: "none",
            maxAge: 7*24*60*60*1000
        })

        return res.status(200).json({
            message: "Sign-in successful",
            id: userData._id,
            phone: userData.phone,
            name: userData.name,
            email: userData.email,
            image: userData.image
        })
    } catch (error) {
        next(error);
    }
} 