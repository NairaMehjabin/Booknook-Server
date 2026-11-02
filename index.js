const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Mount Routes
app.use('/api/books', bookRoutes);

// Root Test Route
app.get('/', (req, res) => {
  res.send('BookNook Server is active and secure.');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});