import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-screen-xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Brand */}
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              🌐 Globalize
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Explore countries around the globe.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link to="/country" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Countries
            </Link>
            <Link to="/favourite" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Favourites
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <FaGithub className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <FaGlobe className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Globalize. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
