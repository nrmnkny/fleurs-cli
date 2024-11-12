// src/components/CreatePost.js
import React, { useState } from 'react';

function CreatePost({ onSave }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [categoryId, setCategoryId] = useState(1); // Default category ID

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ Title: title, Body: body, ImageURL: imageURL, CategoryId: categoryId });
  };

  return (
    <form onSubmit={handleSubmit} className="create-post-form">
      <h3>Create New Post</h3>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} />
      <input type="text" placeholder="Image URL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
      <select value={categoryId} onChange={(e) => setCategoryId(Number(e.target.value))}>
        <option value="1">Artbucks</option>
        <option value="2">Debate Pit</option>
        <option value="3">Fleurs du Mal</option>
      </select>
      <button type="submit">Save Post</button>
    </form>
  );
}

export default CreatePost;
