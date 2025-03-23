// models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  recipient: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  sentTime: {
    type: Date,
    required: true,
  },
  createdAt: { 
    type: Date, 
    default: Date.now,
    // This field is indexed below for TTL deletion
  }
});

// Create a TTL index on 'createdAt' to auto-delete documents after 48 hours (48 * 3600 seconds)
messageSchema.index({ createdAt: 1 }, { expireAfterSeconds: 172800 });

module.exports = mongoose.model('Message', messageSchema);
