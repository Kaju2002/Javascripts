import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";

const RegionFilter = () => {
  const { region, setRegion } = useContext(AppContext);

  return (
    <div className="relative w-auto">
      <select
        className="block appearance-none w-36 sm:w-40 bg-white border border-gray-300 rounded-lg shadow-sm px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition duration-300 ease-in-out hover:shadow-md"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
        <option value="Antarctic">Antarctic</option>
      </select>

      {/* Custom dropdown arrow */}
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default RegionFilter;
