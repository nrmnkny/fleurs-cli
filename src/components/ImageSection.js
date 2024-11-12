import React from 'react';

function ImageSection({ currentPage }) {
  return (
    currentPage === 0 && (
      <div className="mb-4 max-w-full sm:max-w-md lg:max-w-lg mx-auto">
        <img
          src="https://res.cloudinary.com/dzbghf4hg/image/upload/v1729629340/artists/ee9pwf7plo54ezm8eifa.jpg"
          alt="White Roses"
          className="w-full h-auto object-cover shadow-lg rounded-md"
        />
        <p className="text-center text-xs text-gray-600 mt-2">Fig 1. White Roses</p>
      </div>
    )
  );
}

export default ImageSection;
