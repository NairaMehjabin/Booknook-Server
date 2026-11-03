const express = require('express');
const router = express.Router();
const { borrowBook, getUserBorrows, returnBook } = require('../controllers/borrowController');

router.post('/', borrowBook);
router.get('/', getUserBorrows);
router.delete('/:id', returnBook);

module.exports = router;