const connectToDatabase = require('../db'); // Correct path to db.js
const Message = require('../models/Message'); // Correct path to Message.js

module.exports = async (req, res) => {
  try {
    // Ensure DB connection is established
    await connectToDatabase();

    // Handle POST request
    if (req.method === 'POST') {
      const { username, message, mediaUrl } = req.body;

      // Validation
      if (!username || !message) {
        return res.status(400).json({ error: 'Username and message are required' });
      }

      // Create a new message
      const newMessage = new Message({ username, message, mediaUrl });

      // Save message to database
      await newMessage.save();

      // Respond with success
      return res.status(201).json({ message: 'Message sent successfully', data: newMessage });
    } else {
      // Handle unsupported methods (only POST is allowed)
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error sending message:', error);

    // Handle unexpected errors
    return res.status(500).json({
      error: 'Error sending message',
      details: error.message,
    });
  }
};
