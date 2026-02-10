// const express = require('express');
import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();;

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';

app.use('/api/auth', authRoutes);
app.use('/api/auth', messageRoutes);
app.use('/api/messages', messageRoutes);
const port = process.env.PORT || 4000; 

 app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});