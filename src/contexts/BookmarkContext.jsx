import React, { createContext, useState, useContext, useEffect } from 'react';

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  // Load bookmarks from local storage on initial render
  const [bookmarkedRepos, setBookmarkedRepos] = useState(() => {
    try {
      const storedBookmarks = localStorage.getItem('bookmarkedRepos');
      return storedBookmarks ? JSON.parse(storedBookmarks) : [];
    } catch (error) {
      console.error("Failed to parse stored bookmarks:", error);
      return [];
    }
  });

  // Save bookmarks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('bookmarkedRepos', JSON.stringify(bookmarkedRepos));
  }, [bookmarkedRepos]);

  const addBookmark = (repo) => {
    setBookmarkedRepos((prevRepos) => {
      // Prevent duplicates
      if (!prevRepos.some(r => r.id === repo.id)) {
        return [...prevRepos, repo];
      }
      return prevRepos;
    });
  };

  const removeBookmark = (repoId) => {
    setBookmarkedRepos((prevRepos) => prevRepos.filter((repo) => repo.id !== repoId));
  };

  return (
    <BookmarkContext.Provider value={{ bookmarkedRepos, addBookmark, removeBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmark = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmark must be used within a BookmarkProvider');
  }
  return context;
};