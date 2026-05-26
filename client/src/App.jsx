import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

// Make global lists or something outside app for component hierarchy

function App() {

  const [notes, setNotes] = useState([]);
  const [activeNoteIndex, setActiveNoteIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');

  const handleContentChange = (e) => {
    const updatedNotes = [...notes];
    updatedNotes[activeNoteIndex].content = e.target.value;
    setNotes(updatedNotes);
  };

  const handleCreateNote = () => {
    if (newNoteTitle.trim()) {
      const newNote = {
        id: notes.length + 1,
        title: newNoteTitle,
        content: '',
      };
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      setActiveNoteIndex(updatedNotes.length - 1);
      setNewNoteTitle('');
      setIsPopupOpen(false);
    }
  };

  const handleDeleteNote = (idToDelete) => {
    const updatedNotes = notes.filter((note) => note.id !== idToDelete);
    setNotes(updatedNotes);
    if (activeNoteIndex >= updatedNotes.length) {
      setActiveNoteIndex(Math.max(0, updatedNotes.length - 1));
  }
};

  return (
    <div>
      <div className='filesContainer'>
        <button className='saveButton'>Save Note</button>
        <span className='saveMessage'></span>
        <button className='addButton' onClick={() => setIsPopupOpen(true)}>New Note</button>

        {notes.map((note, index) => (
          <button
            key={note.id}
            className={`noteFiles ${index === activeNoteIndex ? 'active' : ''}`}
            onClick={() => setActiveNoteIndex(index)}
          >
            {note.title}
          </button>
        ))}
      </div>
      <div>
        <textarea className='textBox' placeholder='Type notes here...' value={notes[activeNoteIndex]?.content || ''} onChange={handleContentChange}></textarea>
      </div>
      {isPopupOpen && (
        <div className='popupOverlay'>
          <div className='popupContent'>
            <h3>Enter Note Title</h3>
            <input
              type='text'
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              placeholder='ex: Math Study'
            />
            <div className='popupButtons'>
              <button onClick={handleCreateNote}>Create</button>
              <button onClick={() => setIsPopupOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App