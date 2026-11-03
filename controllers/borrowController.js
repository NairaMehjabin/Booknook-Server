const Borrow = require('../models/Borrow');
const Book = require('../models/Book');

// @desc    Borrow a book
// @route   POST /api/borrows
const borrowBook = async (req, res) => {
  try {
    const { bookId, bookTitle, bookImage, userEmail, userName, returnDate } = req.body;

    if (!bookId || !userEmail || !returnDate) {
      return status(400).json({ success: false, message: 'Missing required borrow fields.' });
    }

    // Check if user already active borrowed this book
    const existingBorrow = await Borrow.findOne({ bookId, userEmail });
    if (existingBorrow) {
      return res.status(400).json({ success: false, message: 'You have already borrowed this book!' });
    }

    // Check book available copies
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found.' });
    }

    if (book.totalCopies <= 0) {
      return res.status(400).json({ success: false, message: 'Sorry, no copies available for borrowing.' });
    }

    // Decrease available copies by 1
    book.totalCopies -= 1;
    await book.save();

    // Create borrow record
    const newBorrow = await Borrow.create({
      bookId,
      bookTitle,
      bookImage,
      userEmail,
      userName: userName || 'Reader',
      borrowDate: new Date().toISOString().split('T')[0],
      returnDate
    });

    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully!',
      data: newBorrow
    });
  } catch (error) {
    console.error('Error borrowing book:', error);
    res.status(500).json({ success: false, message: 'Server error while borrowing book' });
  }
};

// @desc    Get borrows for logged in user
// @route   GET /api/borrows?email=user@email.com
const getUserBorrows = async (req, res) => {
  try {
    const userEmail = req.query.email || req.params.email;
    const query = userEmail ? { userEmail } : {};
    
    const borrows = await Borrow.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: borrows.length,
      data: borrows
    });
  } catch (error) {
    console.error('Error fetching borrows:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching borrows' });
  }
};

// @desc    Return a borrowed book
// @route   DELETE /api/borrows/:id
const returnBook = async (req, res) => {
  try {
    const borrowId = req.params.id;

    const borrowRecord = await Borrow.findById(borrowId);
    if (!borrowRecord) {
      return res.status(404).json({ success: false, message: 'Borrow record not found.' });
    }

    // Increase book copies back by 1
    const book = await Book.findById(borrowRecord.bookId);
    if (book) {
      book.totalCopies += 1;
      await book.save();
    }

    await Borrow.findByIdAndDelete(borrowId);

    res.status(200).json({
      success: true,
      message: 'Book returned successfully!'
    });
  } catch (error) {
    console.error('Error returning book:', error);
    res.status(500).json({ success: false, message: 'Server error while returning book' });
  }
};

module.exports = {
  borrowBook,
  getUserBorrows,
  returnBook
};