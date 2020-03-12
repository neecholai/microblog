import {
  INITIALIZE_TITLES,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  SHOW_ERROR
} from './actionTypes';
import axios from 'axios';

const BASE_URL = "http://localhost:5000/api"

export function getPostFromApi(postId) {
  return async dispatch => {
    try {
      const post = (await axios.get(`${BASE_URL}/posts/${postId}`)).data;
      dispatch(addPost(post));
    }
    catch (err) {
      dispatch(showError(err.response.data));
    }
  }
}

export function getTitlesFromApi() {
  return async dispatch => {
    try {
      const titles = (await axios.get(`${BASE_URL}/posts`)).data;
      dispatch(initializeTitles(titles));
    }
    catch (err) {
      dispatch(showError(err.response.data));
    }
  }
}

export function initializeTitles(titles) {
  return {
    type: INITIALIZE_TITLES,
    titles
  }
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post
  }
}

export function editPost(postId, formData) {
  return {
    type: EDIT_POST,
    payload: { postId, formData }
  }
}

export function deletePost(postId) {
  return {
    type: DELETE_POST,
    payload: postId
  }
}

export function addComment(postId, commentText) {
  return {
    type: ADD_COMMENT,
    payload: { postId, commentText }
  }
}

export function deleteComment(commentId, postId) {
  return {
    type: DELETE_COMMENT,
    payload: { commentId, postId }
  }
}

export function showError(msg) {
  return {
    type: SHOW_ERROR,
    msg
  }
}

