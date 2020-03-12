import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import NotFound from './NotFound'
import BlogForm from './BlogForm';
import Comments from './Comments';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost, getPostFromApi } from './actions';


function BlogPost() {
  const history = useHistory();
  const [showEditForm, setShowEditForm] = useState(false);
  const [postNotFound, setPostNotFound] = useState(false);
  const { postId } = useParams()
  const [ranDispatch, setRanDispatch] = useState(false);
  let post = useSelector(st => st.posts[postId]);  //treat as isloading
  const dispatch = useDispatch();

  useEffect(() => {
    const runDispatch = async () => {
      await dispatch(getPostFromApi(postId));
      setRanDispatch(true);
    }

    if (!post && !ranDispatch) runDispatch();
    if (!post && ranDispatch) setPostNotFound(true);

  }, [ranDispatch, dispatch, post, postId]);


  const handleDelete = () => {
    dispatch(deletePost(postId))
    history.push('/');
  };

  return (
    postNotFound ?
      <NotFound />
      :
      !post ?
        <p>Loading...</p>
        :
        showEditForm ?
          <BlogForm showEditForm={setShowEditForm} post={post} postId={postId} />
          :
          <div>
            <h2>{post.title}</h2>
            <i onClick={() => setShowEditForm(true)} className="fas fa-edit"></i>
            <i onClick={handleDelete} className="fas fa-times"></i>
            <p><i>{post.description}</i></p>
            <p>{post.body}</p>
            <hr />
            <Comments postId={postId} comments={post.comments} />
          </div>
  );
}

export default BlogPost;