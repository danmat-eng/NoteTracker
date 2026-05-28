const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Note = require('./schema/Note');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/NoteApp')
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Unable to connect to MongoDB:", err));

app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch notes.'});
  }
});

app.post('/api/notes', async (req, res) => {
  try {
    const newNote = new Note({
      title: req.body.title,
      content: req.body.content || ''
    });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(500).json({ error: 'Unable to create note.'});
  }
});

app.put('/api/notes/:id', async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { content: req.body.content },
      { new: true }
    );
    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update note'});
  }
});

app.delete('/api/notes/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Noted deleted.'})
  } catch (err) {
    res.status(500).json({ error: "Unable to delete note."});
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log('Server listening on port ${PORT}`')
});