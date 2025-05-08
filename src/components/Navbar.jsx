import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Moon, Sun, Home, MapPin, Heart } from "lucide-react";
// UserContext and axios are no longer needed for auth here
import { AppContext } from "../Context/AppContext";
import { useUser, useAuth, UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      return true;
    }
    return false;
  });
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(window.location.pathname);
  const [scrolled, setScrolled] = useState(false);
  // const [showDropdown, setShowDropdown] = useState(false); // This was for your custom dropdown, UserButton handles its own.

  // --- CLERK INTEGRATION ---
  const { isSignedIn, user, isLoaded } = useUser();
  const { signOut } = useAuth();
  // --- END CLERK INTEGRATION ---

  const { favoritesCount /*, API_BASE_URL */ } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    const updateActiveLink = () => setActiveLink(window.location.pathname);
    window.addEventListener('popstate', updateActiveLink);
    updateActiveLink();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('popstate', updateActiveLink);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <Home className="w-5 h-5 mr-2" /> },
    { name: "Countries", path: "/country", icon: <MapPin className="w-5 h-5 mr-2" /> },
    { name: "Favourites", path: "/favourite", icon: <Heart className="w-5 h-5 mr-2" /> },
  ];

  // --- CLERK INTEGRATION: Logout Handler ---
  const handleClerkLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully!");
      navigate("/");
      setIsOpen(false);
    } catch (error) {
      console.error("Clerk logout failed:", error);
      toast.error("Logout failed.");
    }
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
          <div className="flex-shrink-0">
          
            <Link to="/" onClick={() => handleLinkClick('/')} className="group flex items-center">
              <span className="text-2xl font-bold text-gray-800 dark:text-gray-200 transform transition-transform duration-300 group-hover:scale-105">
                🌐 Globalize
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`relative flex items-center text-lg font-medium px-4 py-1 transition-all duration-300 border-b-2 ${
                  activeLink === link.path
                    ? "border-blue-600 text-blue-600 font-semibold" 
                    : "border-transparent text-gray-700 dark:text-gray-300 hover:text-gray-500 hover:border-gray-300 dark:hover:text-gray-400 dark:hover:border-gray-600" // Your inactive style
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
             
                {link.name === "Favourites" && isSignedIn && favoritesCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favoritesCount}
                  </div>
                )}
              </Link>
            ))}

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900" // Your dark mode button style
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500 transition-transform duration-300 hover:rotate-90" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700 transition-transform duration-300 hover:-rotate-90" />
              )}
            </button>

            {/* --- CLERK INTEGRATION: Auth UI --- */}
            <SignedIn>
              {/* UserButton handles its own styling for avatar, dropdown, etc. */}
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut >
              <button
                onClick={() => navigate("/sign-in")}
                className="bg-gray-800 text-white px-5 py-2 rounded-md hover:bg-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400" // Your original login button style
              >
                Login
              </button>
            </SignedOut>
            {/* --- END CLERK INTEGRATION --- */}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleDarkMode}
              className="p-2 mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300" // Your mobile dark mode style
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
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500" // Your mobile menu toggle style
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen
              ? "max-h-96 opacity-100 visible py-2" // Increased max-h, added py-2 for a bit of padding if content is dense
              : "max-h-0 opacity-0 invisible"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 rounded-b-lg shadow-md"> {/* Your mobile menu container style */}
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`relative flex items-center text-lg font-medium px-4 py-1 transition-all duration-300 border-b-2 ${ // Your mobile nav link style
                  activeLink === link.path
                    ? "border-blue-600 text-blue-600 font-semibold"
                    : "border-transparent text-gray-700 dark:text-gray-300 hover:text-gray-500 hover:border-gray-300 dark:hover:text-gray-400 dark:hover:border-gray-600"
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
                {link.name === "Favourites" && isSignedIn && favoritesCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favoritesCount}
                  </div>
                )}
              </Link>
            ))}

            {/* --- CLERK INTEGRATION: Mobile Auth UI --- */}
            {/* This part needs to adapt to your existing mobile menu structure if it was different */}
            <div className="border-t border-gray-200 dark:border-gray-700 my-2 pt-2"> {/* Added a separator */}
              <SignedIn>
                {/* You can choose how to display UserButton and Profile link in mobile */}
                <div className="px-4 py-2 flex items-center space-x-3"> {/* Wrapper for UserButton and text */}
                   <UserButton afterSignOutUrl="/" />
                   <Link
                     to="/profile"
                     onClick={() => setIsOpen(false)}
                     className="text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white truncate"
                   >
                     Profile ({user?.firstName || user?.emailAddresses[0]?.emailAddress.split('@')[0]})
                   </Link>
                </div>
                <div className="py-2 px-4"> {/* Your original wrapper for mobile logout */}
                    <button
                    onClick={handleClerkLogout}
                    className="w-full text-left text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md px-0 py-1" // Adjusted padding to better fit
                    >
                    Logout
                    </button>
                </div>
              </SignedIn>
              <SignedOut>
                <div className="py-2 px-4"> {/* Your original wrapper for mobile login */}
                    <button
                    onClick={() => { setIsOpen(false); navigate("/sign-in"); }}
                    className="w-full bg-gray-800 text-white px-5 py-2 rounded-md hover:bg-gray-900 transition-colors duration-200" // Your original mobile login button style
                    >
                    Login
                    </button>
                </div>
              </SignedOut>
            </div>
            {/* --- END CLERK INTEGRATION --- */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;