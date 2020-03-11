import React from 'react';
import { Link } from 'react-router-dom';

function BlogCard({ id, title, description }) {

  return (
    <div>
      <Link exact to={`/${id}`}>{title}</Link>
      <p>{description}</p>
    </div>
  )
}

export default BlogCard;