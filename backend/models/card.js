const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  title: {
    required: true,
    minlength: 2,
    maxlength: 100,
    type: String,
  },
  description: {
    type: String,
    required: true,
    maxlength: 200,
  },
  date: {
    required: true,
    type: String,
  },
  priority: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

module.exports = mongoose.model('card', cardSchema);
