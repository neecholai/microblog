import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addPost, editPost } from './actions';
import { useDispatch } from 'react-redux';


function BlogForm({ showEditForm, post, postId }) {
  const INITIAL_STATE = post ?
    {
      title: post.title,
      description: post.description,
      body: post.body
    }
    :
    {
      title: '',
      description: '',
      body: ''
    };

  const history = useHistory();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(oldData => ({
      ...oldData,
      [name]: value
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isValid) {
      if (post) {
        dispatch(editPost(postId, formData));
        showEditForm(false);
      } else {
        dispatch(addPost(formData));
        history.push('/');
      }
    }
  }

  const isValid = Object.values(formData).every(val => val);

  return (
    <div>
      <h2>New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Title: </label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <label htmlFor="description">Description: </label>
        <input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label htmlFor="body">Body: </label>
        <textarea
          id="body"
          name="body"
          value={formData.body}
          onChange={handleChange}
        />
        <button disabled={!isValid}>Save</button>
        <button onClick={() => history.push('/')}>Cancel</button>
      </form>
    </div >
  )
}

export default BlogForm;