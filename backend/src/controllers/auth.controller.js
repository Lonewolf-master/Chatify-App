import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken }from "../lib/generateJWT.js"
import sendWelcomeEmail from "../email/sendEmail.js"

export const signup = async (req, res) => {
    // console.log(req.body)
    const { fullName, email, password } = req.body;
    // console.log("Signup function is calling")
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

            await sendWelcomeEmail(newUser, res).catch( (error)=> {
                    console.log("Failed to send Welcome Email")
                    console.error(error)
                })

            generateToken(newUser._id, res)
                res.status(201).json({
                    _id: newUser._id,
                    fullName: newUser.fullName,
                    email: newUser.email,
                    profilePic: newUser.profilePic  
                })

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


export const login = async (req, res)=>{
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email})

        if(!user) return res.status(400).json({message:"Invalid credenntials" })
        // never tell the client which one is incorrect: password or email
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
       
        if(!isPasswordCorrect)  return res.status(400).json({message:"Invalid credenntials" })

        generateToken(user._id, res)

        console.log(user)

         res.status(200).json(user);
        
    } catch (error) {
        console.error("Errro in login controller: ", error);
        res.status(500).json({message: "Internal Server error"})
        
    }

}

export const logout= (_, res)=>{
    //getting ready of the cookies name jwt
    res.cookie("jwt","",{maxAge: 0})
    console.log("LoggedOut")
    res.status(200).json({message: "Logged out successfully"})
}