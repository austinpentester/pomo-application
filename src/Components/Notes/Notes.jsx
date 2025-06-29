import React, { useState } from 'react';
import './Notes.css';

const Notes = () => {
  const [notes, setNotes] = useState([{ id: 1, content: '' }]);

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      content: ''
    };
    setNotes([...notes, newNote]);
  };

  const updateNote = (id, content) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, content } : note
    ));
  };

  const deleteNote = (id) => {
    if (notes.length > 1) {
      setNotes(notes.filter(note => note.id !== id));
    }
  };

  return (
    <div className="notes-container">
      <div className="notes-header">
        <h2 className="notes-title">Notes</h2>
        <button className="add-button" onClick={addNote}>
          <span className="plus-icon">+</span>
        </button>
      </div>
      
      <div className="notes-list">
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <textarea
              className="note-textarea"
              placeholder="Take notes here..."
              value={note.content}
              onChange={(e) => updateNote(note.id, e.target.value)}
              rows={8}
            />
            {notes.length > 1 && (
              <button 
                className="delete-button"
                onClick={() => deleteNote(note.id)}
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;