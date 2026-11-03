const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  bookTitle: { type: String, required: true },
  bookImage: { type: String, required: true },
  userEmail: { type: String, required: true },
  userName: { type: String, required: true },
  borrowDate: { type: String, required: true },
  returnDate: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Borrow', borrowSchema);