import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import NotFound from './NotFound'
import BlogForm from './BlogForm';
import Comments from './Comments';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost } from './actions';


function BlogPost() {
  const history = useHistory();
  const [showEditForm, setShowEditForm] = useState(false);
  const { postId } = useParams()
  const dispatch = useDispatch();

  const post = useSelector(st => st.posts[postId]);
  if (!post) return <NotFound />;
  const { title, description, body } = post;

  const handleDelete = () => {
    dispatch(deletePost(postId))
    history.push('/');
  };

  return (
    showEditForm ?
      <BlogForm showEditForm={setShowEditForm} post={post} postId={postId} />
      :
      <div>
        <h2>{title}</h2>
        <i onClick={() => setShowEditForm(true)} className="fas fa-edit"></i>
        <i onClick={handleDelete} className="fas fa-times"></i>
        <p><i>{description}</i></p>
        <p>{body}</p>
        <hr />
        <Comments postId={postId} />
      </div>
  );
}

export default BlogPost;