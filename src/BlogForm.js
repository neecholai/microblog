import React, { useContext, useState } from 'react';
import BlogContext from './BlogContext';
import { useHistory } from 'react-router-dom';


const INITIAL_STATE = {
  title: '',
  description: '',
  body: ''
};

function BlogForm() {
  const history = useHistory();
  const {addBlog, editBlog} = useContext(BlogContext);
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
    if(formIsDone) {
      addBlog(formData);
      history.push('/');
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
    </div>
  )
}

export default BlogForm;