import jwt from 'jsonwebtoken'
import User from '../model/userModel.js'

const adminAuth = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        const error = new Error("Unauthorized: No token provided")
        error.statusCode = 404;
        return next(error)
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const admin = await User.findById(decode.id).select('-password')
        if (!admin) {
            const error = new Error("admin not found");
            error.statusCode = 404;
            return next(error);
        }

        if (!admin.isAdmin) {
            const error = new Error("Access denied: Not an admin");
            error.statusCode = 403;
            return next(error);
        }


        req.admin = admin
        next()
        
    } catch (error) {
        if (error.name === "JsonWebTokenError") {   
            return res.status(401).json({ message: "Invalid token" });
        } else if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }
        return next(error)
    }
}

export default adminAuth