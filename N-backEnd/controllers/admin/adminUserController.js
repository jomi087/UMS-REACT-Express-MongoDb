import User from "../../model/userModel.js"
import fs from 'fs';
import path from 'path'
import securePassword from "../../utils/passwordHash.js";


export const usersInfo = async(req,res,next) => {
    try {
        const users = await User.find({ isAdmin: false }).select('-password -isAdmin') 
        res.status(200).json({users:users})
    } catch (error) {
        next(error)
    }
}

export const addUser = async(req,res,next) => {
    let fileName = null;
    let filePath = null;
    try {
        const { name, phone, email, password } = req.body;
        const isEmailExist = await User.findOne({ email })

        if (isEmailExist) {  
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
        return res.status(200).json({message:"sucessFull"})

    } catch (error) {
        if (filePath && fs.existsSync(filePath)) {  // deleting manualy
            fs.unlinkSync(filePath);
        }
        next(error);
    }
}

/*--------------------------------------------------------------------------------------------------------------------------------------- */
export const userInfo = async(req,res,next) => {
    try {
        const { id } = req.params 
        const userData = await User.findById(id).select('-password -isAdmin')

        if (!userData) {
            const error = new Error("User not found")
            error.statusCode = 400
            return next(error)
        }
      
        res.status(200).json({ user : userData });
        
    } catch (error) {
        next(error)
    }
}
/*--------------------------------------------------------------------------------------------------------------------------------------- */
export const updateUser = async (req, res, next) => {
    let fileName = null
    let filePath = null
    try {
        const { id } = req.params
        const { name, phone, email } = req.body
        let isUpdated = false

        const user = await User.findById(id).select('-password -isAdmin')
        
        if (user.name.toLowerCase() != name.toLowerCase()) {
            user.name = name
            isUpdated = true
        }
        

        if (user.email != email) {
            const isEmailExist = await User.findOne({ email })
            if (isEmailExist && isEmailExist._id.toString() !== user._id.toString()) {
                const error = new Error("This Email already exists")
                error.statusCode = 404
                 next(error)
                 return
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
            } catch (fileError) {
                return next(fileError)
            }
            let privousImagePath = path.join(uploadPath, user.image); 
            if(fs.existsSync(privousImagePath)) {
                try {
                    fs.unlinkSync(privousImagePath);
                } catch (error) {
                    return next(error)
                }
            }
            user.image = fileName
        }

        if (isUpdated || req.file) {
            await user.save();
        }

        res.status(200).json({message:"Updated"})

    } catch (error) {
        console.log(error)
        next(error)
    }
}

/*----------------------------------------------------------------------------------------------------------------------------------------------------- */
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findById(id);

        if (!user) {
            const error = new Error("User not found")
            error.status = 404
            next(error)
            return 
        }

        const uploadPath = 'uploads/';
        const filePath = path.join(uploadPath, user.image);


        if (fs.existsSync(filePath)) {
            try {
                fs.unlinkSync(filePath);
            } catch (error) {
                return next(error)
            }
        }
        await User.findByIdAndDelete(id);

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        next(error)
    }
}