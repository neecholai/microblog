import React, { useContext } from 'react';
import BlogContext from './BlogContext';
import BlogPostCard from './BlogPostCard';
// import { v4 as uuid } from 'uuid';


function BlogPostList() {
const { posts } = useContext(BlogContext);

const BlogPostListJSX = posts.map(post => (
  <BlogPostCard 
    key={post.id} 
    id={post.id}
    title={post.title} 
    description={post.description} />
));

  return (
    <div>
      {BlogPostListJSX}
    </div>
  )
}

export default BlogPostList;