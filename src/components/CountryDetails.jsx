import React from "react"; // No need for useContext if not used directly here
import DetailsMore from "./countryDetails/DetailsMore";
import TouristPlaces from "./countryDetails/TouristPpaces";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from '@clerk/clerk-react';

const CountryDetails = () => {
  const { isSignedIn, isLoaded } = useAuth(); // We still get this, but won't block based on isSignedIn
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!isLoaded) {
    // Still good to show a loading state while Clerk initializes
    return (
      <div className="max-w-7xl mx-auto p-6 mt-20 text-center">
        Loading details...
      </div>
    );
  }

  // The main change is HERE: We no longer use `!isSignedIn` to conditionally render the "Access Denied" message.
  // We will always render the details.
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

      {/* --- MODIFIED SECTION --- */}
      {/* We always render the details now. The `!isSignedIn` block is effectively removed for rendering. */}
      {/* You can keep the "Access Denied" JSX commented out if you plan to re-enable it later. */}

      {/*
      // PREVIOUSLY:
      // !isSignedIn ? (
      //   // Attractive "Access Denied" Card for Details Page
      //   <div className="max-w-lg mx-auto mt-12 sm:mt-16 bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100 text-center group transition-all duration-300 ease-out">
      //     ... access denied content ...
      //   </div>
      // ) : (
      //   <div>
      //     <DetailsMore />
      //     <TouristPlaces />
      //   </div>
      // )
      */}

      {/* NOW: Always render the details */}
      <div>
        <DetailsMore />
        <TouristPlaces />
      </div>
      {/* --- END MODIFIED SECTION --- */}

    </div>
  );
};

export default CountryDetails;