const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const friendSchema = new Schema({
  user_email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  last_contacted: {
    type: Date,
    required: true,
  }
}, {
  timestamps: true,
});

const Friend = mongoose.model('Friend', friendSchema);

module.exports = User;