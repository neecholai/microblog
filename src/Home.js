import React from 'react';
import BlogPostList from './BlogPostList';

function Home() {
  return (
    <div>
      <h2>Welcome to <b>Microblog</b>, the best blog on the web</h2>
      <BlogPostList />
    </div>
  )
}

export default Home;