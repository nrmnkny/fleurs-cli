// src/components/NewPostForm.js
import React, { useState } from 'react';

function NewPostForm({ onPostCreated }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({
          Title: title,
          Body: body,
          ImageURL: imageURL,
          CategoryId: parseInt(categoryId),
        }),
      });
      if (response.ok) {
        const newPost = await response.json();
        onPostCreated(newPost); 
        setTitle('');
        setBody('');
        setImageURL('');
        setCategoryId('');
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="new-post-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body"
        required
      />
      <input
        type="text"
        value={imageURL}
        onChange={(e) => setImageURL(e.target.value)}
        placeholder="Image URL"
      />
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        required
      >
        <option value="">Select Category</option>
        <option value="1">Infinity Mind Script</option>
        <option value="2">Personal Journal</option>
        <option value="3">Interests & Insights</option>
      </select>
      <button type="submit">Create Post</button>
    </form>
  );
}

export default NewPostForm;
