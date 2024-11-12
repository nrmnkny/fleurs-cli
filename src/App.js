import React, { useState, useEffect, useCallback } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import BlogPage from './components/BlogPage';
import PostDetail from './components/PostDetail';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

function App() {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/posts`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleViewPost = (postId) => {
    const selectedPost = posts.find(post => post.PostId === postId);
    setCurrentPost(selectedPost);
    navigate(`/post/${postId}`);
  };

  const handleBackToBlog = () => {
    setCurrentPost(null);
    navigate('/');
  };

  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <div className="app-container">
      <TransitionGroup>
        <CSSTransition key={currentPost ? currentPost.PostId : 'blog'} timeout={300} classNames="slide">
          <Routes>
            <Route
              path="/"
              element={<BlogPage posts={posts} onViewPost={handleViewPost} />}
            />
            <Route
              path="/post/:id"
              element={
                currentPost ? (
                  <PostDetail
                    headerText={currentPost.Title}
                    imageSrc={currentPost.ImageURL}
                    textContent={currentPost.Body}
                    onBack={handleBackToBlog}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/admin"
              element={
                isAuthenticated ? (
                  <AdminPanel onLogout={handleLogout} posts={posts} fetchPosts={fetchPosts} />
                ) : (
                  <Login onLoginSuccess={handleLoginSuccess} />
                )
              }
            />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </div>
  );
}

export default App;
