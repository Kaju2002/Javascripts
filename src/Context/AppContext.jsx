import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create context
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");
  const [currentPage, setCurrentPage] = useState(1); // pagination state
  const [favorites, setFavorites] = useState([]); // initial state for favorites
  const [filteredCountries, setFilteredCountries] = useState([]); // Define filteredCountries only once here
  const [favoritesCount, setFavoritesCount] = useState([]);

  const itemsPerPage = 20;

  // Fetch countries (GET /all)
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(res.data); // Set all countries
        setFilteredCountries(res.data); // Initialize filteredCountries with all countries
      } catch (err) {
        console.error(err);
      }
    };
    fetchCountries();
  }, []);

  // Load favorites from localStorage on page load
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  // Fetch country by name (GET /name/{name})
  const fetchCountryByName = async (name) => {
    try {
      const res = await axios.get(
        `https://restcountries.com/v3.1/name/${name}`
      );
      setFilteredCountries(res.data); // Update filteredCountries state with search result
    } catch (err) {
      console.error("Error fetching country by name:", err);
    }
  };

  // Trigger search for countries when search term changes
  useEffect(() => {
    if (search) {
      fetchCountryByName(search); // Fetch countries by name based on search term
    } else {
      setFilteredCountries(countries); // Reset to show all countries if no search term
    }
  }, [search, countries]);

  // Fetch countries by region (GET /region/{region})
  const fetchCountriesByRegion = async (region) => {
    try {
      const res = await axios.get(
        `https://restcountries.com/v3.1/region/${region}`
      );
      setFilteredCountries(res.data); // Update filteredCountries with the region result
    } catch (err) {
      console.error("Error fetching countries by region:", err);
    }
  };

  // Trigger region change when a region is selected
  useEffect(() => {
    if (region !== "All") {
      fetchCountriesByRegion(region); // Fetch countries by region
    } else {
      setFilteredCountries(countries); // Reset to show all countries if "All" region is selected
    }
  }, [region, countries]);

  // Fetch country by alpha code (GET /alpha/{code})
  const fetchCountryByCode = async (code) => {
    try {
      const res = await axios.get(
        `https://restcountries.com/v3.1/alpha/${code}`
      );
      setFilteredCountries(res.data); // Update filteredCountries with the country details
    } catch (err) {
      console.error("Error fetching country by code:", err);
    }
  };

  // Pagination logic
  const totalItems = filteredCountries.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCountries.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  // Favorite logic
  const toggleFavorite = (country) => {
    const isAlreadyFavorite = favorites.find(
      (fav) => fav.cca3 === country.cca3
    );
    let updatedFavorites;
    if (isAlreadyFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.cca3 !== country.cca3);
    } else {
      updatedFavorites = [...favorites, country];
    }
    setFavorites(updatedFavorites);

    // Save updated favorites to localStorage
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavoritesCount(updatedFavorites.length); // Update the count of favorites

    
  };

 
  const isFavorite = (countryCode) => {
    return favorites.some((fav) => fav.cca3 === countryCode);
  };

  // Fetch country photos from Unsplash
  const fetchCountryPhotos = async (countryName) => {
    const unsplashKey = import.meta.env.VITE_UNSPLASH_KEY;
    console.log(unsplashKey);
    if (!unsplashKey) {
      console.error("Unsplash API key is missing");
      return [];
    }

    try {
      const res = await axios.get("/unsplash/search/photos", {
        params: {
          query: countryName,
          per_page: 8,
        },
        headers: {
          Authorization: `Client-ID ${unsplashKey}`,
        },
      });

      return res.data.results.map((img) => img.urls.small);
    } catch (err) {
      console.error("Error fetching images:", err);
      return [];
    }
  };

  

  useEffect(() => {
    // Load favorites from localStorage on page load
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
    setFavoritesCount(savedFavorites.length); // Set the count from the length of favorites array
  }, []); // This effect runs once when the component mounts
  
  
  return (
    <AppContext.Provider
      value={{
        countries,
        filteredCountries, // Use filteredCountries for the filtered list
        search,
        setSearch,
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
        setFavoritesCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
