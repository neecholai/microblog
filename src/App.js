import React, { useState } from 'react';
import './App.css';
import NavBar from './NavBar';
import Routes from './Routes';
import BlogContext from './BlogContext';
import { v4 as uuid } from 'uuid';

function App() {
  const [posts, setPosts] = useState([]);

  const addPost = (formData) => {
    const newPost = { ...formData, id: uuid() };
    setPosts(oldPosts => [...oldPosts, newPost]);
  }

  const deletePost = (postId) => {
    setPosts(oldPosts => oldPosts.filter(post => post.id !== postId));
  }

  const editPost = (postId, formData) => {
    const updatedPost = { ...formData, id: postId };
    setPosts(oldPosts => oldPosts.map(post => (
      post.id === postId ? updatedPost : post
    )));
  }

  return (
    <BlogContext.Provider value={{ posts, addPost, deletePost, editPost }} >
      <div className="App">
        <NavBar />
        <Routes />
      </div>
    </BlogContext.Provider>
  );
}

export default App;
