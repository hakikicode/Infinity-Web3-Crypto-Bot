require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoutes');
const verifyRoutes = require('./verifyRoutes');
const bot = require('./bot'); // Telegram bot setup

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Route setup
app.use('/user', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/verify', verifyRoutes);

// Start Telegram bot
bot.launch();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
