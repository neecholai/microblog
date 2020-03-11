import React, { useState } from 'react';
import './App.css';
import NavBar from './NavBar';
import Routes from './Routes';
import BlogContext from './BlogContext';
import { v4 as uuid } from 'uuid';

function App() {
  const [blogs, setBlogs] = useState([]);

  const addBlog = (formData) => {
    const newBlog = {...formData, id: uuid()};
    setBlogs(oldBlogs => [...oldBlogs, newBlog]);
  }

  const deleteBlog = (blogId) => {
    setBlogs(oldBlogs => oldBlogs.filter(blog => blog.id !== blogId));
  }

  const editBlog = (blogId, formData) => {
    const updatedBlog = {...formData, id: blogId};
    setBlogs(oldBlogs => oldBlogs.map(blog => (
      blog.id === blogId ? updatedBlog : blog
    )));
  }

  return (
    <BlogContext.Provider value={{blogs, addBlog, deleteBlog, editBlog}} >
      <div className="App">
        <NavBar />
        <Routes />
      </div>
    </BlogContext.Provider>
  );
}

export default App;
