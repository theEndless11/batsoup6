// db.js
const mongoose = require('mongoose');

const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) {
    // If already connected, no need to connect again
    console.log("Already connected to the database");
    return;
  }

  try {
    // Connect to MongoDB using the environment variable for MongoDB URI
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectToDatabase;
