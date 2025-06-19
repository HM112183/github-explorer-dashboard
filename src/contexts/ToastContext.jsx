// src/contexts/ToastContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import ToastContainer from '../components/ToastContainer';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const toastIdCounter = useState(0); // Using useState for a mutable counter

  const addToast = useCallback((message, type = 'info') => {
    // Increment the counter and use its current value for the ID
    const id = toastIdCounter[0]++; 
    setToasts((prevToasts) => [
      ...prevToasts,
      { id, message, type },
    ]);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
};