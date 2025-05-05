import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-white">
      <h1 className="text-6xl font-bold text-black mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-black mb-2">Page Not Found</h2>
      <p className="text-gray-800 mb-6">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
