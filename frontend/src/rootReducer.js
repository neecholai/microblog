import {
  INITIALIZE_TITLES,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  ADD_COMMENT,
  DELETE_COMMENT
} from './actionTypes';
import { v4 as uuid } from 'uuid';

const INITIAL_STATE = { posts: {}, titles: {} }

function rootReducer(state = INITIAL_STATE, action) {
  let formData;
  let postId;
  let updatedPosts;
  let commentText;
  let commentId;
  let updatedComments;

  switch (action.type) {
    case INITIALIZE_TITLES:
      return { ...state, titles: action.titles }
    
    case ADD_POST:
      formData = action.payload;
      postId = uuid();
      const newPost = { ...formData, comments: [] };
      updatedPosts = { ...state.posts, [postId]: newPost };
      return { ...state, posts: updatedPosts };

    case EDIT_POST:
      ({ postId, formData } = action.payload);
      const updatedPost = { ...state.posts[postId], ...formData };
      updatedPosts = { ...state.posts, [postId]: updatedPost }
      return { ...state, posts: updatedPosts }

    case DELETE_POST:
      postId = action.payload;
      updatedPosts = { ...state.posts };
      delete updatedPosts[postId];
      return { ...state, posts: updatedPosts }

    case ADD_COMMENT:
      ({ postId, commentText } = action.payload);
      commentId = uuid();
      const newComment = { text: commentText, id: commentId }
      updatedComments = [...state.posts[postId].comments, newComment];
      updatedPosts = {
        ...state.posts,
        [postId]: { ...state.posts[postId], comments: updatedComments }
      }
      return { ...state, posts: updatedPosts }

    case DELETE_COMMENT:
      ({ commentId, postId } = action.payload);
      updatedComments = state.posts[postId].comments.filter(
        comment => comment.id !== commentId
      );
      updatedPosts = {
        ...state.posts,
        [postId]: { ...state.posts[postId], comments: updatedComments }
      }
      return { ...state, posts: updatedPosts }

    default:
      console.warn("This action type is not valid", action.type);
      return state;
  }
}

export default rootReducer;