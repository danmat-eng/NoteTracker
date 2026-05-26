const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Note = require('./schema/Note.js');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/NoteApp')
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Unable to connect to MongoDB:", err));

app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find().sort({createdAt: -1});
    res.status(200).json(notes);
  } catch (error) {
    console.error("Unable to find notes:", error);
    res.status(500).json({error: "Unable to get notes."});
  }
});

app.post('/api/notes', async (req, res) => {
  try {
    const {content} = req.body;
    if (!content) {
      return res.status(400).json({ error: 'Content is required.'});
    }
    const newNote = new Note({content});
    await newNote.save();
    
    res.status(201).json({message: 'Note Saved.', note: newNote});
  } catch (error) {
    console.error("Error saving note:", error);
    res.status(500).json({error: 'Unable to save note.'});
  }
});

app.listen(PORT, () => {
  console.log('Server listening on port ${PORT}`')
});