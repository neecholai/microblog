import React, { useContext } from 'react';
import BlogContext from './BlogContext';
import BlogCard from './BlogCard';
// import { v4 as uuid } from 'uuid';


function BlogList() {
const { blogs, setBlogs } = useContext(BlogContext);

const BlogListJSX = blogs.map(blog => (
  <BlogCard 
    key={blog.id} 
    id={blog.id}
    title={blog.title} 
    description={blog.description} />
));

  return (
    <div>
      {BlogListJSX}
    </div>
  )
}

export default BlogList;