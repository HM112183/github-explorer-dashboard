import React, { useState, useEffect } from 'react';
import './NoteTaking.css'; // Import note taking specific CSS

const NoteTaking = ({ repositoryId }) => {
  const [note, setNote] = useState('');

  useEffect(() => {
    const savedNote = localStorage.getItem(`note-${repositoryId}`);
    if (savedNote) {
      setNote(savedNote);
    }
  }, [repositoryId]);

  const handleSaveNote = () => {
    localStorage.setItem(`note-${repositoryId}`, note);
    alert('Note saved!');
  };

  return (
    <div className="note-taking-container">
      <h2 className="note-taking-title">Your Notes</h2>
      <textarea
        className="note-taking-textarea"
        rows="5"
        placeholder="Write your notes here..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      ></textarea>
      <button
        onClick={handleSaveNote}
        className="save-note-button"
      >
        Save Note
      </button>
    </div>
  );
};

export default NoteTaking;