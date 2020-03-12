import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import NotFound from './NotFound'
import BlogForm from './BlogForm';
import Comments from './Comments';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost } from './actions';
import MicroblogApi from './MicroblogApi';


function BlogPost() {
  const history = useHistory();
  const [showEditForm, setShowEditForm] = useState(false);
  const { postId } = useParams()
  const [post, setPost] = useState(useSelector(st => st.posts[postId]));  //treat as isloading
  const dispatch = useDispatch();


  useEffect(() => {
    const getPost = async (postId) => {
      if(!post) {
        setPost(await MicroblogApi.getPost(postId));
        // dispatch(addPost(post));     handle later
      }
      if (!post) return <NotFound />;
    };
    getPost(postId);
  }, []);


  const handleDelete = () => {
    dispatch(deletePost(postId))
    history.push('/');
  };

  return (
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