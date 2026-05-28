import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/api/notes';

const NotePopup = ({ isOpen, onClose, onCreate, title, setTitle }) => {
  if (!isOpen) return null;
  return (
    <div className='popupOverlay'>
      <div className='popupContent'>
        <h3>Enter Note Title</h3>
        <input 
          type='text' 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder='ex: Math Study' 
        />
        <div className='popupButtons'>
          <button onClick={onCreate}>Create</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [notes, setNotes] = useState([]);
  const [activeNoteIndex, setActiveNoteIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(API_URL);
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };
    fetchNotes();
  }, []);

  const handleContentChange = (e) => {
    const updatedNotes = [...notes];
    if (updatedNotes[activeNoteIndex]) {
      updatedNotes[activeNoteIndex].content = e.target.value;
      setNotes(updatedNotes);
    }
  };

  const handleCreateNote = async () => {
    if (newNoteTitle.trim()) {
      try {
        const response = await axios.post(API_URL, {
          title: newNoteTitle,
          content: '',
        });
        const updatedNotes = [...notes, response.data];
        setNotes(updatedNotes);
        setActiveNoteIndex(updatedNotes.length - 1);
        setNewNoteTitle('');
        setIsPopupOpen(false);
      } catch (error) {
        console.error('Error creating note:', error);
      }
    }
  };

  const handleSaveNote = async () => {
    const activeNote = notes[activeNoteIndex];
    if (!activeNote) return;

    try {
      await axios.put(`${API_URL}/${activeNote._id}`, {
        content: activeNote.content
      });
      
      setSaveMessage('Saved!');
      setTimeout(() => setSaveMessage(''), 2000);
    } catch (error) {
      console.error('Error saving note:', error);
      setSaveMessage('Error saving');
    }
  };

  const handleDeleteNote = async (idToDelete) => {
    try {
      await axios.delete(`${API_URL}/${idToDelete}`);
      
      const updatedNotes = notes.filter((note) => note._id !== idToDelete);
      setNotes(updatedNotes);
      if (activeNoteIndex >= updatedNotes.length) {
        setActiveNoteIndex(Math.max(0, updatedNotes.length - 1));
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div>
      <div className='filesContainer'>
        <button className='saveButton' onClick={handleSaveNote}>Save Note</button>
        <span className='saveMessage'>{saveMessage}</span>
        <button className='addButton' onClick={() => setIsPopupOpen(true)}>New Note</button>

        {notes.map((note, index) => (
          <div key={note._id} className="noteTabWrapper">
            <button
              className={`noteFiles ${index === activeNoteIndex ? 'active' : ''}`}
              onClick={() => setActiveNoteIndex(index)}
              >
              {note.title}
              </button>
                
              {index === activeNoteIndex && (
              <button 
                className="deleteButton" 
                onClick={() => handleDeleteNote(note._id)}
              >
                 X
              </button>
              )}
          </div>
          ))}
        </div>
      
      <div>
        <textarea 
          className='textBox' 
          placeholder='Type notes here...' 
          value={notes[activeNoteIndex]?.content || ''} 
          onChange={handleContentChange}
        ></textarea>
      </div>

      <NotePopup 
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onCreate={handleCreateNote}
        title={newNoteTitle}
        setTitle={setNewNoteTitle}
      />
    </div>
  );
}

export default App;