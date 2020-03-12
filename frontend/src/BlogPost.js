import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import NotFound from './NotFound'
import BlogForm from './BlogForm';
import Comments from './Comments';
import { useSelector, useDispatch } from 'react-redux';
import { deletePostFromApi, getPostFromApi, voteForPost } from './actions';


function BlogPost() {
  const history = useHistory();
  const [showEditForm, setShowEditForm] = useState(false);
  const [postNotFound, setPostNotFound] = useState(false);
  const [ranDispatch, setRanDispatch] = useState(false);
  const { postId } = useParams()
  let post = useSelector(st => st.posts[postId]);
  const dispatch = useDispatch();

  useEffect(() => {
    const runDispatch = async () => {
      await dispatch(getPostFromApi(postId));
      setRanDispatch(true);
    }

    if (!post && !ranDispatch) runDispatch();
    if (!post && ranDispatch) setPostNotFound(true);

  }, [ranDispatch, dispatch, post, postId]);


  const handleDelete = async () => {
    await dispatch(deletePostFromApi(postId))
    history.push('/');
  };

  const handleVote = (direction) => {
    dispatch(voteForPost(postId, direction));
  }

  if (postNotFound) return <NotFound />;
  if (!post) return <p>Loading...</p>;

  return (
    showEditForm ?
      <BlogForm showEditForm={setShowEditForm} post={post} postId={postId} />
      :
      <div>
        <h2>{post.title}</h2>
        <i onClick={() => setShowEditForm(true)} className="fas fa-edit"></i>
        <i onClick={handleDelete} className="fas fa-times"></i>
        <i onClick={() => handleVote("up")} className="fas fa-thumbs-up"></i>
        <i onClick={() => handleVote("down")} className="fas fa-thumbs-down"></i>
        <p><i>{post.description}</i></p>
        <p>{post.body}</p>
        <p>Votes: {post.votes}</p>
        <hr />
        <Comments postId={postId} comments={post.comments} />
      </div>
  );
}

export default BlogPost;