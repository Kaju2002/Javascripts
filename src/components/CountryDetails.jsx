import React, { useContext } from "react";
import DetailsMore from "./countryDetails/DetailsMore";
import TouristPlaces from "./countryDetails/TouristPpaces";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from '@clerk/clerk-react';
const CountryDetails = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleGoBack = () => {
    navigate(-1); // This will navigate to the previous page
  };

  if (!isLoaded) {
    return (
      <div className="max-w-7xl mx-auto p-6 mt-20 text-center">
        Loading details...
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto p-6 mt-20">
      {/* Back Button */}
      <button
        onClick={handleGoBack}
        className="mb-6 text-sm font-medium py-2 px-4 bg-white border-2 border-black text-black rounded-full hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-black flex items-center transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 12H5m7 7l-7-7 7-7"
          />
        </svg>
        Back
      </button>

      {!isSignedIn  ? (
        // Attractive "Access Denied" Card for Details Page
        <div className="max-w-lg mx-auto mt-12 sm:mt-16 bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100 text-center group transition-all duration-300 ease-out">
          {/* Icon Container */}
          <div className="mx-auto flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gray-100 mb-6 border-2 border-gray-200 group-hover:border-gray-300 transition-colors duration-300">
            {/* Heroicon: LockClosed */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 sm:h-8 sm:w-8 text-gray-400 group-hover:text-gray-500 transition-colors duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          {/* Heading */}
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
            Detailed View Locked
          </h3>

          {/* Message */}
          <p className="text-gray-500 leading-relaxed mb-8">
            Please log in to access the full details, tourist spots, and other
            information about this country.
          </p>

          {/* Call to Action Button (Black) */}
          <Link
            to="/sign-in"
            className="inline-block px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all ease-in-out duration-200 transform hover:scale-[1.03] focus:scale-[1.03]"
          >
            Log In to View Details
          </Link>
        </div>
      ) : (
        <div>
          <DetailsMore />
          <TouristPlaces />
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
