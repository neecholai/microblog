import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { voteForPost } from '../redux/actions';




function BlogPostCard({ id, title, description, votes }) {
  const dispatch = useDispatch();

  const handleVote = (direction) => {
    dispatch(voteForPost(id, direction));
  }

  return (
    <div>
      <Link to={`/posts/${id}`}>{title}</Link>
      <p>{description}</p>
      <i onClick={() => handleVote("up")} className="fas fa-thumbs-up"></i>
      <span>Votes: {votes}</span>
      <i onClick={() => handleVote("down")} className="fas fa-thumbs-down"></i>
    </div>
  )
}

export default BlogPostCard;