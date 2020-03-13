import React from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';

function Comments({ postId, comments }) {
  // const comments = useSelector(st => st.posts[postId].comments);

  const commentsListJSX = comments.map(
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