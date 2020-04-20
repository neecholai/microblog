import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCommentToApi } from '../redux/actions';
import { Form, Button } from 'react-bootstrap';
import './CommentForm.css';

function CommentForm({ postId }) {
  const INITIAL_STATE = { text: '' };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    const { value } = evt.target;
    setFormData({ text: value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (formData.text) {
      dispatch(addCommentToApi(postId, formData.text));
      setFormData(INITIAL_STATE);
    }
  };

  return (
    <Form className='py-2' onSubmit={handleSubmit}>
      <Form.Group className="CommentForm-group">
        <Form.Control
          className="CommentForm-input"
          placeholder="New Comment"
          value={formData.text}
          onChange={handleChange}
        />
        <Button type="submit" disabled={!formData.text}>
          Add
        </Button>
      </Form.Group>
    </Form>
  );
}

export default CommentForm;
