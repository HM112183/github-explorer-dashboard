// src/components/RepositoryCardSkeleton.jsx
import React from 'react';
import './RepositoryCardSkeleton.css';

const RepositoryCardSkeleton = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-header">
        <div className="skeleton-avatar skeleton-shimmer"></div>
        <div className="skeleton-title-line skeleton-shimmer"></div>
      </div>
      <div className="skeleton-description-line skeleton-shimmer"></div>
      <div className="skeleton-description-line skeleton-shimmer short"></div>
      <div className="skeleton-info-grid">
        <div className="skeleton-info-item">
          <div className="skeleton-icon skeleton-shimmer"></div>
          <div className="skeleton-text-line skeleton-shimmer"></div>
        </div>
        <div className="skeleton-info-item">
          <div className="skeleton-icon skeleton-shimmer"></div>
          <div className="skeleton-text-line skeleton-shimmer"></div>
        </div>
        <div className="skeleton-info-item">
          <div className="skeleton-icon skeleton-shimmer"></div>
          <div className="skeleton-text-line skeleton-shimmer"></div>
        </div>
      </div>
      <div className="skeleton-buttons">
        <div className="skeleton-button skeleton-shimmer"></div>
        <div className="skeleton-button skeleton-shimmer"></div>
      </div>
    </div>
  );
};

export default RepositoryCardSkeleton;