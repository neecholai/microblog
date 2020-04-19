import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import NotFound from '../NotFound';
import BlogForm from './BlogForm';
import Comments from '../comment/Comments';
import { useSelector, useDispatch } from 'react-redux';
import { deletePostFromApi, getPostFromApi, voteForPost } from '../redux/actions';
import { Card } from 'react-bootstrap';
import './BlogPost.css';

function BlogPost() {
  const history = useHistory();
  const [showEditForm, setShowEditForm] = useState(false);
  const [postNotFound, setPostNotFound] = useState(false);
  const [ranDispatch, setRanDispatch] = useState(false);
  const { postId } = useParams();
  let post = useSelector((st) => st.posts[postId]);
  const dispatch = useDispatch();

  useEffect(() => {
    const runDispatch = async () => {
      await dispatch(getPostFromApi(postId));
      setRanDispatch(true);
    };

    if (!post && !ranDispatch) runDispatch();
    if (!post && ranDispatch) setPostNotFound(true);
  }, [ranDispatch, dispatch, post, postId]);

  const handleDelete = async () => {
    await dispatch(deletePostFromApi(postId));
    history.push('/');
  };

  const handleVote = (direction) => {
    dispatch(voteForPost(postId, direction));
  };

  if (postNotFound) return <NotFound />;
  if (!post) return <p>Loading...</p>;

  return showEditForm ? (
    <BlogForm showEditForm={setShowEditForm} post={post} postId={postId} />
  ) : (
    <div className="BlogPost">
      <Card className="BlogPost-card">
        <Card.Header as="h2">{post.title}</Card.Header>
        <Card.Body>
          <Card.Title className="BlogPost-title">
            <div className="BlogPost-description">
              {post.description}
            </div>
            <span className="BlogPost-icons">
              <i onClick={() => setShowEditForm(true)} className="text-primary fas fa-edit"></i>
              <i onClick={handleDelete} className="text-danger fas fa-times"></i>
            </span>
          </Card.Title>
          <Card.Text>{post.body}</Card.Text>
          <Card.Text className="BlogPost-voteWrapper">
            <span className="mx-4">Votes: {post.votes}</span>
            <i onClick={() => handleVote('up')} className="mx-1 fas fa-thumbs-up"></i>
            <i onClick={() => handleVote('down')} className="mx-1 fas fa-thumbs-down"></i>
          </Card.Text>
        </Card.Body>
      </Card>
      <Comments postId={postId} comments={post.comments} />
    </div>
  );
}

export default BlogPost;
