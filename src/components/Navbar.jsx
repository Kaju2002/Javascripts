// Navbar.jsx
import React, { useState, useEffect, useContext, useRef } from "react"; // Added useRef
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Moon, Sun, Home, MapPin, Heart, ChevronDown, LogOut, User, Star } from "lucide-react"; // Added icons for dropdown
import { AppContext } from "../Context/AppContext";
import { useUser, useAuth, SignedIn, SignedOut } from "@clerk/clerk-react"; // UserButton is removed
import { toast } from 'react-toastify';

const Navbar = () => {
  // ... (isDarkMode, isOpen, activeLink, scrolled states remain the same) ...
  const [isDarkMode, setIsDarkMode] = useState(() => /* ... */ true);
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(window.location.pathname);
  const [scrolled, setScrolled] = useState(false);
  // --- NEW STATE FOR CUSTOM DROPDOWN ---
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef(null); // For detecting clicks outside

  const { isSignedIn, user, isLoaded } = useUser(); // user object has image, name etc.
  const { signOut } = useAuth();
  const { favoritesCount } = useContext(AppContext);
  const navigate = useNavigate();

  // ... (useEffect for dark mode, scroll, activeLink remains the same) ...
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark'); localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark'); localStorage.theme = 'light';
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    const updateActiveLink = () => setActiveLink(window.location.pathname);
    window.addEventListener('popstate', updateActiveLink);
    updateActiveLink();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('popstate', updateActiveLink);
    };
  }, []);

  // --- EFFECT TO CLOSE DROPDOWN ON OUTSIDE CLICK ---
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
    { name: "Home", path: "/", icon: <Home className="w-5 h-5 mr-2" /> },
    { name: "Countries", path: "/country", icon: <MapPin className="w-5 h-5 mr-2" /> },
    // Conditionally add Favourites link to navLinks if you prefer
    // Or always show it and let the Favourites page handle the prompt
    { name: "Favourites", path: "/favourite", icon: <Heart className="w-5 h-5 mr-2" /> },
  ];

  const handleClerkLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully!");
      setShowUserDropdown(false); // Close dropdown
      setIsOpen(false); // Close mobile menu if open
      navigate("/");
      setActiveLink("/");
    } catch (error) {
      console.error("Clerk logout failed:", error);
      toast.error("Logout failed.");
    }
  };
  
  return (
    <nav /* ... your nav classes ... */ >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ... Logo ... */}
          <div className="flex-shrink-0">
            <Link to="/" onClick={() => handleLinkClick('/')} className="group flex items-center">
              <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">🌐 Globalize</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              // ... your nav link rendering ...
              <Link
                key={link.path} to={link.path} onClick={() => handleLinkClick(link.path)}
                className={`relative flex items-center text-lg font-medium px-4 py-1 transition-all duration-300 border-b-2 ${
                  activeLink === link.path
                    ? "border-blue-600 text-blue-600 font-semibold" 
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

            {/* ... Dark Mode Toggle ... */}
            <button onClick={toggleDarkMode} /* ... */ >
              {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-700" />}
            </button>

            {/* --- CUSTOM USER DROPDOWN --- */}
            <SignedIn>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 dark:focus:ring-offset-gray-900 focus:ring-white"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={user?.imageUrl || `https://ui-avatars.com/api/?name=${user?.firstName || user?.emailAddresses?.[0]?.emailAddress}&background=random`}
                    alt={user?.firstName || "User"}
                  />
                   {/* Optional: Add a chevron icon */}
                   {/* <ChevronDown className={`ml-1 h-4 w-4 text-gray-600 dark:text-gray-400 transition-transform duration-200 ${showUserDropdown ? 'rotate-180' : ''}`} /> */}
                </button>
                {showUserDropdown && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black dark:ring-gray-700 ring-opacity-5 focus:outline-none z-50"
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
                      onClick={handleClerkLogout} // handleClerkLogout already closes dropdown
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
                className="bg-gray-800 text-white px-5 py-2 rounded-md hover:bg-gray-900"
              >
                Login
              </button>
            </SignedOut>
            {/* --- END CUSTOM USER DROPDOWN --- */}
          </div>

          {/* Mobile Menu Button & Mobile Menu */}
          <div className="md:hidden flex items-center">
             {/* ... your mobile dark mode toggle ... */}
             <button onClick={toggleDarkMode} /* ... */ > {isDarkMode ? <Sun /> : <Moon /> } </button>
            <button onClick={() => setIsOpen(!isOpen)} /* ... */ > {isOpen ? <X /> : <Menu />} </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        <div className={`md:hidden ... ${isOpen ? 'max-h-96 ...' : 'max-h-0 ...'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 ...">
            {navLinks.map((link) => ( /* ... mobile nav links ... */ <Link key={link.path} to={link.path} /* ... */ >{link.icon}<span>{link.name}</span></Link> ))}
            <div className="border-t ...">
              <SignedIn>
                {/* --- CUSTOM MOBILE USER INFO & ACTIONS --- */}
                <div className="px-4 py-3">
                  <div className="flex items-center space-x-3 mb-2">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={user?.imageUrl || `https://ui-avatars.com/api/?name=${user?.firstName || user?.emailAddresses?.[0]?.emailAddress}&background=random`}
                      alt={user?.firstName || "User"}
                    />
                    <div>
                      <p className="text-base font-medium text-gray-800 dark:text-white truncate">
                        {user?.fullName || user?.firstName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user?.primaryEmailAddress?.emailAddress}
                      </p>
                    </div>
                  </div>
                   <Link
                     to="/profile"
                     onClick={() => { handleLinkClick('/profile'); setIsOpen(false); }}
                     className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                   >
                     <User className="inline-block mr-2 h-5 w-5 -mt-1" /> Profile
                   </Link>
                   <Link
                     to="/favourite"
                     onClick={() => { handleLinkClick('/favourite'); setIsOpen(false); }}
                     className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                   >
                     <Star className="inline-block mr-2 h-5 w-5 -mt-1" /> Favourites
                   </Link>
                </div>
                <div className="py-2 px-4">
                    <button onClick={handleClerkLogout} className="w-full text-left text-red-600 ...">
                     <LogOut className="inline-block mr-2 h-5 w-5 -mt-1" /> Logout
                    </button>
                </div>
              </SignedIn>
              <SignedOut>
                <div className="py-2 px-4">
                    <button onClick={() => { setIsOpen(false); navigate("/sign-in"); }} className="w-full bg-gray-800 ...">
                    Login
                    </button>
                </div>
              </SignedOut>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;