// src/components/SearchBar.jsx
import React, { useContext, useState, useEffect, useRef } from "react"; 
import { AppContext } from "../Context/AppContext";
import { Search, X } from "lucide-react";

const SearchBar = () => {
  const { search, setSearch, countries } = useContext(AppContext); // Get all countries for suggestions
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef(null); // Ref for the search container

  // Effect to generate suggestions based on search input
  useEffect(() => {
    if (search.trim().length > 0) {
      const filteredSuggestions = countries
        .filter(country =>
          country.name.common.toLowerCase().startsWith(search.toLowerCase()) // Suggest based on "starts with"
          // Or use .includes() for more general matching:
          // country.name.common.toLowerCase().includes(search.toLowerCase())
        )
        .slice(0, 5); // Limit to 5 suggestions for example
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [search, countries]);

  // Effect to handle clicks outside the search bar to close suggestions
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRef]);


  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSuggestionClick = (countryName) => {
    setSearch(countryName); // Set the search bar to the full country name
    setShowSuggestions(false); // Hide suggestions
    // The useEffect in AppContext listening to 'search' will handle the filtering
  };

  const handleClearSearch = () => {
    setSearch("");
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full sm:w-auto sm:flex-grow md:max-w-md" ref={searchContainerRef}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
      </div>
      <input
        type="text"
        placeholder="Search for a country..."
        className="block w-full py-2.5 pl-10 pr-10 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={search}
        onChange={handleInputChange}
        onFocus={() => search.trim().length > 0 && setShowSuggestions(true)} // Show suggestions on focus if there's text
        autoComplete="off" // Important to prevent browser's own autocomplete
      />
      {search && (
        <button
          onClick={handleClearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Clear search"
        >
          <X className="h-5 w-5" />
        </button>
      )}

      {/* Suggestions List */}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((country) => (
            <li
              key={country.cca3}
              onClick={() => handleSuggestionClick(country.name.common)}
              className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
            >
              {country.name.common}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;