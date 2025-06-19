// src/components/BookmarkButton.jsx
import React, { useContext } from 'react';
import { BookmarkContext } from '../App';
import { useToast } from '../contexts/ToastContext'; // Import useToast
import './BookmarkButton.css'; // Make sure this CSS file exists for button styling

const BookmarkButton = ({ repo }) => {
  const { bookmarkedRepos, toggleBookmark } = useContext(BookmarkContext);
  const { addToast } = useToast(); // Use the addToast hook
  const isBookmarked = bookmarkedRepos.some((b) => b.id === repo.id);

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent any parent link/card click from propagating
    e.preventDefault();  // Prevent default button behavior (e.g., if inside a form or anchor)

    toggleBookmark(repo); // Use the toggleBookmark function from context

    // Add toast notification based on the *new* state after toggling
    if (isBookmarked) { // If it *was* bookmarked, it's now *unbookmarked*
      addToast(`Removed "${repo.name}" from bookmarks`, 'info');
    } else { // If it *was not* bookmarked, it's now *bookmarked*
      addToast(`Added "${repo.name}" to bookmarks`, 'success');
    }
  };

  return (
    <button
      className={`bookmark-button ${isBookmarked ? 'bookmarked' : 'not-bookmarked'}`}
      onClick={handleClick}
      aria-label={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
    >
      <span className="bookmark-icon">⭐</span> {/* Added the star icon back */}
      {isBookmarked ? 'Bookmarked' : 'Bookmark'}
    </button>
  );
};

export default BookmarkButton;