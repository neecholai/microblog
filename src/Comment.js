import React, { useContext } from 'react';
import BlogContext from './BlogContext';

function Comment ({ comment, postId }) {
  const { deleteComment } = useContext(BlogContext);
  const { id, text } = comment;

  return (
    <div>
      <i onClick={() => deleteComment(id, postId)} className="fas fa-times"></i>
      <span>{text}</span>
    </div>
  )
}

export default Comment;