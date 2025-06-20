// src/App.jsx
import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import RepositoryDetail from "./pages/RepositoryDetail";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import { ToastProvider } from "./contexts/ToastContext"; 

import "./App.css";
import "./styles/index.css";

export const BookmarkContext = createContext();

function App() {
  const [bookmarkedRepos, setBookmarkedRepos] = useState(() => {
    try {
      const savedBookmarks = localStorage.getItem("bookmarkedRepos");
      return savedBookmarks ? JSON.parse(savedBookmarks) : [];
    } catch (error) {
      console.error("Failed to parse bookmarked repos from localStorage:", error);
      return [];
    }
  });

  // NEW: State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("bookmarkedRepos", JSON.stringify(bookmarkedRepos));
    } catch (error) {
      console.error("Failed to save bookmarked repos to localStorage:", error);
    }
  }, [bookmarkedRepos]);

  const toggleBookmark = (repo) => {
    setBookmarkedRepos((prevBookmarks) => {
      const isBookmarked = prevBookmarks.some((b) => b.id === repo.id);
      if (isBookmarked) {
        return prevBookmarks.filter((b) => b.id !== repo.id);
      } else {
        return [...prevBookmarks, repo];
      }
    });
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <ToastProvider> 
      <Router>
        <BookmarkContext.Provider value={{ bookmarkedRepos, toggleBookmark }}>
          <div className="app-container">
            <header className="app-header">
              <nav className="container app-nav">
                <Link to="/" className="app-title" onClick={closeMobileMenu}>
                  GitHub Explorer
                </Link>
                {/* NEW: Mobile menu toggle button */}
                <button
                  className="mobile-menu-toggle"
                  aria-label="Toggle navigation menu"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <span className="hamburger-icon"></span>
                  <span className="hamburger-icon"></span>
                  <span className="hamburger-icon"></span>
                </button>

                {/* NEW: Apply class based on state */}
                <ul className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
                  <li>
                    <Link to="/" className="nav-link" onClick={closeMobileMenu}>
                      
                    </Link>
                  </li>
                </ul>
              </nav>
            </header>

            <main className="app-main container">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/repository/:owner/:repoName" element={<RepositoryDetail />} />
              </Routes>
            </main>
          </div>
        </BookmarkContext.Provider>
      </Router>
    </ToastProvider>
  );
}

export default App;