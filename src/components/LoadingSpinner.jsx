import React from 'react';
import './LoadingSpinner.css'; // Import spinner specific CSS

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <div className="spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;