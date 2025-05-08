import fs from 'fs';
import path from 'path'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


import User from "../model/userModel.js";
import securePassword from "../utils/passwordHash.js";

/*---------------------------------------------------------------------------------------------*/
export const signUp = async (req, res, next) => {
    let fileName = null;
    let filePath = null;
    try {
        const { name, phone, email, password } = req.body;
        const isEmailExist = await User.findOne({ email })

        if (isEmailExist) {  //!Error handler
            const error = new Error("Email already exists")
            error.statusCode = 400
            return next(error)
        }

        const spassword = await securePassword(password)

        //manualy storing in to uploads
        if (req.file) {
            const uploadPath = 'uploads/';
            fileName = Date.now() + '-' + req.file.originalname;
            filePath = path.join( uploadPath, fileName);            
             try {
                fs.writeFileSync(filePath, req.file.buffer);
             } catch (fileError) {
                return next(fileError)
            }
        }
        const user = new User({
            name,
            phone,
            email,
            password: spassword,
            image:fileName
        })
        await user.save()

        //JSON WEB TOKEN (JWT) and cookie  [*explain in ReadMe]   jwt.sign({payload}, secret, {options});
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        
        //res.cookie(name, value, [options]);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_COOKIE_ENV === "production", //now its false //later while converting it to http to https we have to make it true , so this will not allow the cookie to be sent over http ,currently it will alowed in both http and https  
            sameSite: "lax",
            maxAge: 7*24*60*60*1000
        })

        return res.status(200).json({
            message: "Sign-Up successful",
            id: user._id,
            phone: user.phone,
            name: user.name,
            email: user.email,
            image: user.image
            
        })

    } catch (error) {
        if (filePath && fs.existsSync(filePath)) {  // deleting manualy
            fs.unlinkSync(filePath);
        }
        next(error);
    }
}
/*---------------------------------------------------------------------------------------------*/
export const signInUser = async (req, res, next) => {
    
    try {
        const { email, password } = req.body

        const userData = await User.findOne({ email: email })
        if (!userData || userData.isAdmin) {
            const error = new Error("invalid Email & Password")
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
            sameSite: "lax",
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
/*---------------------------------------------------------------------------------------------*/
export const adminSignIn = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const adminData = await User.findOne({ email: email , isAdmin: true  })
        if (!adminData ) {
            const error = new Error("invalid Email & Passw0rd")
            error.statusCode = 401
            return next(error)
        }  
            
        const passwordMatch = await bcrypt.compare(password,adminData.password)
        if (! passwordMatch) {
            const error = new Error("invalid Email & Password")
            error.statusCode = 401
            return next(error)
        }

        //JSON WEB TOKEN -> JWT  [*explain in ReadMe]
        //jwt.sign({payload}, secret, {options});
        const token = jwt.sign({ id: adminData._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_COOKIE_ENV === "production",
            sameSite: "lax",
            maxAge: 7*24*60*60*1000
        })

        return res.status(200).json({
            message: "Sign-in successful",
            phone: adminData.phone,
            name: adminData.name,
            email: adminData.email,
            image: adminData.image,
        })
    } catch (error) {
        next(error);
    }
} 

/*-------------------------------------------------------------------------------------------------------------*/

export const logout = async (req, res, next) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_COOKIE_ENV === "production",
            sameSite: "lax",
        })
        return res.status(200).json({message:"Logged Out"})
    } catch (error) {
        next(error)
    }
}
