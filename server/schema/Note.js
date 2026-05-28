const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: { // Title of Note
        type: String,
        required: true,
    },
    content: { // Text content inside notes
        type: String,
        default: '',
    }
}, { timestamps: true}); // Tracks createdAt and updatedAt fields to log the times.

module.exports = mongoose.model('Note', noteSchema) // Imports new variables.