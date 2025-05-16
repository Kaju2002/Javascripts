import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext"; 
import CountryCard from "../components/CountryCard";
import SearchBar from "../components/SearchBar";
import RegionFilter from "../components/RegionFilter";

const CountryPage = () => {
  const {
   
    region,
    setRegion,
    currentPage,
    totalPages,
    currentItems,
    handlePageChange,
  } = useContext(AppContext);

  return (
    <div className="max-w-7xl mx-auto p-4 pt-24">
      {/* Search and Region Selector */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <SearchBar  />
        <RegionFilter region={region} setRegion={setRegion} />
      </div>

      {/* Display filtered countries with pagination */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {currentItems.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>



     

      {/* Pagination */}
      <div className="flex justify-center items-center mt-10 space-x-2 text-sm text-gray-600">
  <span>
    Showing {currentPage * 20 - 19} to {Math.min(currentPage * 20, currentItems.length)} of {currentItems.length} items
  </span>
  
  <div className="flex items-center space-x-2 ml-4">
    {/* Previous Button */}
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      className="px-4 py-2 border rounded-full bg-white text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={currentPage === 1}
    >
      &lt;
    </button>

    {/* Page Numbers */}
    {[...Array(totalPages)].map((_, i) => (
      <button
        key={i}
        onClick={() => handlePageChange(i + 1)}
        className={`px-4 py-2 border rounded-full transition duration-300 ease-in-out ${currentPage === i + 1 ? "bg-blue-500 text-white font-semibold" : "text-gray-700 bg-white hover:bg-gray-200"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        {i + 1}
      </button>
    ))}

    {/* Next Button */}
    <button
      onClick={() => handlePageChange(currentPage + 1)}
      className="px-4 py-2 border rounded-full bg-white text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={currentPage === totalPages}
    >
      &gt;
    </button>
  </div>
</div>

    </div>
  );
};

export default CountryPage;
