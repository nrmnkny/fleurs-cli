import React from 'react';
import { useNavigate } from 'react-router-dom';

function PostDetail({ headerText, imageSrc, textContent }) {
  const navigate = useNavigate();

  return (
    <div className="post-detail-container">
      <button onClick={() => navigate('/')} className="back-button">Back to All Posts</button>
      <h1 className="post-title">{headerText}</h1>
      {imageSrc && <img src={imageSrc} alt={headerText} className="post-image" />}
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: textContent }}
      ></div>
    </div>
  );
}

export default PostDetail;
