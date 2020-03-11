import React, { useContext, useState } from 'react';
import BlogContext from './BlogContext';

function CommentForm ({ postId }) {
  const INITIAL_STATE = {text: ''};

  const { addComment } = useContext(BlogContext);
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (evt) => {
    const { value } = evt.target;
    setFormData({text: value});
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (formData.text) {
      addComment(postId, formData.text)
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