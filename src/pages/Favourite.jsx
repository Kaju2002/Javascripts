import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { UserContext } from "../Context/UserContext";
import CountryCard from "../components/CountryCard";
import { Link } from "react-router-dom";

const Favourite = () => {
  const { favorites } = useContext(AppContext);
  const { isLoggedIn } = useContext(UserContext);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-12 min-h-screen">
      <h1 className="text-4xl font-semibold text-center text-black-600 tracking-wide leading-tight mb-4">
  🌍 Explore Your Favorite Countries
</h1>

      <p className="text-center text-gray-600 mb-10">
        Here you can find the countries you marked as favorites.
      </p>

      {/* Check if user is logged in */}
      {/* Check if user is logged in */}
       {!isLoggedIn ? (
        // Attractive "Access Denied" Card - No Custom Animations
        <div className="max-w-lg mx-auto mt-16 sm:mt-20 bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100 text-center group transition-all duration-300 ease-out">
          {/* Icon Container */}
          <div className="mx-auto flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gray-100 mb-6 border-2 border-gray-200 group-hover:border-gray-300 transition-colors duration-300">
            {/* Heroicon: LockClosed - Adjusted size and color */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8 text-gray-400 group-hover:text-gray-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
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

      ) : favorites.length === 0 ? (
        // More Attractive "No Favorites Yet" Card with Illustration Placeholder
        <div className="max-w-lg mx-auto mt-16 sm:mt-20 bg-white p-8 sm:py-12 sm:px-10 rounded-2xl shadow-xl border border-gray-100 text-center">

          {/* Illustration Area (Placeholder) */}
          {/* Replace this div with an actual SVG or relevant image */}
          <div className="mx-auto mb-8 h-32 w-32 flex items-center justify-center rounded-full bg-blue-50 border border-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /> {/* Outline Heart */}
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.73-6.01M12 21a9.004 9.004 0 01-8.73-6.01M3.27 14.99A9.005 9.005 0 0112 3c2.97 0 5.66.848 7.73 2.27" /> {/* Globe Arc */}
              </svg>
          </div>

          {/* Heading */}
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">
            Ready to Build Your List?
          </h3>

          {/* Message */}
          <p className="text-gray-500 leading-relaxed mb-8">
            Click the heart ❤️ on any country you find interesting to add it to your personal favorites collection.
          </p>

          {/* Call to Action Button (Black) */}
          <Link
            to="/country"
            className="inline-block px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all ease-in-out duration-200 transform hover:scale-[1.03] focus:scale-[1.03]"
          >
            Find Countries Now
          </Link>
        </div>
      ) : favorites.length === 0 ? (
        // Display this message if the user is logged in but has no favorites
        <div className="max-w-xl mx-auto mt-20 bg-yellow-100 border border-yellow-400 text-yellow-700 px-6 py-5 rounded-lg text-left shadow-md">
          <div className="font-semibold text-lg mb-2 flex items-center">
            <svg
              className="h-5 w-5 text-yellow-600 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.366-.446.986-.533 1.414 0l6.518 8.015c.39.48.04 1.218-.707 1.218H4.518c-.748 0-1.098-.738-.708-1.218l6.518-8.015zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-2-2a1 1 0 012 0v1a1 1 0 11-2 0v-1z"
                clipRule="evenodd"
              />
            </svg>
            No Favorites Yet
          </div>
          <ul className="list-disc list-inside mb-4">
            <li>You haven't added any countries to your favorites yet.</li>
          </ul>
          <p className="text-gray-500 mt-2">
            Browse and click the ❤️ icon to add a country to your list.{" "}
            <Link to="/country" className="text-red-600 hover:underline">
              Explore Countries
            </Link>
          </p>
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
