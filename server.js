// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Use routes
app.use('/api/messages', messageRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
