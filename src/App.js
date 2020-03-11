import React, { useState } from 'react';
import './App.css';
import NavBar from './NavBar';
import Routes from './Routes';
import BlogContext from './BlogContext';
import { v4 as uuid } from 'uuid';

function App() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});

  const addPost = (formData) => {
    const newPost = { ...formData, id: uuid() };
    setPosts(oldPosts => [...oldPosts, newPost]);
    setComments(oldComments => ({
      ...oldComments,
      [newPost.id]: []
    }))
  }

  const deletePost = (postId) => {
    setPosts(oldPosts => oldPosts.filter(post => post.id !== postId));
  }

  const editPost = (id, formData) => {
    const updatedPost = { id, ...formData };
    setPosts(oldPosts => oldPosts.map(post => (
      post.id === id ? updatedPost : post
    )));
  }

  const addComment = (postId, text) => {
    const newComment = {text, id: uuid()};
    setComments(oldComments => ({
      ...oldComments,
      [postId]: [...oldComments[postId], newComment]
    }));
  }

  const deleteComment = (commentId, postId) => {
    setComments(oldComments => ({
      ...oldComments,
      [postId]: oldComments[postId].filter(comment => comment.id !== commentId)
    }))
  }

  return (
    <BlogContext.Provider value={{ 
      posts,
      comments, 
      addPost, 
      deletePost, 
      editPost, 
      addComment, 
      deleteComment }} >
      <div className="App">
        <NavBar />
        <Routes />
      </div>
    </BlogContext.Provider>
  );
}

export default App;
