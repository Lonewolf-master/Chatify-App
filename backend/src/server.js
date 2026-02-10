// const express = require('express');
import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();;

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);


 // make ready for deployment
 import path from "path"
const __dirname = path.resolve();
console.log("path", __dirname)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (_, res)=> {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
    });
}

import { connectionDB } from "./lib/db.js"

const port = process.env.PORT || 4000; 

 app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectionDB()
});