import React from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import './Comments.css'

function Comments({ postId, comments }) {
  // const comments = useSelector(st => st.posts[postId].comments);

  const commentsListJSX = comments.map(
    comment => <Comment key={comment.id} comment={comment} postId={postId}/>
  );

  return (
    <div className="Comments">
      <h2>Comments</h2>
      <hr />
      {commentsListJSX}
      <CommentForm postId={postId}/>
    </div>
  )
}

export default Comments;