import React from 'react'

const SearchForm = (props) => {
  return (
    <form onSubmit={props.getWeather} className="search-wrapper">
      <input name="city" placeholder="Type to search" type="search" />
      <button id="search-btn">Get weather</button>
    </form>
  );
};

export default SearchForm