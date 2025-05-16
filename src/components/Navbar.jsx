// Navbar.jsx
import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Moon, Sun, Home, MapPin, Heart, ChevronDown, LogOut, User, Star } from "lucide-react";
import { AppContext } from "../Context/AppContext";
import { useUser, useAuth, SignedIn, SignedOut } from "@clerk/clerk-react";
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof localStorage !== 'undefined' && localStorage.theme) {
      return localStorage.theme === 'dark';
    }
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(window.location.pathname);
  const [scrolled, setScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const { isSignedIn, user, isLoaded } = useUser();
  const { signOut } = useAuth();
  const { favoritesCount } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark'); localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark'); localStorage.theme = 'light';
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20); // You might want to set scrolled at window.scrollY > 0 for immediate effect
    window.addEventListener("scroll", handleScroll);
    const updateActiveLink = () => setActiveLink(window.location.pathname);
    window.addEventListener('popstate', updateActiveLink);
    updateActiveLink();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('popstate', updateActiveLink);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const toggleDarkMode = () => setIsDarkMode(prevMode => !prevMode);
  const handleLinkClick = (link) => { setActiveLink(link); setIsOpen(false); };

  const navLinks = [
    { name: "Home", path: "/", icon: <Home className="w-5 h-5 mr-3" /> },
    { name: "Countries", path: "/country", icon: <MapPin className="w-5 h-5 mr-3" /> },
    { name: "Favourites", path: "/favourite", icon: <Heart className="w-5 h-5 mr-3" /> },
  ];

  const handleClerkLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully!");
      setShowUserDropdown(false);
      setIsOpen(false);
      navigate("/");
      setActiveLink("/");
    } catch (error) {
      console.error("Clerk logout failed:", error);
      toast.error("Logout failed.");
    }
  };
  
  return (
    <nav 
      className={`fixed w-full top-0 left-0 z-40 transition-all duration-300 ease-in-out 
        ${scrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg' // Scrolled: semi-transparent, blurred, with shadow
          : 'bg-white dark:bg-gray-900 shadow-md'                        // Not Scrolled: solid background, with shadow
        }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" onClick={() => handleLinkClick('/')} className="group flex items-center">
              <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">🌐 Globalize</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path} to={link.path} onClick={() => handleLinkClick(link.path)}
                className={`relative flex items-center text-lg font-medium px-4 py-1 transition-all duration-300 border-b-2 ${
                  activeLink === link.path
                    ? "border-black text-black dark:border-gray-500 dark:text-gray-100 font-semibold" 
                    : "border-transparent text-gray-700 dark:text-gray-300 hover:text-gray-500 hover:border-gray-300 dark:hover:text-gray-400 dark:hover:border-gray-600"
                }`}
              >
                {link.icon}<span>{link.name}</span>
                {link.name === "Favourites" && isSignedIn && favoritesCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favoritesCount}
                  </div>
                )}
              </Link>
            ))}

            {/* Desktop Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-md text-gray-600 dark:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-gray-700" />}
            </button>

            {/* Desktop Custom User Dropdown */}
            <SignedIn>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-blue-500"
                  aria-expanded={showUserDropdown}
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={user?.imageUrl || `https://ui-avatars.com/api/?name=${user?.firstName || user?.emailAddresses?.[0]?.emailAddress}&background=random`}
                    alt={user?.firstName || "User"}
                  />
                </button>
                {showUserDropdown && (
                  <div
                    className="origin-top-right absolute right-0 mt-3 w-56 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black dark:ring-gray-700 ring-opacity-5 focus:outline-none z-50"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {user?.fullName || user?.firstName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user?.primaryEmailAddress?.emailAddress}
                      </p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => { handleLinkClick('/profile'); setShowUserDropdown(false); }}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                      role="menuitem"
                    >
                      <User className="mr-2 h-4 w-4" /> Profile
                    </Link>
                    <Link
                      to="/favourite"
                      onClick={() => { handleLinkClick('/favourite'); setShowUserDropdown(false); }}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                      role="menuitem"
                    >
                      <Star className="mr-2 h-4 w-4" /> Favourites
                    </Link>
                    <button
                      onClick={handleClerkLogout}
                      className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                      role="menuitem"
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            </SignedIn>
            <SignedOut>
             <button
                onClick={() => navigate("/sign-in")}
                className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 text-sm font-medium transition-colors" 
              >
                Login
              </button>
            </SignedOut>
          </div>

          {/* Mobile Menu Toggle Buttons */}
          <div className="md:hidden flex items-center">
             <button 
                onClick={toggleDarkMode} 
                className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500"/> : <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300"/> }
             </button>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="ml-2 p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div> {/* Closes <div className="flex justify-between items-center h-16"> */}

        {/* Mobile Menu Content Panel */}
        <div
          id="mobile-menu"
          className={`md:hidden bg-white dark:bg-gray-900 absolute top-full left-0 right-0 shadow-xl rounded-b-lg overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[calc(100vh-4rem)] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="max-h-[calc(100vh-4rem-1px)] overflow-y-auto pb-8">
            {/* Nav Links */}
            <div className="px-2 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`flex items-center px-3 py-2.5 rounded-md text-base font-medium transition-colors duration-150 ${
                    activeLink === link.path
                      ? 'bg-gray-100 text-black dark:bg-gray-700 dark:text-white font-medium' 
                      : 'text-black dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700' 
                  }`}
                >
                  {link.icon} 
                  <span>{link.name}</span>
                  {link.name === "Favourites" && isSignedIn && favoritesCount > 0 && (
                    <span className="ml-auto bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {favoritesCount}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* User Section */}
            <div className="border-t border-gray-200 dark:border-gray-700">
              <SignedIn>
                <div className="py-3 px-2 space-y-1">
                  <div className="flex items-center space-x-3 mb-2 px-1.5 py-1">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={user?.imageUrl || `https://ui-avatars.com/api/?name=${user?.firstName || user?.emailAddresses?.[0]?.emailAddress}&background=random`}
                      alt={user?.firstName || "User"}
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                        {user?.fullName || user?.firstName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user?.primaryEmailAddress?.emailAddress}
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => handleLinkClick('/profile')}
                    className="flex items-center w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-black dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                    role="menuitem"
                  >
                    <User className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" /> Profile
                  </Link>
                  <Link
                    to="/favourite"
                    onClick={() => handleLinkClick('/favourite')}
                    className="flex items-center w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-black dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                    role="menuitem"
                  >
                    <Star className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" /> Favourites
                    {isSignedIn && favoritesCount > 0 && (
                        <span className="ml-auto bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {favoritesCount}
                        </span>
                    )}
                  </Link>
                  <button
                    onClick={handleClerkLogout}
                    className="flex items-center w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-700/10"
                    role="menuitem"
                  >
                    <LogOut className="w-5 h-5 mr-3" /> Logout
                  </button>
                </div>
              </SignedIn>
              <SignedOut>
                <div className="py-3 px-4">
                  <button
                    onClick={() => { setIsOpen(false); navigate("/sign-in"); }}
                    className="w-full flex items-center justify-center px-4 py-2.5 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 focus:ring-black"
                  >
                    Login
                  </button>
                </div>
              </SignedOut>
            </div>
          </div>
        </div>
      </div> {/* Closes <div className="max-w-screen-xl mx-auto ..."> */}
    </nav>
  );
};

export default Navbar;