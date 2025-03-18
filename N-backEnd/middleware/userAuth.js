import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

const userAuth =async (req, res, next) => { //!Readme
    const token = req.cookies.token; 
    console.log("token",token)

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded",decode)
        //req.user = decode; //# Attach user info to request -> This makes user data available in the next function (controller).
       
        // added 1 step logic for an optimized approach
        const user = await User.findById(decode.id).select('-password') // "-" is neccesary it means exclude or else it will include
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            return next(error);
        }

        req.user = user;

        next(); 
    } catch (error) {
        if (error.name === "JsonWebTokenError") {    // this is written here cz not wrriten the handler in error handling and jwt.verify(token, process.env.JWT_SECRET);  will throw/ return an a error so writting if(!decode) is worth less decode will be having value always  will there either data or error so  this kine will not execute   
            return res.status(401).json({ message: "Invalid token" });
        } else if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }
       next(error)
    }
};

export default userAuth;

