// src/components/FilterPanel.jsx
import React, { useState, useEffect } from 'react';
import './FilterPanel.css';

const FilterPanel = ({ onApplyFilters, currentFilters }) => {
  const [filters, setFilters] = useState(currentFilters);
  // State for filter panel visibility on mobile
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  useEffect(() => {
    // Update internal filters state when external currentFilters prop changes
    setFilters(currentFilters);
  }, [currentFilters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onApplyFilters(filters);
    // Optionally close the panel after applying filters on mobile/small screens
    // window.innerWidth check is client-side, runs when event occurs
    // A more robust way might be to use a context or a prop for mobile state if needed
    if (window.innerWidth <= 768) { // Assuming 768px is your mobile breakpoint
      setIsFilterPanelOpen(false);
    }
  };

  return (
    <div className="filter-panel-wrapper">
      {/* Toggle button for mobile. It will only be visible on mobile via CSS. */}
      <button
        className={`filter-toggle-button ${isFilterPanelOpen ? 'open' : ''}`}
        onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
        aria-expanded={isFilterPanelOpen}
        aria-controls="filter-form-section"
      >
        {isFilterPanelOpen ? 'Hide Filters' : 'Show Filters'}
        <span className="toggle-icon">{isFilterPanelOpen ? '▲' : '▼'}</span>
      </button>

      {/* The filter panel content. Its visibility and behavior are controlled by CSS. */}
      <div id="filter-form-section" className={`filter-panel ${isFilterPanelOpen ? 'open' : ''}`}>
        <h2 className="filter-title">Filter Repositories</h2>
        <form onSubmit={handleSubmit}>
          {/* Apply .form-group for the animation effect */}
          <div className="form-group">
            <label htmlFor="query" className="form-label">Search Query:</label>
            <input
              type="text"
              id="query"
              name="query"
              value={filters.query}
              onChange={handleChange}
              placeholder="e.g., react, javascript"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="language" className="form-label">Language:</label>
            <select
              id="language"
              name="language"
              value={filters.language}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Any</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="TypeScript">TypeScript</option>
              <option value="C#">C#</option>
              <option value="PHP">PHP</option>
              <option value="C++">C++</option>
              <option value="Ruby">Ruby</option>
              <option value="Go">Go</option>
              <option value="Swift">Swift</option>
              <option value="Rust">Rust</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="minStars" className="form-label">Minimum Stars:</label>
            <input
              type="number"
              id="minStars"
              name="minStars"
              value={filters.minStars}
              onChange={handleChange}
              placeholder="e.g., 1000"
              min="0"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="sortBy" className="form-label">Sort By:</label>
            <select
              id="sortBy"
              name="sortBy"
              value={filters.sortBy}
              onChange={handleChange}
              className="form-select"
            >
              <option value="stars">Stars</option>
              <option value="updated">Last Updated</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="orderBy" className="form-label">Order:</label>
            <select
              id="orderBy"
              name="orderBy"
              value={filters.orderBy}
              onChange={handleChange}
              className="form-select"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>

          {/* This div also acts as a .form-group for animation purposes */}
          <div className="form-group form-actions">
            <button type="submit" className="apply-filters-button">Apply Filters</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterPanel;