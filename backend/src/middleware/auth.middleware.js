import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import { ENV } from "../lib/env.js"

export const protectRoute = async(req, res, next)=>{
    // console.log(ENV )

    try {
        const token = req.cookies.jwt
        if(!token) return res.status(401).json({message: "Unauthorized - No token provided"})
        
        const decoded = jwt.verify(token, ENV.JWT_SECRET_KEY)
        if(!decoded) return res.status(401).json({message: "Unauthorized - Invalid token"})

        const user = await User.findById(decoded.userId).select("-password")
        if(!user) return res.status(404).json({message: "User not found"})
        
            //adding a custom field in the user
        req.user = user
        next()
    } catch (error) {
        console.log("Error in protectRoute middleware:\n", error )
        res.status(500).json({message: "Internal server error"})
        
    }

}