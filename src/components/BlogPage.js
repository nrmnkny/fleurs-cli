import React, { useState } from 'react';
import Header from './Header';

function BlogPage({ posts, onViewPost }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const stripHtmlTags = (html) => {
    return html.replace(/<\/?[^>]+(>|$)/g, "");
  };

  const filteredPosts = posts.filter(post =>
    (filter === 'All' || post.CategoryId === parseInt(filter)) &&
    post.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="blog-page">
      <Header text="infinity mind script" />
      <div className="search-bar mb-4">
        <input
          type="text"
          placeholder="Search posts..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="All">All Categories</option>
          <option value="1">Infinity Mind Script</option>
        <option value="2">Personal Journal</option>
        <option value="3">Interests & Insights</option>
        </select>
      </div>

      <div className="blog-posts">
        {filteredPosts.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredPosts.map((post) => (
              <li
                key={post.PostId}
                onClick={() => onViewPost(post.PostId)}
                className="p-4 cursor-pointer hover:bg-gray-100 transition"
              >
                <h3 className="post-title">{post.Title}</h3>
                <p className="post-date">{new Date(post.PostDate).toLocaleDateString()}</p>
                {/* Use stripHtmlTags to display plain text without HTML tags */}
                <p className="text-gray-700">{stripHtmlTags(post.Body).slice(0, 150)}...</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
}

export default BlogPage;
