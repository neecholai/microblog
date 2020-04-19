import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { voteForPost } from '../redux/actions';
import './BlogPostCard.css';
import { Card } from 'react-bootstrap';

function BlogPostCard({ id, title, description, votes }) {
  const dispatch = useDispatch();

  const handleVote = (direction) => {
    dispatch(voteForPost(id, direction));
  };

  return (
    <Card border="secondary" className="m-3 BlogPostCard col-xs-8 col-sm-6 col-md-4">
      <Card.Body className="BlogPostCard-body">
        <Card.Title as={Link} to={`/posts/${id}`} className="BlogPostCard-title">
          {title}
        </Card.Title>
        <Card.Text className="BlogPostCard-description">{description}</Card.Text>
        <Card.Text className="BlogPostCard-voteWrapper">
          <span className="px-4 BlogPostCard-votes">{votes}</span>
          <i onClick={() => handleVote('up')} className="px-1 fas fa-thumbs-up"></i>
          <i onClick={() => handleVote('down')} className="px-1 fas fa-thumbs-down"></i>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default BlogPostCard;
