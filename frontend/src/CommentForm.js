import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from './actions';

function CommentForm ({ postId }) {
  const INITIAL_STATE = {text: ''};
  const [formData, setFormData] = useState(INITIAL_STATE);
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    const { value } = evt.target;
    setFormData({text: value});
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (formData.text) {
      dispatch(addComment(postId, formData.text))
      setFormData(INITIAL_STATE);
    }
  }

  return (
      <form onSubmit={handleSubmit}>
        <input
          placeholder="New Comment"
          value={formData.text}
          onChange={handleChange}
        />
        <button disabled={!formData.text}>Add</button>
      </form>
  )
}

export default CommentForm;