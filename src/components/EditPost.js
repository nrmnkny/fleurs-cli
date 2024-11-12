// src/components/EditPost.js
import React, { useState, useEffect } from 'react';

function EditPost({ post, onSave }) {
  const [title, setTitle] = useState(post.Title || '');
  const [body, setBody] = useState(post.Body || '');
  const [imageURL, setImageURL] = useState(post.ImageURL || '');
  const [categoryId, setCategoryId] = useState(post.CategoryId || 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ Title: title, Body: body, ImageURL: imageURL, CategoryId: categoryId });
  };

  return (
    <form onSubmit={handleSubmit} className="edit-post-form">
      <h3>Edit Post</h3>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea value={body} onChange={(e) => setBody(e.target.value)} />
      <input type="text" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
      <select value={categoryId} onChange={(e) => setCategoryId(Number(e.target.value))}>
        <option value="1">Artbucks</option>
        <option value="2">Debate Pit</option>
        <option value="3">Fleurs du Mal</option>
      </select>
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default EditPost;
