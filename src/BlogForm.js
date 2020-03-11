import React, { useContext, useState } from 'react';
import BlogContext from './BlogContext';
import { useHistory } from 'react-router-dom';


function BlogForm({ showEditForm, post }) {
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
  const { addPost, editPost } = useContext(BlogContext);
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
    if (formIsDone) {
      if (post) {
        editPost(post.id, formData);
        showEditForm(false);
      } else {
        addPost(formData);
        history.push('/');
      }
    }
  }

  // CHECK THAT DISABLED WORKS
  const formIsDone = (
    Object.values(formData).every(val => val)
  );

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
        <button disabled={!formIsDone}>Save</button>
        <button onClick={() => history.push('/')}>Cancel</button>
      </form>
    </div >
  )
}

export default BlogForm;