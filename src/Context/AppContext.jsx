// src/Context/AppContext.jsx (or AppProvider.jsx) - FULL CORRECTED CODE
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create context
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [allCountriesCache, setAllCountriesCache] = useState([]); // Cache for /all results
  const [search, setSearch] = useState(() => localStorage.getItem("searchTerm") || "");
  const [region, setRegion] = useState(() => localStorage.getItem("regionFilter") || "All");
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [favoritesCount, setFavoritesCount] = useState(0); // Initialize with 0
  const [isLoading, setIsLoading] = useState(true); 

  const itemsPerPage = 20;

  // --- API Call Helper Functions (modified to return data) ---
  const fetchCountryByNameAPI = async (name) => {
    if (!name.trim()) return []; // Return empty if name is empty
    try {
      console.log(`API Call: Fetching by name - ${name}`);
      const res = await axios.get(`https://restcountries.com/v3.1/name/${name.trim()}`);
      return res.data;
    } catch (err) {
      console.error("Error fetching country by name:", err);
      return []; // Return empty array on error
    }
    // finally { setIsLoading(false); }
  };

  const fetchCountriesByRegionAPI = async (selectedRegion) => {
    try {
      console.log(`API Call: Fetching by region - ${selectedRegion}`);
      const res = await axios.get(`https://restcountries.com/v3.1/region/${selectedRegion}`);
      return res.data;
    } catch (err) {
      console.error("Error fetching countries by region:", err);
      return [];
    }
    // finally { setIsLoading(false); }
  };
  
  // --- Main useEffect to fetch initial /all and then filter based on search/region ---
  useEffect(() => {
    const loadAndFilterCountries = async () => {
      setIsLoading(true);
      setCurrentPage(1); // Reset page when filters change

      let countriesToFilter = allCountriesCache;

      // Step 1: Ensure we have the base list of all countries if needed
      if (allCountriesCache.length === 0) {
        try {
          console.log("Initial API Call: Fetching /all countries for cache");
          const res = await axios.get("https://restcountries.com/v3.1/all");
          setAllCountriesCache(res.data);
          countriesToFilter = res.data; // Use freshly fetched data for this run
        } catch (err) {
          console.error("Error fetching initial all countries:", err);
          setFilteredCountries([]);
          setIsLoading(false);
          return; // Exit if initial fetch fails
        }
      }

      // Step 2: Apply filters using API calls where required
      const trimmedSearch = search.trim();
      let finalFilteredList = [];

      if (trimmedSearch) {
        // Fetch by name, then filter by region client-side
        const nameResults = await fetchCountryByNameAPI(trimmedSearch); // This now returns data
        if (region !== "All") {
          finalFilteredList = nameResults.filter(country => country.region === region);
        } else {
          finalFilteredList = nameResults;
        }
      } else if (region !== "All") {
        // No search, fetch by region
        finalFilteredList = await fetchCountriesByRegionAPI(region); // This now returns data
      } else {
        // No search, region is "All" -> use the cached full list
        finalFilteredList = countriesToFilter; // which is allCountriesCache
      }
      
      setFilteredCountries(finalFilteredList);
      setIsLoading(false);
    };

    loadAndFilterCountries();
  }, [search, region, allCountriesCache.length]); // Re-run if search, region, or initial cache status changes

  // Load/Save search and region from/to localStorage
  useEffect(() => {
    if (search) localStorage.setItem("searchTerm", search);
    else localStorage.removeItem("searchTerm");
  }, [search]);

   useEffect(() => {
    localStorage.setItem("regionFilter", region);
  }, [region]);

  // Load favorites from localStorage on page load
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
    setFavoritesCount(savedFavorites.length);
  }, []);

  // Fetch country by alpha code (for CountryDetails page)
  const fetchCountryByCode = async (code) => {
    // setIsLoading(true); // Optional: manage a separate loading state for this if needed
    try {
      const res = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
      // setIsLoading(false);
      return res.data[0]; 
    } catch (err) {
      console.error("Error fetching country by code:", err);
      // setIsLoading(false);
      return null;
    }
  };

  // Pagination logic
  const totalItems = filteredCountries.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCountries.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || (totalPages > 0 && pageNumber > totalPages)) return;
    setCurrentPage(pageNumber);
  };

  // Favorite logic
  const toggleFavorite = (country) => {
    const isAlreadyFavorite = favorites.some(fav => fav.cca3 === country.cca3);
    let updatedFavorites;
    if (isAlreadyFavorite) {
      updatedFavorites = favorites.filter(fav => fav.cca3 !== country.cca3);
    } else {
      updatedFavorites = [...favorites, country];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavoritesCount(updatedFavorites.length);
  };
 
  const isFavorite = (countryCode) => {
    return favorites.some(fav => fav.cca3 === countryCode);
  };

  // Fetch country photos from Unsplash
  const fetchCountryPhotos = async (countryName) => {
    const unsplashKey = import.meta.env.VITE_UNSPLASH_KEY;
    if (!unsplashKey) {
      console.error("Unsplash API key is missing");
      return [];
    }
    try {
      const res = await axios.get("https://api.unsplash.com/search/photos", {
        params: { query: countryName, per_page: 8 },
        headers: { Authorization: `Client-ID ${unsplashKey}` },
      });
      return res.data.results.map((img) => img.urls.small);
    } catch (err) {
      console.error("Error fetching images from Unsplash:", err);
      return [];
    }
  };
  
  return (
    <AppContext.Provider
      value={{
        countries: allCountriesCache, // Expose the cached full list for SearchBar suggestions
        filteredCountries,
        search,
        setSearch,
        isLoading,
        region,
        setRegion,
        currentPage,
        totalPages,
        currentItems,
        handlePageChange,
        favorites,
        toggleFavorite,
        isFavorite,
        fetchCountryByCode,
        fetchCountryPhotos,
        favoritesCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;