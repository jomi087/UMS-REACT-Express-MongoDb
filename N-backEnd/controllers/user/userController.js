import User from "../../model/userModel.js"
import fs from 'fs';
import path from 'path';

export const getUserProfile = async (req,res,next) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        next(error)
    }
}

export const updateUserProfile = async (req, res, next) => {
    let fileName = null
    let filePath = null
    try {
        console.log(req.body)
        const { name, phone, email } = req.body
        const user = req.user
        let isUpdated = false;

        if (user.name !== name) {
            user.name = name
            isUpdated = true
        }

        if (user.email !== email) {
            const isEmailExist = await User.findOne({ email })
            if (isEmailExist  && isEmailExist._id.toString() !== user._id.toString()) {
                const error = new Error("This Email already exists")
                error.statusCode = 400
                return next(error)
            }
            user.email = email
            isUpdated = true
        }

        if (user.phone !== phone) {
            user.phone = phone
            isUpdated = true
        }

        if (req.file) {
            const uploadPath = 'uploads/';
            fileName = Date.now() + '-' + req.file.originalname;
            filePath = path.join(uploadPath, fileName);
            try {
                fs.writeFileSync(filePath, req.file.buffer)
            } catch(fileError) {
                return next(fileError)
            }
            if (fs.existsSync(user.image)) {
                try{
                    fs.unlinkSync(user.image);
                } catch (error) {
                    return next(error)
                }
            }
            user.image = fileName
        }
        
        if (isUpdated || req.file) {
            await user.save();
        }

        res.status(200).json({
            name: user.name,
            email: user.email,
            phone: user.phone,
            image: user.image,
        });
    } catch (error) {
        next(error)
    }
}