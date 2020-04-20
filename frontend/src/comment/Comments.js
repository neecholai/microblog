import React from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';

function Comments({ postId, comments }) {

  const commentsListJSX = comments.map(
    comment => <Comment key={comment.id} comment={comment} postId={postId}/>
  );

  return (
    <div className="Comments col-xs-12 col-sm-10 col-md-6">
      <h2>Comments</h2>
      <hr />
      {commentsListJSX}
      <CommentForm postId={postId}/>
    </div>
  )
}

export default Comments;