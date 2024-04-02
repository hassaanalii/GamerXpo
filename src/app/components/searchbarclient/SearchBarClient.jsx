// SearchBar.js
import React, { useState } from 'react';

const SearchBarClient = ({ onSearchSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(searchTerm.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center rounded-full bg-white shadow-md px-5 py-2">
      <input
        className="w-full text-[14px] rounded-full py-2 pl-2 pr-4 bg-white focus:outline-none"
        type="search"
        placeholder="Search games"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className='cursor-pointer flex rounded-full items-center justify-center p-2 bg-[#4F6F52]'>
        <img src="/search.png" alt="Search" height={14} width={14} />
      </button>
    </form>
  );
};

export default SearchBarClient;
