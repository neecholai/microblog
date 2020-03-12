import {
  INITIALIZE_TITLES,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  ADD_COMMENT,
  DELETE_COMMENT
} from './actionTypes';

export function initializeTitles(titles) {
  return {
    type: INITIALIZE_TITLES,
    titles
  }
}

export function addPost(formData) {
  return {
    type: ADD_POST,
    payload: formData
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
