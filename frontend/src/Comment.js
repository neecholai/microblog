import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment } from './actions';

function Comment({ comment, postId }) {
  const dispatch = useDispatch();
  const { id, text } = comment;

  return (
    <div>
      <i onClick={() => dispatch(deleteComment(id, postId))} className="fas fa-times"></i>
      <span>{text}</span>
    </div>
  )
}

export default Comment;