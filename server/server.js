const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to database
const connectDB = require('./config/db');
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/crops', require('./routes/cropRoutes'));
app.use('/api/labour', require('./routes/labourRoutes'));
app.use('/api/weather', require('./routes/weatherRoutes'));
app.use('/api/market', require('./routes/marketRoutes'));
app.use('/api/registration', require('./routes/registrationRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'KrishiSetu API is running!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});