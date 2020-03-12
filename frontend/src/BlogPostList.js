import React from 'react';
import BlogPostCard from './BlogPostCard';
import { useSelector } from 'react-redux';


function BlogPostList() {
  const titles = useSelector(st => st.titles);

  const blogPostListJSX = Object.entries(titles).map(([id, post]) => (
    <BlogPostCard
      key={id}
      id={id}
      title={post.title}
      description={post.description} />
  ));

  return (
    <div>
      {blogPostListJSX}
    </div>
  )
}

export default BlogPostList;