import {
  INITIALIZE_TITLES,
  ADD_TITLE,
  EDIT_TITLE,
  DELETE_TITLE,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_VOTES,
  ADD_ERROR,
  // RESET_ERRORS
} from './actionTypes';
import axios from 'axios';

const BASE_URL = "http://localhost:5000/api"

export function getPostFromApi(id) {
  return async dispatch => {
    try {
      const post = (await axios.get(`${BASE_URL}/posts/${id}`)).data;
      dispatch(addPost(post));
    }
    catch (err) {
      dispatch(addError(err.response.data));
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
      dispatch(addError(err.response.data));
    }
  }
}

export function addPostToApi(postData) {
  return async dispatch => {
    try {
      const postResponse = (await axios.post(`${BASE_URL}/posts`, postData)).data;
      const { body, ...title } = postResponse;
      const post = {...postResponse, comments: []};
      dispatch(addPost(post));
      dispatch(addTitle(title));
    }
    catch (err) {
      dispatch(addError(err.response.data));
    }
  }
}

export function editPostInApi(id, postData) {
  return async dispatch => {
    try {
      const postResponse = (await axios.put(`${BASE_URL}/posts/${id}`, postData)).data;
      const { body, ...title } = postResponse;
      const post = {...postResponse, comments: []};
      dispatch(editPost(id, post));
      dispatch(editTitle(title));
    }
    catch (err) {
      dispatch(addError(err.response.data));
    }
  }
}

export function deletePostFromApi(id) {
  return async dispatch => {
    try {
      await axios.delete(`${BASE_URL}/posts/${id}`);
      dispatch(deletePost(+id));
      dispatch(deleteTitle(+id));
    }
    catch (err) {
      dispatch(addError(err.response.data));
    }
  }
}

export function addCommentToApi(postId, text) {
  return async dispatch => {
    try {
      const comment = (await axios.post(`${BASE_URL}/posts/${postId}/comments`, {text})).data;
      dispatch(addComment(postId, comment));
    }
    catch (err) {
      dispatch(addError(err.response.data));
    }
  }
}

export function deleteCommentFromApi(postId, commentId) {
  return async dispatch => {
    try {
      await axios.delete(`${BASE_URL}/posts/${postId}/comments/${commentId}`);
      dispatch(deleteComment(postId, commentId));
    }
    catch (err) {
      dispatch(addError(err.response.data));
    }
  }
}

export function voteForPost(id, direction) {
  return async dispatch => {
    try {
      const { votes } = (await axios.post(`${BASE_URL}/posts/${id}/vote/${direction}`)).data;
      dispatch(updateVotes(id, votes));
    }
    catch (err) {
      dispatch(addError(err.response.data));
    }
  }
}

function updateVotes(id, votes) {
  return {
    type: UPDATE_VOTES,
    id,
    votes
  }
}

function initializeTitles(titles) {
  return {
    type: INITIALIZE_TITLES,
    titles
  }
}

function addTitle(title) {
  return {
    type: ADD_TITLE,
    title
  }
}

function editTitle(title) {
  return {
    type: EDIT_TITLE,
    title
  }
}

function deleteTitle(id) {
  return {
    type: DELETE_TITLE,
    id
  }
}

function addPost(post) {
  return {
    type: ADD_POST,
    post
  }
}

function editPost(id, post) {
  return {
    type: EDIT_POST,
    post,
    id
  }
}

function deletePost(id) {
  return {
    type: DELETE_POST,
    id
  }
}

function addComment(postId, comment) {
  return {
    type: ADD_COMMENT,
    postId,
    comment
  }
}

function deleteComment(postId, commentId) {
  return {
    type: DELETE_COMMENT,
    postId,
    commentId
  }
}

function addError(msg) {
  return {
    type: ADD_ERROR,
    msg
  }
}

// function resetErrors() {
//   return {
//     type: RESET_ERRORS,
//   }
// }

