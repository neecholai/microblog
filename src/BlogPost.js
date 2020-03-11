import React, { useContext, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import BlogContext from './BlogContext';
import NotFound from './NotFound'
import BlogForm from './BlogForm';
import Comments from './Comments';

function BlogPost() {
  const history = useHistory();
  const [showEditForm, setShowEditForm] = useState(false);
  const { postId } = useParams()
  const { posts, deletePost } = useContext(BlogContext);

  const post = posts.find(post => (post.id === postId));
  if (!post) return <NotFound />;

  const { title, description, body } = post;

  const handleDelete = () => {
    deletePost(postId)
    history.push('/');
  };

  return (
    showEditForm ?

      <BlogForm showEditForm={setShowEditForm} post={post} /> :

      <div>
        <h2>{title}</h2>
        <i onClick={() => setShowEditForm(true)} className="fas fa-edit"></i>
        <i onClick={handleDelete} className="fas fa-times"></i>
        <p><i>{description}</i></p>
        <p>{body}</p>
        <hr />
        <Comments postId={post.id}/>
      </div>
  );
}

export default BlogPost;