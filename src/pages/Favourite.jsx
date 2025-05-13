import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext"; // Assuming this path is correct
import CountryCard from "../components/CountryCard"; // Assuming this path is correct
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { Lock, Heart, Search } from "lucide-react"; // Importing icons

const Favourite = () => {
  const { favorites } = useContext(AppContext);
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)] pt-16">
        {/* 80px is an example navbar height, adjust if needed */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <p className="ml-4 text-lg text-gray-700 dark:text-gray-300">Loading Favorites...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-12 min-h-screen"> {/* pt-24 assumes navbar height */}
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white tracking-tight leading-tight mb-3">
        🌍 Explore Your Favorite Countries
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-10 text-lg">
        Here you can find the countries you marked as favorites.
      </p>

      {!isSignedIn ? (
        // "Access Your Favorites" - Shown when NOT signed in
        <div className="max-w-md mx-auto mt-12 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-6 border-2 border-gray-200 dark:border-gray-600">
            <Lock className="h-8 w-8 text-gray-500 dark:text-gray-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            Access Your Favorites
          </h3>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
            Log in required. Please sign in to view the countries you've saved.
          </p>
          <Link
            to="/sign-in" // Make sure this route renders Clerk's <SignIn />
            className="w-full inline-block px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-gray-800 hover:bg-gray-900 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 dark:focus:ring-blue-500 transition-all ease-in-out duration-200 transform hover:scale-[1.02]"
          >
            Log In
          </Link>
        </div>
      ) : favorites && favorites.length === 0 ? (
        // "No Favorites Yet" - Shown when signed in BUT favorites array is empty
        <div className="max-w-md mx-auto mt-12 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 text-center">
          <div className="mx-auto mb-8 h-20 w-20 flex items-center justify-center rounded-full bg-blue-50 dark:bg-gray-700 border border-blue-100 dark:border-gray-600">
            <Heart className="h-10 w-10 text-blue-500 dark:text-blue-400" strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            Your Favorites List is Empty
          </h3>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
            You haven't added any countries yet. Start exploring and click the
            heart icon to save your favorites!
          </p>
          <Link
            to="/country" // Link to your page for browsing countries
            className="w-full inline-block px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-gray-800 hover:bg-gray-900 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 dark:focus:ring-blue-500 transition-all ease-in-out duration-200 transform hover:scale-[1.02]"
          >
            <Search className="inline-block w-5 h-5 mr-2 -mt-1" /> Find Countries
          </Link>
        </div>
      ) : (
        // Display favorite countries - Shown when signed in AND favorites exist
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
          {favorites && favorites.map((country) => (
            <CountryCard key={country.cca3 || country.name?.common} country={country} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourite;