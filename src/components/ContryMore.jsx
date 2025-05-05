// src/components/ContryMore.jsx
import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { Link } from "react-router-dom";

const ContryMore = () => {
  const { countries } = useContext(AppContext);

  const popularCodes = ["USA", "JPN", "GBR", "FRA", "AUS", "CAN"];
  const popularCountries = countries.filter((country) =>
    popularCodes.includes(country.cca3)
  );

  return (
    <section className="w-full bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-black mb-10 underline underline-offset-8 decoration-black">
          🌍 Popular Countries
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularCountries.map((country) => (
            <div
              key={country.cca3}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={country.flags?.png}
                alt={`${country.name?.common} flag`}
                className="w-full h-32 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {country.name?.common}
                </h3>
                <div className="space-y-1 text-sm text-gray-700">
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
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            to="/country"
            className="text-lg px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
          >
            Explore All Countries
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContryMore;
