import React from 'react';
import BlogPostCard from './BlogPostCard';
import { useSelector } from 'react-redux';


function BlogPostList() {
  const posts = useSelector(st => st.posts);

  const blogPostListJSX = Object.entries(posts).map(([id, post]) => (
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