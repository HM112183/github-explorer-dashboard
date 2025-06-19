// src/components/RepositoryCard.jsx
import React from 'react';
// import { Link } from 'react-router-dom'; // No longer needed for repo name/details button
import BookmarkButton from './BookmarkButton';
import './RepositoryCard.css';

const RepositoryCard = ({ repo }) => {
  const {
    owner,
    name,
    description,
    stargazers_count,
    forks_count,
    language,
    html_url,
  } = repo;

  const truncatedDescription = description
    ? description.length > 120
      ? description.substring(0, 117) + '...'
      : description
    : 'No description provided.';

  return (
    <div className="repository-card">
      <div className="card-content">
        <div className="card-header">
          <img
            src={owner.avatar_url}
            alt={`${owner.login} avatar`}
            className="owner-avatar"
          />
          {/* REMOVED: Link wrapper around h3 */}
          <h3 className="repo-name">{name}</h3>
        </div>
        <p className="repo-description">{truncatedDescription}</p>

        <div className="repo-stats">
          <span className="stat-item">
            ⭐ {stargazers_count.toLocaleString()}
          </span>
          <span className="stat-item">
            🍴 {forks_count.toLocaleString()}
          </span>
          {language && (
            <span className="stat-item">
              <span className="language-color" style={{ backgroundColor: getLanguageColor(language) }}></span>
              {language}
            </span>
          )}
        </div>
      </div>

      <div className="card-actions">
        {/* REMOVED: View Details button entirely */}
        
        <BookmarkButton repo={repo} />

        <a
          href={html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="view-github-button"
          aria-label={`View ${name} on GitHub`}
        >
          GitHub
        </a>
      </div>
    </div>
  );
};

const getLanguageColor = (language) => {
  // ... (unchanged)
  switch (language) {
    case 'JavaScript': return '#f1e05a';
    case 'Python': return '#3572A5';
    case 'Java': return '#b07219';
    case 'TypeScript': return '#2b7489';
    case 'C#': return '#178600';
    case 'PHP': return '#4F5D95';
    case 'C++': return '#f34b7d';
    case 'Ruby': return '#701516';
    case 'Go': return '#00ADD8';
    case 'Swift': return '#ffac45';
    case 'Rust': return '#dea584';
    default: return '#ccc';
  }
};

export default RepositoryCard;