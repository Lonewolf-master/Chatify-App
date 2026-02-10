import express from 'express';
const router = express.Router();

// Example route for authentication
router.post('/send', (req, res) => {
    // Handle login logic here
    res.send('send message endpoint');
});

export default router;