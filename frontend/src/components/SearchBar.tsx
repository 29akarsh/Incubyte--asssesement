import React, { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (params: any) => void;
  onReset: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onReset }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params: any = {};
    if (name) params.name = name;
    if (category) params.category = category;
    if (minPrice) params.minPrice = parseFloat(minPrice);
    if (maxPrice) params.maxPrice = parseFloat(maxPrice);
    onSearch(params);
  };

  const handleReset = () => {
    setName('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    onReset();
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Chocolate">Chocolate</option>
          <option value="Gummy">Gummy</option>
          <option value="Hard Candy">Hard Candy</option>
          <option value="Chewy">Chewy</option>
          <option value="Jelly">Jelly</option>
        </select>
        <input
          type="number"
          placeholder="Min Price (INR)"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          step="0.01"
        />
        <input
          type="number"
          placeholder="Max Price (INR)"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          step="0.01"
        />
        <button type="submit" className="btn-search">
          Search
        </button>
        <button type="button" onClick={handleReset} className="btn-reset">
          Reset
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

