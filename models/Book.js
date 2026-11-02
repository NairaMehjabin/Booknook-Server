const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true, enum: ['Fiction', 'Science', 'History', 'Kids', 'Others'] },
  image: { type: String, required: true },
  description: { type: String, required: true },
  totalCopies: { type: Number, required: true, min: 0 },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', bookSchema);