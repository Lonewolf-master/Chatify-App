import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken }from "../lib/generateJWT.js"

export const signup = async (req, res) => {
    console.log(req.body)
    const { fullName, email, password } = req.body;
    console.log("Signup function is calling")
    try{

        if(!fullName || !email || !password){
            return res.status(400).json( {message: "All fields are required"})
        }
        if(password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters "})
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
        if(!emailRegex.test(email)){
            return res.status(400).json({message: "Invalid email format"})
        }
        // if(!email.match(emailRegex)){
        //     return res.status(400).json({message: "Invalid email format"})
        // }

        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: "Email already exists"})
        

        // 123456 => 09hlmb2u9o39ulen2le (password hashing)    
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName,
            email,
            password: hashPassword
        })

        if(newUser){
            generateToken(newUser._id, res)
                res.status(201).json({
                    _id: newUser._id,
                    fullName: newUser.fullName,
                    email: newUser.email,
                    profilePic: newUser.profilePic  
                })
            // Todo: send a welcome email to the new user
            // Todo: send a confirmation email to the new user
            //Todo: send a notification to the admin that a new user
            // Todo: send a notification to the new user that they have been registered
        }else{
            res.status(400).json({message: "Invalid user data"})
        }
    }catch (error){
        console.error(error);
        res.status(500).json({message: "Internal Server error"})
    }
    // Logic to handle user signup
}
