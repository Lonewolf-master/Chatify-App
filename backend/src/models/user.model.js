import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profilePic: {
        type: String,
         default: ""
    }
}, {timestamps: true}) // createdAt and updatedAt fields will be automatically added by mongoose
// timestamps option adds createdAt and updatedAt fields to the schema, which will automatically store the creation and last update times of each document. This is useful for tracking when a user was created or last modified without needing to manually manage these fields.   
//can also be use to see last login time of the user, but we will need to update the updatedAt field every time the user logs in, which can be done using a middleware or a controller function.

const User = mongoose.model("User", userSchema)
export default User