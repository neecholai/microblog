import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addPostToApi, editPostInApi } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { Form, Button, ButtonGroup } from 'react-bootstrap';
import './BlogForm.css';

function BlogForm({ showEditForm, post, postId }) {
  const INITIAL_STATE = post
    ? {
        title: post.title,
        description: post.description,
        body: post.body,
      }
    : {
        title: '',
        description: undefined,
        body: '',
      };

  const history = useHistory();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isValid) {
      if (post) {
        dispatch(editPostInApi(postId, formData));
        showEditForm(false);
      } else {
        dispatch(addPostToApi(formData));
        history.push('/');
      }
    }
  };

  const isValid = Object.values(formData).every((val) => val);

  return (
    <div className="BlogForm m-2">
      <Form className="col-xs-12 col-md-8" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label as="h5" htmlFor="title">Title: </Form.Label>
          <Form.Control
            id="title"
            name="title"
            className="BlogForm-input"
            value={formData.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label as="h5" htmlFor="description">Description: </Form.Label>
          <Form.Control
            id="description"
            name="description"
            className="BlogForm-input"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label as="h5" htmlFor="body">Body: </Form.Label>
          <Form.Control
            id="body"
            name="body"
            as='textarea'
            className="BlogForm-input"
            value={formData.body}
            onChange={handleChange}
          />
        </Form.Group>
        <div className="BlogForm-btns">
          <ButtonGroup>
            <Button disabled={!isValid} variant="primary" type="submit">
              Save
            </Button>
            <Button onClick={() => history.push('/')} variant="secondary">
              Cancel
            </Button>
          </ButtonGroup>
        </div>
      </Form>
    </div>
  );
}

export default BlogForm;
