// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// POST endpoint to send SMS and store the message
router.post('/', messageController.sendMessage);

router.get('/', messageController.getAllMessages);

module.exports = router;
