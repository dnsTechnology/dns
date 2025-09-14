// src/pages/NotFound.tsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f3f4f6] text-center p-4">
      {/* Big "Oops!" text with galaxy-like gradient */}
      <h1 className="text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[4vw] font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent">
        Oops!
      </h1>

      {/* Error code and message */}
      <h2 className="mt-4 text-xl sm:text-2xl font-semibold text-gray-800">
        404 - PAGE NOT FOUND
      </h2>
      <p className="mt-2 text-gray-600 max-w-md text-sm sm:text-base">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-full shadow-md hover:opacity-90 transition-all duration-300"
      >
        GO TO HOMEPAGE
      </Link>
    </div>
  );
};

export default NotFound;
