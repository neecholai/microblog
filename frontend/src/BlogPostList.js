import React from 'react';
import BlogPostCard from './BlogPostCard';
import { useSelector } from 'react-redux';


function BlogPostList() {
  const titles = useSelector(st => st.titles);

  const blogPostListJSX = titles.map(title => (
    <BlogPostCard
      key={title.id}
      id={title.id}
      title={title.title}
      description={title.description} />
  ));

  return (
    <div>
      {blogPostListJSX}
    </div>
  )
}

export default BlogPostList;