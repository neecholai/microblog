import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCommentFromApi } from '../redux/actions';
import './Comment.css'

function Comment({ comment, postId }) {
  const dispatch = useDispatch();
  const { id, text } = comment;

  return (
    <div className="py-1 Comment">
      <i onClick={() => dispatch(deleteCommentFromApi(postId, id))} className="p-1 text-danger fas fa-times"></i>
      <span>{text}</span>
    </div>
  )
}

export default Comment;