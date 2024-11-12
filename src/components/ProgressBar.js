import React from 'react';

function ProgressBar({ currentPage, totalPages }) {
    const progress = (currentPage / totalPages) * 100;
  
    return (
      <div className="mt-4">
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="text-xs mt-1 text-gray-700">
          Page {currentPage} of {totalPages}
        </div>
      </div>
    );
  }
  
  

export default ProgressBar;
