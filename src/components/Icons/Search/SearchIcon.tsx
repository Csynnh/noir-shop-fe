import React from 'react';
import styles from './Search.css';
const SearchIcon = () => {
  return (
    <div>
      <div className='search-box'>
        <button className='btn-search'>
          <i className='fas fa-search'></i>
        </button>
        <input type='text' className='input-search' placeholder='Type to Search...'></input>
      </div>
    </div>
  );
};

export default SearchIcon;
