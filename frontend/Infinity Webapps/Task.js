const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    type: String, // Task type e.g., 'tonWallet', 'koiiWallet', 'twitter'
    points: { type: Number, default: 0 },
    url: String,
    icon: String,
    daily: { type: Boolean, default: false }
});

module.exports = mongoose.model('Task', taskSchema);
