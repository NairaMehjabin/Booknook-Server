const express = require('express');
const router = express.Router();
const { getBooks, createBook, getBookById } = require('../controllers/bookController');

// GET /api/books — Get all books
router.get('/', getBooks);

// GET /api/books/:id — Get single book details
router.get('/:id', getBookById);

// POST /api/books — Add a book
router.post('/', createBook);

module.exports = router;