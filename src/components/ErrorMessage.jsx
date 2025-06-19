import React from 'react';
import './ErrorMessage.css'; // Import error message specific CSS

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message" role="alert">
      <strong className="error-bold">Error!</strong>
      <span className="error-text">{message}</span>
    </div>
  );
};

export default ErrorMessage;