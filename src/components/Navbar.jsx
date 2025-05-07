import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Moon, Sun, Home, MapPin, Heart } from "lucide-react";
import { UserContext } from "../Context/UserContext";
import axios from "axios";
import { AppContext } from "../Context/AppContext";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Track mobile menu state
  const [activeLink, setActiveLink] = useState("/"); // Set the initial active link to '/'
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // State to control dropdown visibility

  const { isLoggedIn, loading, userData, setIsLoggedIn, setUserData } =
    useContext(UserContext);
  const { favoritesCount ,API_BASE_URL} = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsOpen(false); // Close the mobile menu after clicking a link
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <Home className="w-5 h-5 mr-2" /> },
    {
      name: "Countries",
      path: "/country",
      icon: <MapPin className="w-5 h-5 mr-2" />,
    },
    {
      name: "Favourites",
      path: "/favourite",
      icon: <Heart className="w-5 h-5 mr-2" />,
    },
  ];

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/auth/logout`, {
        withCredentials: true,
      });
      localStorage.removeItem("userId");

      setIsLoggedIn(false);
      setUserData(false);
      setIsOpen(false); // Close mobile menu after logout
      setShowDropdown(false); // Close dropdown after logout
      navigate("/"); // Redirect to Home page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // Toggle the dropdown visibility
  };

  const closeDropdown = () => {
    setShowDropdown(false); // Close the dropdown
  };

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg"
          : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="group flex items-center">
              <span className="text-2xl font-bold text-gray-800 dark:text-gray-200 transform transition-transform duration-300 group-hover:scale-105">
                🌐 Globalize
              </span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`relative flex items-center text-lg font-medium px-4 py-1 transition-all duration-300 border-b-2 ${
                  activeLink === link.path
                    ? "border-blue-600 text-blue-600 font-semibold"
                    : "border-transparent text-gray-700 dark:text-gray-300 hover:text-gray-500 hover:border-gray-300 dark:hover:text-gray-400 dark:hover:border-gray-600"
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
                {link.name === "Favourites"  && isLoggedIn && favoritesCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favoritesCount}
                  </div>
                )}
              </Link>
            ))}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500 transition-transform duration-300 hover:rotate-90" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700 transition-transform duration-300 hover:-rotate-90" />
              )}
            </button>

            {!loading &&
              (isLoggedIn ? (
                <div className="relative group">
                  <div
                    className="w-8 h-8 rounded-full flex justify-center items-center bg-black text-white relative group cursor-pointer"
                    onClick={toggleDropdown} // Toggle the dropdown when clicked
                  >
                    {userData?.name?.[0]?.toUpperCase()}
                  </div>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50">
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-sm font-medium text-gray-800 dark:text-white">
                          {userData.email}
                        </span>
                      </div>

                      <div className="py-2 px-4 space-y-2">
                        <Link
                          to="/profile"
                          onClick={closeDropdown} // Close dropdown on link click
                          className="block text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md py-1"
                        >
                          Profile
                        </Link>
                        <Link
                          to="/favourite"
                          onClick={closeDropdown} // Close dropdown on link click
                          className="block text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md py-1"
                        >
                          Favourites
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            closeDropdown(); // Close dropdown after logout
                          }}
                          className="block w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate("/sign-in")}
                  className="bg-gray-800 text-white px-5 py-2 rounded-md hover:bg-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Login
                </button>
              ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleDarkMode}
              className="p-2 mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800
                transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen
              ? "max-h-64 opacity-100 visible"
              : "max-h-0 opacity-0 invisible"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 rounded-b-lg shadow-md">
          {navLinks.map((link) => (
  <Link
    key={link.path}
    to={link.path}
    onClick={() => handleLinkClick(link.path)}
    className={`relative flex items-center text-lg font-medium px-4 py-1 transition-all duration-300 border-b-2 ${
      activeLink === link.path
        ? "border-blue-600 text-blue-600 font-semibold"
        : "border-transparent text-gray-700 dark:text-gray-300 hover:text-gray-500 hover:border-gray-300 dark:hover:text-gray-400 dark:hover:border-gray-600"
    }`}
  >
    {link.icon}
    <span>{link.name}</span>
    {/* Show favorites count in the desktop menu for Favourites */}
    {link.name === "Favourites"  && isLoggedIn && favoritesCount > 0 && (
      <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {favoritesCount}
      </div>
    )}
  </Link>
))}


            {/* Mobile Logout */}
            {isLoggedIn && (
              <div className="py-2 px-4">
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Mobile Login */}
            {!isLoggedIn && (
              <div className="py-2 px-4">
                <button
                  onClick={() => {
                    setIsOpen(false); // Close the mobile menu
                    navigate("/sign-in"); // Navigate to the login page
                  }}
                  className="w-full bg-gray-800 text-white px-5 py-2 rounded-md hover:bg-gray-900 transition-colors duration-200"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
