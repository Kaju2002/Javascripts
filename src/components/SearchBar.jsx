import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { Search } from "lucide-react"; // Assuming you want to use a search icon

const SearchBar = () => {
  const { search, setSearch } = useContext(AppContext);

  return (
    <div className="relative w-full sm:w-1/2">
      <input
        type="text"
        placeholder="Search for a country..."
        className="w-full px-4 py-2 pl-10 pr-4 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
    </div>
  );
};

export default SearchBar;
