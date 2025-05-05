import React, { useContext, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { AppContext } from "../Context/AppContext"; // Adjust the path as needed
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { toast } from "react-toastify";

const CountryCard = ({ country }) => {
  const { toggleFavorite, isFavorite } = useContext(AppContext);
  const { isLoggedIn } = useContext(UserContext); // ✅ Check login status
  const [showLoginAlert, setShowLoginAlert] = useState(false); // ✅ local alert state

  const handleFavoriteClick = () => {
    if (!isLoggedIn) {
      setShowLoginAlert(true);
      setTimeout(() => setShowLoginAlert(false), 5000); // auto-dismiss after 5s
      return;
    }
    toggleFavorite(country);
  };

  return (
    <div className="relative bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-gray-100">
      {/* Floating alert (absolute to this card) */}
      {/* Floating alert (absolute to this card) */}
      {showLoginAlert && (
        <div className="absolute top-3 left-3 right-3 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm shadow">
          <div className="font-semibold flex items-center">
            <svg
              className="h-4 w-4 mr-2 text-red-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.366-.446.986-.533 1.414 0l6.518 8.015c.39.48.04 1.218-.707 1.218H4.518c-.748 0-1.098-.738-.708-1.218l6.518-8.015zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-2-2a1 1 0 012 0v1a1 1 0 11-2 0v-1z"
                clipRule="evenodd"
              />
            </svg>
            You must be logged in to add favorites.
          </div>
        </div>
      )}

      <div className="bg-blue-50 p-5">
        <img
          src={country.flags?.svg || ""}
          alt={`${country.name?.common || "Country"} flag`}
          className="w-full h-44 object-cover rounded-xl mb-4"
        />
        <div className="text-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-xl text-blue-700">
              {country.name?.common}
            </h2>
            <button
              onClick={handleFavoriteClick}
              className="text-xl text-red-500 hover:scale-110 transition-transform"
            >
              {isFavorite(country.cca3) ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>

          <div className="space-y-2 text-sm leading-relaxed">
            <p>
              <span className="font-medium">🌍 Population:</span>{" "}
              {country.population?.toLocaleString() || "N/A"}
            </p>
            <p>
              <span className="font-medium">🏛 Capital:</span>{" "}
              {country.capital?.[0] || "N/A"}
            </p>
            <p>
              <span className="font-medium">🗺 Region:</span>{" "}
              {country.region || "N/A"}
            </p>
            <p>
              <span className="font-medium">🗣 Languages:</span>{" "}
              {country.languages
                ? Object.values(country.languages).join(", ")
                : "N/A"}
            </p>
          </div>

          <Link to={`/country-details/${country.cca3}`}>
            <button className="mt-4 inline-flex items-center text-sm text-blue-600 hover:underline transition duration-200">
              🔗 Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
