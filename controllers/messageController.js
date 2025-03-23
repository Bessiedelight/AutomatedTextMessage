// controllers/messageController.js
const Message = require('../models/Message');
const twilio = require('twilio');

// Initialize Twilio client with credentials from .env
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendMessage = async (req, res) => {
  try {
    // Validate required fields from the request body
    const { recipient, message, sentTime } = req.body;
    if (!recipient || !message || !sentTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Use Twilio client to send the SMS
    const twilioResponse = await client.messages.create({
      body: message,
      to: recipient, // the recipient’s phone number
      from: process.env.TWILIO_PHONE_NUMBER, // your Twilio phone number
    });

    console.log('Twilio response:', twilioResponse.sid);

    // Save the message details in MongoDB
    const newMessage = new Message({
      recipient,
      message,
      sentTime: new Date(sentTime),
    });
    const savedMessage = await newMessage.save();

    return res.status(201).json({
      success: true,
      data: savedMessage,
    });
  } catch (error) {
    console.error('Error in sendMessage:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    return res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
