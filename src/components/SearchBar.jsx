import React, { useState, useRef } from 'react';
import { FiSearch, FiMapPin, FiX } from 'react-icons/fi';

const SUGGESTIONS = [
  'London', 'New York', 'Tokyo', 'Paris', 'Sydney',
  'Mumbai', 'Dubai', 'Singapore', 'Berlin', 'Toronto',
  'Los Angeles', 'Chicago', 'Seoul', 'Shanghai', 'Moscow',
];

const SearchBar = ({ onSearch, onLocationClick, loading }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const filtered = SUGGESTIONS.filter((s) =>
    s.toLowerCase().includes(query.toLowerCase()) && query.length > 0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (city) => {
    setQuery(city);
    setShowSuggestions(false);
    onSearch(city);
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div className="search-wrapper position-relative">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-container d-flex align-items-center gap-2">
          <div className="search-input-wrap flex-grow-1 position-relative">
            <FiSearch className="search-icon" />
            <input
              ref={inputRef}
              type="text"
              className="search-input"
              placeholder="Search city (e.g. London, Tokyo...)"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              autoComplete="off"
            />
            {query && (
              <button type="button" className="clear-btn" onClick={handleClear}>
                <FiX />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="search-btn"
            disabled={loading || !query.trim()}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm" />
            ) : (
              <FiSearch />
            )}
            <span className="btn-text">Search</span>
          </button>
          <button
            type="button"
            className="location-btn"
            onClick={onLocationClick}
            title="Use my location"
            disabled={loading}
          >
            <FiMapPin />
          </button>
        </div>
      </form>

      {showSuggestions && filtered.length > 0 && (
        <ul className="suggestions-list">
          {filtered.map((city) => (
            <li
              key={city}
              className="suggestion-item"
              onMouseDown={() => handleSuggestionClick(city)}
            >
              <FiMapPin className="suggestion-icon" />
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
