const connectToDatabase = require('../db'); // Correct path to db.js
const Message = require('../models/Message'); // Correct path to Message.js

module.exports = async (req, res) => {
  // Ensure the database connection is established
  await connectToDatabase();

  // Handle GET request to fetch all messages
  if (req.method === 'GET') {
    try {
      const messages = await Message.find().sort({ timestamp: 1 });
      res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Error fetching messages', details: error.message });
    }
  }
  
  // Handle POST request to save a new message
  else if (req.method === 'POST') {
    try {
      const { username, message, mediaUrl } = req.body;
      const newMessage = new Message({ username, message, mediaUrl });
      await newMessage.save();
      res.status(201).json(newMessage);
    } catch (error) {
      console.error('Error saving message:', error);
      res.status(500).json({ error: 'Error saving message', details: error.message });
    }
  }
  
  // Handle DELETE request to clear all messages from the database
  else if (req.method === 'DELETE') {
    try {
      // Delete all messages from MongoDB
      await Message.deleteMany({});
      res.status(200).json({ message: 'All messages cleared' });
    } catch (error) {
      console.error('Error deleting messages:', error);
      res.status(500).json({ error: 'Error deleting messages', details: error.message });
    }
  }
  
  // Handle unsupported HTTP methods
  else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
