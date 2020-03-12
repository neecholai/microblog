import {
  INITIALIZE_TITLES,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  SHOW_ERROR
} from './actionTypes';
import { v4 as uuid } from 'uuid';

const INITIAL_STATE = { posts: {}, titles: [], isLoading: true }

function rootReducer(state = INITIAL_STATE, action) {
  let formData;
  let postId;
  let updatedPosts;
  let commentText;
  let commentId;
  let updatedComments;

  switch (action.type) {
    case INITIALIZE_TITLES:
      return { ...state, titles: action.titles, isLoading: false }

    case ADD_POST:
      return { ...state, posts: {...state.posts, [action.post.id]: action.post }};

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

    case SHOW_ERROR:
      console.error(action.msg);
      return state;

    default:
      console.warn("This action type is not valid", action.type);
      return state;
  }
}

export default rootReducer;