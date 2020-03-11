import React, { useContext } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import BlogContext from './BlogContext';

function Comments({ postId }) {
  const { comments } = useContext(BlogContext);

  const commentsListJSX = comments[postId].map(
    comment => <Comment key={comment.id} comment={comment} postId={postId}/>
  );

  return (
    <div>
      <h2>Comments</h2>
      {commentsListJSX}
      <CommentForm postId={postId}/>
    </div>
  )
}

export default Comments;