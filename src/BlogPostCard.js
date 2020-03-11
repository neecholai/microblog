import React from 'react';
import { Link } from 'react-router-dom';

function BlogPostCard({ id, title, description }) {

  return (
    <div>
      <Link to={`/posts/${id}`}>{title}</Link>
      <p>{description}</p>
    </div>
  )
}

export default BlogPostCard;