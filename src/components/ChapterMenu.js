import React from 'react';

function ChapterMenu({ chapters, onSelectChapter }) {
    return (
      <div className="fixed top-4 right-4">
        <select className="select" onChange={(e) => onSelectChapter(Number(e.target.value))}>
          {chapters.map((chapter, index) => (
            <option key={index} value={index}>
              {chapter.title}
            </option>
          ))}
        </select>
      </div>
    );
  }
  
  

export default ChapterMenu;
