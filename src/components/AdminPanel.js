import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function AdminPanel({ onLogout, posts, fetchPosts }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editPostId, setEditPostId] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    if (!title || !body || !categoryId) {
      alert("Title, body, and category are required.");
      return;
    }

    const newPost = {
      Title: title,
      Body: body,
      ImageURL: imageUrl,
      CategoryId: parseInt(categoryId)
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newPost)
      });
      if (response.ok) {
        alert('Post created successfully');
        fetchPosts();
        resetForm();
      } else {
        alert('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleUpdatePost = (post) => {
    setTitle(post.Title);
    setBody(post.Body);
    setImageUrl(post.ImageURL);
    setCategoryId(post.CategoryId.toString());
    setEditMode(true);
    setEditPostId(post.PostId);
  };

  const handleSaveUpdatePost = async () => {
    if (!title || !body || !categoryId) {
      alert("Title, body, and category are required.");
      return;
    }

    const updatedPost = {
      Title: title,
      Body: body,
      ImageURL: imageUrl,
      CategoryId: parseInt(categoryId)
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/posts/${editPostId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updatedPost)
      });
      if (response.ok) {
        alert('Post updated successfully');
        fetchPosts();
        resetForm();
      } else {
        alert('Failed to update post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        alert('Post deleted successfully');
        fetchPosts();
      } else {
        alert('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const resetForm = () => {
    setTitle('');
    setBody('');
    setImageUrl('');
    setCategoryId('');
    setEditMode(false);
    setEditPostId(null);
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <button onClick={onLogout} className="logout-button">Logout</button>

      <div className="admin-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ReactQuill
          value={body}
          onChange={setBody}
          placeholder="Enter the content here..."
          theme="snow"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="">Select Category</option>
          <option value="1">Artbucks</option>
          <option value="2">Debate Pit</option>
          <option value="3">Fleurs du Mal</option>
        </select>
        <button onClick={editMode ? handleSaveUpdatePost : handleCreatePost}>
          {editMode ? 'Save Changes' : 'Create Post'}
        </button>
        {editMode && <button onClick={resetForm}>Cancel Edit</button>}
      </div>

      <div className="table-container">
        <table className="posts-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Body</th>
              <th>Image URL</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.PostId}>
                <td className="post-title">{post.Title}</td>
                <td>{post.Body.slice(0, 50)}...</td>
                <td>{post.ImageURL}</td>
                <td>{post.CategoryId}</td>
                <td className="post-date">{new Date(post.PostDate).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleUpdatePost(post)}>Edit</button>
                  <button onClick={() => handleDeletePost(post.PostId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanel;
