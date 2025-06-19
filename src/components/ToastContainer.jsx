// src/components/ToastContainer.jsx
import React from 'react';
import Toast from './Toast';
import './ToastContainer.css';

const ToastContainer = ({ toasts, onDismiss }) => {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
};

export default ToastContainer;