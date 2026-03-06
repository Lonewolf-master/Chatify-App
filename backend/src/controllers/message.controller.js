import Message from "../models/message.model.js"
import User from "../models/user.model.js"
import cloudinary from "../lib/cloudinary.js";

export const getAllContacts = async(req, res)=>{
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: { $ne: loggedInUserId  } }).select("-password")
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getAllContacts: ", error)
        res.status(500).json({message: "Internal Server error"});
    }

}

export const getMessagesByUserId = async(req, res)=>{
    try {
        const myId = req.user._id;
        const { id: userToChatId } = req.params

        //me and you
        // i send you the message
        // you send me the message
        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId: userToChatId},
                {senderId:userToChatId, receiverId: myId}
            ]
        })
        // This query retrieves the entire conversation history between two specific users.
        // By using the $or operator, it searches for messages where:
        // You are the sender and the other person is the receiver.
        // The other person is the sender and you are the receiver.

        console.log(messages)
        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessages controller: ", error)
        res.status(500).json({message: "Internal server error"})
        
    }
}

export const sendMessage = async(req, res)=>{
    try {
        const {text, image} = req.body;
        const { id: receiverId } = req.params
        const senderId = req.user._id
        let imageUrl;
        if(!text || !image ) return
        if(image){
            //upload base64 image to cloudinary
            const uploaResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploaResponse.secure_url;
        }
        //me and you
        // i send you the message
        // you send me the message
        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        })
        //todo: send message in real-time if uer is online - socket.io
        res.status(201).json(newMessage)
    } catch (error) {
        console.log("Error in sendMessages controller: ", error.message)
        res.status(500).json({message: "Internal server error"})
        
    }
}

export const getChatPartners = async(req, res)=>{
    try {
        const loggedInUserId = req.user._id
        // find all the messages where the logged-in user is either sender or receiver
        const messages = await Message.find({
            $or:[
                {senderId:loggedInUserId},
                {receiverId: loggedInUserId}
            ]
        })
        console.log({messages})
        const chatPartnerIds =[ 
            ...new Set(
                messages.map( (msg)=>
                    msg.senderId.toString() === loggedInUserId.toString() ? 
                    msg.receiverId.toString() : msg.senderId.toString()
                )
            )
        ];
        console.log({chatPartnerIds})
        // The $in operator is a MongoDB filter that searches for multiple values at once within a single field.
        // Think of it as a "Match Any" filter. Instead of searching for just one ID, it tells Mongoose: "Find every user whose _id matches any of the values inside this array."
        const chatPartners = await User.find({_id: {$in:chatPartnerIds}}).select("-password")
        res.status(200).json(chatPartners)
    } catch (error) {
        console.log("Error in getChatPartner controller: ", error)
        res.status(500).json({message: "Internal server error"})
        
    }
}