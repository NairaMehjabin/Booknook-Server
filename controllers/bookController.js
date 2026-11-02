const Book = require('../models/Book');

// @desc    Get all books (sorted by newest first, optional limit)
// @route   GET /api/books
const getBooks = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 0;
    
    const books = await Book.find()
      .sort({ createdAt: -1 })
      .limit(limit);

    res.status(200).json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching books' });
  }
};

// @desc    Get single book details by ID
// @route   GET /api/books/:id
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    console.error('Error fetching book details:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching book details' });
  }
};

// @desc    Add a new book
// @route   POST /api/books
const createBook = async (req, res) => {
  try {
    const { title, author, category, image, description, totalCopies, userName, userEmail } = req.body;

    if (!title || !author || !category || !image || !description || totalCopies === undefined || !userName || !userEmail) {
      return res.status(400).json({ success: false, message: 'Please provide all required book fields.' });
    }

    const newBook = await Book.create({
      title,
      author,
      category,
      image,
      description,
      totalCopies: Number(totalCopies),
      userName,
      userEmail,
    });

    res.status(201).json({
      success: true,
      message: 'Book added successfully to archive!',
      data: newBook
    });
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ success: false, message: 'Server error while adding book' });
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
};