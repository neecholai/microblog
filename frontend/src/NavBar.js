import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import { Navbar } from 'react-bootstrap'

function NavBar () {

  return (
    <Navbar bg="dark" className="NavBar">
      <NavLink exact to="/">MicroBlog</NavLink>
      <NavLink exact to="/posts/new">Add a new post</NavLink>
    </Navbar>
  );
}

export default NavBar;