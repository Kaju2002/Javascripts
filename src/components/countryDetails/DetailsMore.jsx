import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext"; // Adjust path if needed
import {
  FaUsers,
  FaGlobe,
  FaLanguage,
  FaMapMarkedAlt,
  FaDollarSign,
  FaCity,
} from "react-icons/fa"; // Importing some icons

const DetailsMore = () => {
  const { code } = useParams();
  const { countries, fetchCountryPhotos } = useContext(AppContext); // Access from context
  const [photos, setPhotos] = useState([]);
  const [wikiInfo, setWikiInfo] = useState(""); // For storing Wikipedia data

  const country = countries.find((c) => c.cca3 === code);

  // Fetch Wikipedia information when the component is loaded
  useEffect(() => {
    if (country?.name?.common) {
      const fetchWikiInfo = async () => {
        try {
          const script = document.createElement("script");
          script.src = `https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${country.name.common}&prop=extracts&exintro&explaintext&callback=handleWikiData`;
          document.body.appendChild(script);

          window.handleWikiData = (data) => {
            const pages = data.query.pages;
            const page = Object.values(pages)[0];
            setWikiInfo(page.extract);
          };
        } catch (err) {
          console.error("Failed to fetch Wikipedia data", err);
        }
      };

      fetchWikiInfo();
      fetchCountryPhotos(country.name.common).then(setPhotos); // Fetch country photos as well
    }
  }, [country, fetchCountryPhotos]);

  if (!country) {
    return (
      <div className="text-center mt-20 text-red-500 text-xl">
        ❌ Country not found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 mt-20">
      {/* Flag and About Sections */}
      <div className="flex flex-col md:flex-row justify-between gap-8 items-center">
        {/* Flag Image */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0 flex justify-center">
          <img
            src={country.flags.svg}
            alt={`${country.name.common} Flag`}
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* About the Country */}
        <div className="w-full md:w-2/3 text-center md:text-left">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            About {country.name.common}
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            {wikiInfo
              ? wikiInfo.slice(0, 300) + "..."
              : "Loading Wikipedia summary..."}
          </p>
          <a
            href={`https://en.wikipedia.org/wiki/${country.name.common}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="mt-4 text-red-600 py-2 px-4 rounded-md underline hover:text-black transition duration-200">
              Read More on Wikipedia
            </p>
          </a>
        </div>
      </div>

      {/* Country Details with Icons */}
      <div className="bg-white p-8 rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Country Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Native Name */}
          <div className="flex items-center space-x-4">
            <FaGlobe className="text-xl text-blue-600" />
            <div>
              <strong className="font-semibold text-gray-700">
                Native Name:
              </strong>{" "}
              {country.nativeName || "N/A"}
            </div>
          </div>

          {/* Population */}
          <div className="flex items-center space-x-4">
            <FaUsers className="text-xl text-green-600" />
            <div>
              <strong className="font-semibold text-gray-700">
                Population:
              </strong>{" "}
              {country.population?.toLocaleString() || "N/A"}
            </div>
          </div>

          {/* Region */}
          <div className="flex items-center space-x-4">
            <FaMapMarkedAlt className="text-xl text-red-600" />
            <div>
              <strong className="font-semibold text-gray-700">Region:</strong>{" "}
              {country.region || "N/A"}
            </div>
          </div>

          {/* Sub Region */}
          <div className="flex items-center space-x-4">
            <FaMapMarkedAlt className="text-xl text-yellow-600" />
            <div>
              <strong className="font-semibold text-gray-700">
                Sub Region:
              </strong>{" "}
              {country.subregion || "N/A"}
            </div>
          </div>

          {/* Capital */}
          <div className="flex items-center space-x-4">
            <FaCity className="text-xl text-purple-600" />
            <div>
              <strong className="font-semibold text-gray-700">Capital:</strong>{" "}
              {country.capital?.[0] || "N/A"}
            </div>
          </div>

          {/* Currencies */}
          <div className="flex items-center space-x-4">
            <FaDollarSign className="text-xl text-orange-600" />
            <div>
              <strong className="font-semibold text-gray-700">
                Currencies:
              </strong>{" "}
              {country.currencies
                ? Object.values(country.currencies)
                    .map((c) => c.name)
                    .join(", ")
                : "N/A"}
            </div>
          </div>

          {/* Languages */}
          <div className="flex items-center space-x-4">
            <FaLanguage className="text-xl text-teal-600" />
            <div>
              <strong className="font-semibold text-gray-700">
                Languages:
              </strong>{" "}
              {country.languages
                ? Object.values(country.languages).join(", ")
                : "N/A"}
            </div>
          </div>

          {/* Area */}
          <div className="flex items-center space-x-4">
            <FaMapMarkedAlt className="text-xl text-gray-600" />
            <div>
              <strong className="font-semibold text-gray-700">Area:</strong>{" "}
              {country.area?.toLocaleString()} km²
            </div>
          </div>
        </div>

        {/* Border Countries Section */}
        <div className="flex flex-wrap mt-6">
          <strong className="mr-2 text-lg font-semibold text-gray-700">
            Border Countries:
          </strong>
          {country.borders ? (
            country.borders.map((border, index) => (
              <span
                key={index}
                className="inline-block bg-blue-200 text-blue-800 py-1 px-3 rounded-full mr-2 mb-2 text-sm font-medium"
              >
                {border}
              </span>
            ))
          ) : (
            <span className="text-sm font-medium text-gray-500">
              No border countries available
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsMore;
