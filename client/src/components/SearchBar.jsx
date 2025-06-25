// components/SearchBar.jsx
import { useEffect, useState } from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(query.trim());
    }, 100); // debounce delay (300ms)

    return () => clearTimeout(delay); // cleanup
  }, [query, onSearch]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search videos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
