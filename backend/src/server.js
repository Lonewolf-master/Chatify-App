import express from 'express';
import cookieParser from "cookie-parser"
import {arcjetProtection} from "./middleware/arcjet.middleware.js"
import { connectionDB } from "./lib/db.js"
import { ENV } from './lib/env.js';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';



const app = express();
// 1. Parsers first so middleware can read the data
app.use(express.json());
app.use(cookieParser()) 

// 2. Security/Protection second
app.use(arcjetProtection)

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);


 // make ready for deployment
 import path from "path"
const __dirname = path.resolve();
console.log("path", __dirname)

if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (_, res)=> {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
    });
}

const port = ENV.PORT || 4000; 

 app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectionDB()
});