import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {

    const {JWT_SECRET_KEY, NODE_ENV } = process.env
    if(!JWT_SECRET_KEY) throw new Error("JWT_SECRET is not configured")

    const token = jwt.sign(
        {userId},  // or {Id: userId}
        JWT_SECRET_KEY, 
        {expiresIn: "7d"}
    ) 

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 *1000 ,// 7d => minisec
        httpOnly: true, //cross-site scripting ie prevent XSS attacks: client can't access the cookie through JavaScript
        sameSite: "strict", // prevent CSRF attacks
        secure: NODE_ENV == "development" ? false : true // only send
    })
    
    return token;
}
