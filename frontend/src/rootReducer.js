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
  SHOW_ERROR
} from './actionTypes';

const INITIAL_STATE = { posts: {}, titles: [], isLoading: true }

function rootReducer(state = INITIAL_STATE, action) {
  let updatedTitles;
  let updatedPosts;
  let updatedComments;
  let updatedPost;


  switch (action.type) {
    case INITIALIZE_TITLES:
      return { ...state, titles: action.titles, isLoading: false }
    
    case ADD_TITLE:
      return {...state, titles: [...state.titles, action.title]}
    
    case EDIT_TITLE:
      updatedTitles = state.titles.map(title => (
        title.id === action.title.id ? action.title : title
      ));
      return { ...state, titles: updatedTitles};
    
    case DELETE_TITLE:
      updatedTitles = state.titles.filter(title => title.id !== action.id);
      return { ...state, titles: updatedTitles };

    case ADD_POST:
      return { ...state, posts: {...state.posts, [action.post.id]: action.post }};

    case EDIT_POST:
      updatedPost = { ...state.posts[action.id], ...action.post };
      updatedPosts = { ...state.posts, [action.id]: updatedPost }
      return { ...state, posts: updatedPosts }

    case DELETE_POST:
      updatedPosts = { ...state.posts };
      delete updatedPosts[action.id];
      return { ...state, posts: updatedPosts }

    case ADD_COMMENT:
      updatedComments = [
        ...state.posts[action.postId].comments,
        action.comment
      ];
      updatedPosts = {
        ...state.posts,
        [action.postId]: { 
          ...state.posts[action.postId], 
          comments: updatedComments 
        }
      }
      return { ...state, posts: updatedPosts }

    case DELETE_COMMENT:
      updatedComments = state.posts[action.postId].comments.filter(
        comment => comment.id !== action.commentId
      );
      updatedPosts = {
        ...state.posts,
        [action.postId]: { ...state.posts[action.postId], comments: updatedComments }
      }
      return { ...state, posts: updatedPosts }
    
    case UPDATE_VOTES:
      updatedTitles = state.titles.map(title => (
        title.id === action.id ? {...title, votes: action.votes} : title
      ));
      updatedPosts = {
        ...state.posts,
        [action.id]: { ...state.posts[action.id], votes: action.votes}
      };
      return {...state, titles: updatedTitles, posts: updatedPosts};

    case SHOW_ERROR:
      console.error(action.msg);
      return state;

    default:
      console.warn("This action type is not valid", action.type);
      return state;
  }
}

export default rootReducer;