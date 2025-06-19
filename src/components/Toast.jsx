// src/components/Toast.jsx
import React, { useEffect, useState } from 'react';
import './Toast.css';

const Toast = ({ id, message, type, onDismiss }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Auto-dismiss after 3 seconds
    const timer = setTimeout(() => {
      setVisible(false);
      // Wait for animation to finish before calling onDismiss
      setTimeout(() => onDismiss(id), 500); // 500ms should match fade-out duration in CSS
    }, 3000);

    return () => clearTimeout(timer);
  }, [id, onDismiss]);

  return (
    <div className={`toast toast-${type} ${visible ? 'toast-show' : 'toast-hide'}`}>
      <span className="toast-icon">
        {type === 'success' && '✅'}
        {type === 'error' && '❌'}
        {type === 'info' && 'ℹ️'}
      </span>
      {message}
      <button onClick={() => { setVisible(false); setTimeout(() => onDismiss(id), 500); }} className="toast-dismiss-btn">
        &times;
      </button>
    </div>
  );
};

export default Toast;