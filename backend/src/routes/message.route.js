import express from 'express';
import { getAllContacts, getMessagesByUserId, sendMessage, getChatPartners } from '../controllers/message.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
const messageRoutes = express.Router();

messageRoutes.use(protectRoute)

messageRoutes.get("/contacts",  getAllContacts);
messageRoutes.get("/chats", getChatPartners);
messageRoutes.get("/:id",  getMessagesByUserId);
messageRoutes.post('/send/:id', sendMessage);

export default messageRoutes;