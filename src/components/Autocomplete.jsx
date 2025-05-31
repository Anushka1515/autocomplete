
import React, { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import './Autcomplete.css'; 

const Autocomplete = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(
          `http://localhost:5000/products/search?q=${debouncedQuery}&limit=10&skip=${skip}`
        );
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await res.json();
        setResults(data.products || []);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery, skip]);

  const handleChange = (e) => {
    setQuery(e.target.value);
    setSkip(0);
  };

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search products..."
        className="autocomplete-input"
      />
      {loading && <div className="autocomplete-loading">Loading...</div>}
      {error && <div className="autocomplete-error">{error}</div>}
      {results.length > 0 && (
        <ul className="autocomplete-results">
          {results.map((item) => (
            <li key={item.id} className="autocomplete-item">
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;

