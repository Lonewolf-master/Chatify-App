import mongoose from "mongoose"

 export const connectionDB = ()=>{

    process.env.MONGO_URL ?? console.error("MONGO_URL is Undefined")
 
    mongoose.connect(process.env.MONGO_URL)
    .then( conn => console.log("MONGOGOD CONNECTED", conn.connection.host))
    .catch( err => {
        console.error("MONGOD CONNECTION FAILD", err)
        process.exit(1); //1 status code means fail, 0 means success
    })

 };