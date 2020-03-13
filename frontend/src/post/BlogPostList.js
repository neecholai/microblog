import React from 'react';
import BlogPostCard from './BlogPostCard';
import { useSelector } from 'react-redux';
import './BlogPostList.css'


function BlogPostList() {
  const titles = useSelector(st => st.titles);

  const sortedTitles = titles.sort((a, b) => b.votes - a.votes)

  const blogPostListJSX = sortedTitles.map(title => (
    <BlogPostCard
      key={title.id}
      id={title.id}
      title={title.title}
      description={title.description}
      votes={title.votes}
      />
  ));

  return (
    <div className="BlogPostList">
      {blogPostListJSX}
    </div>
  )
}

export default BlogPostList;