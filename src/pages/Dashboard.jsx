// src/pages/Dashboard.jsx
import React, { useState, useEffect, useContext } from 'react';
import RepositoryCard from '../components/RepositoryCard';
import FilterPanel from '../components/FilterPanel';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import RepositoryCardSkeleton from '../components/RepositoryCardSkeleton';
import { BookmarkContext } from '../App';

import './Dashboard.css';

const GITHUB_API_URL = "https://api.github.com/search/repositories";

const Dashboard = () => {
  const { bookmarkedRepos } = useContext(BookmarkContext);
  const [repositories, setRepositories] = useState([]);
  const [filteredRepositories, setFilteredRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    query: "react",
    language: "",
    minStars: "",
    sortBy: "stars",
    orderBy: "desc",
  });
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);

  const fetchRepositories = async (page, currentFilters) => {
    setLoading(true);
    setError(null);

    const { query, language, minStars, sortBy, orderBy } = currentFilters;

    let apiUrl = `${GITHUB_API_URL}?q=${query || 'popular'}`;
    if (language) {
      apiUrl += `+language:${language}`;
    }
    if (minStars) {
      apiUrl += `+stars:>=${minStars}`;
    }
    apiUrl += `&sort=${sortBy}&order=${orderBy}&page=${page}&per_page=12`;

    try {
      const response = await fetch(apiUrl, {
        headers: {
          // Authorization: `token YOUR_GITHUB_PAT`, // Uncomment with your PAT if needed
        },
      });

      if (!response.ok) {
        if (response.status === 403) {
            const resetTime = response.headers.get('x-ratelimit-reset');
            const now = Math.floor(Date.now() / 1000);
            const secondsToWait = resetTime ? parseInt(resetTime) - now : 60;
            setError(`GitHub API rate limit exceeded. Please wait ${Math.ceil(secondsToWait / 60)} minutes.`);
        } else if (response.status === 422) {
            const errorData = await response.json();
            setError(`Invalid request: ${errorData.message || 'Please check your search criteria.'}`);
        }
        else {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
      }

      const data = await response.json();

      if (page === 1) {
        setRepositories(data.items);
      } else {
        setRepositories((prevRepos) => [...prevRepos, ...data.items]);
      }

      setHasMore(data.items.length === 12);
    } catch (e) {
      setError(e.message);
      console.error("Error fetching repositories:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    setRepositories([]);
    setHasMore(true);
    fetchRepositories(1, filters);
  }, [filters]);

  useEffect(() => {
    let currentRepos = repositories;

    if (showBookmarkedOnly) {
      // Filter the currently fetched 'repositories' against 'bookmarkedRepos'
      currentRepos = repositories.filter(repo =>
        bookmarkedRepos.some(bookmarkedRepo => bookmarkedRepo.id === repo.id)
      );
    }
    
    setFilteredRepositories(currentRepos);
  }, [repositories, showBookmarkedOnly, bookmarkedRepos]); // Ensure bookmarkedRepos is a dependency

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchRepositories(nextPage, filters);
    }
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <div className="toggle-button-group">
        <button
          className={`toggle-button ${!showBookmarkedOnly ? 'active' : ''}`}
          onClick={() => setShowBookmarkedOnly(false)}
        >
          All Repositories
        </button>
        <button
          className={`toggle-button ml-3 ${showBookmarkedOnly ? 'active' : ''}`}
          onClick={() => setShowBookmarkedOnly(true)}
        >
          Bookmarked Repositories
        </button>
      </div>

      {error && <ErrorMessage message={error} />}

      {/* NEW: Wrapper for filter panel and repository grid */}
      <div className="dashboard-content-layout"> 
        <FilterPanel onApplyFilters={handleApplyFilters} currentFilters={filters} />

        <div className="repository-content-area"> {/* NEW: Wrapper for grid + load more + spinner */}
          <div className="repository-grid">
            {loading && repositories.length === 0 ? (
              Array.from({ length: 9 }).map((_, index) => (
                <RepositoryCardSkeleton key={index} />
              ))
            ) : (
              <>
                {filteredRepositories.length === 0 && !error ? (
                  <p className="no-repos-found-message full-width-grid-item">
                    {showBookmarkedOnly ? 'No bookmarked repositories found.' : 'No repositories found matching your criteria.'}
                  </p>
                ) : (
                  filteredRepositories.map((repo) => (
                    <RepositoryCard key={repo.id} repo={repo} />
                  ))
                )}
              </>
            )}
          </div>

          {loading && repositories.length > 0 && <LoadingSpinner />}

          {!loading && hasMore && filteredRepositories.length > 0 && (
            <div className="load-more-container">
              <button onClick={handleLoadMore} className="load-more-button">
                Load More
              </button>
            </div>
          )}
        </div> {/* End of repository-content-area */}
      </div> {/* End of dashboard-content-layout */}
    </>
  );
};

export default Dashboard;