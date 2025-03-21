import User from "../../model/userModel.js"
import fs from 'fs';
import path from 'path';

export const getAdminProfile = async (req, res, next) => {
    try {
        res.status(200).json(req.admin)
    } catch (error) {
        next(error)
    }
}


export const updateAdminProfile = async (req, res, next) => {
    let fileName = null
    let filePath = null
    try {
        const { name, phone, email } = req.body
        const admin = req.admin
        let isUpdated = false;

        if (admin.name !== name) {
            admin.name = name
            isUpdated = true
        }

        if (admin.email !== email) {
            const isEmailExist = await User.findOne({ email })
            if (isEmailExist  && isEmailExist._id.toString() !== admin._id.toString()) {
                const error = new Error("This Email already exists")
                error.statusCode = 400
                return next(error)
            }
            admin.email = email
            isUpdated = true
        }

        if (admin.phone !== phone) {
            admin.phone = phone
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
                let privousImagePath = path.join(uploadPath, admin.image); 
            if (fs.existsSync(privousImagePath)) {
                try{
                    fs.unlinkSync(privousImagePath);
                } catch (error) {
                    return next(error)
                }
            }
            admin.image = fileName
        }
        
        if (isUpdated || req.file) {
            await admin.save();
        }

        res.status(200).json({
            name: admin.name,
            email: admin.email,
            phone: admin.phone,
            image: admin.image,
        });
    } catch (error) {
        next(error)
    }
}