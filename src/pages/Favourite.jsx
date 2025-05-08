import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import CountryCard from "../components/CountryCard";
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
const Favourite = () => {
  const { favorites } = useContext(AppContext);
  const { isSignedIn, isLoaded } = useAuth(); // ✅ Add this line

  if (!isLoaded) {
    return (
      <div className="max-w-7xl mx-auto p-6 mt-20 text-center">
        Loading details...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-12 min-h-screen">
      <h1 className="text-4xl font-semibold text-center text-black-600 tracking-wide leading-tight mb-4">
        🌍 Explore Your Favorite Countries
      </h1>

      <p className="text-center text-gray-600 mb-10">
        Here you can find the countries you marked as favorites.
      </p>

     
      {!isSignedIn ? (
        <div className="max-w-lg mx-auto mt-16 sm:mt-20 bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100 text-center group transition-all duration-300 ease-out">
          {/* Icon Container */}
          <div className="mx-auto flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gray-100 mb-6 border-2 border-gray-200 group-hover:border-gray-300 transition-colors duration-300">
            {/* Heroicon: LockClosed - Adjusted size and color */}
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
            Access Your Favorites
          </h3>

          {/* Message */}
          <p className="text-gray-500 leading-relaxed mb-8">
            Log in required. Please sign in to view the countries you've saved.
          </p>

          {/* Call to Action Button (Black) */}
          <Link
            to="/sign-in"
            className="inline-block px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all ease-in-out duration-200 transform hover:scale-[1.03] focus:scale-[1.03]" // Added focus scale
          >
            Log In
          </Link>
        </div>
      ) : (
        // Render favorite countries if user is logged in and favorites exist
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favorites.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourite;
