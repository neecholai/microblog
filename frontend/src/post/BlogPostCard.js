import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { voteForPost } from '../redux/actions';
import './BlogPostCard.css';




function BlogPostCard({ id, title, description, votes }) {
  const dispatch = useDispatch();

  const handleVote = (direction) => {
    dispatch(voteForPost(id, direction));
  }

  return (
    <div className="BlogPostCard">
      <Link to={`/posts/${id}`} className="BLogPostCard-title">{title}</Link>
      <span className="BlogPostCard-description">{description}</span>
      <div className="BlogPostCard-voteWrapper">
        <span className="BlogPostCard-votes">{votes}</span>
        <i onClick={() => handleVote("up")} className="fas fa-thumbs-up"></i>
        <i onClick={() => handleVote("down")} className="fas fa-thumbs-down"></i>
      </div>
    </div>
  )
}

export default BlogPostCard;