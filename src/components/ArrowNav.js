import React from 'react';

function ArrowNav({ onNext, onPrev }) {
    return (
      <div className="nav-container flex justify-between mt-4">
        <button onClick={onPrev} className="arrow-button" aria-label="Previous Page">
          &lt;
        </button>
        <button onClick={onNext} className="arrow-button" aria-label="Next Page">
          &gt;
        </button>
      </div>
    );
  }
  

export default ArrowNav;
