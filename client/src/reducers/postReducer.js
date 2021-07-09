import {
  FETCH_ALL,
  UPDATE,
  CREATE,
  DELETE,
  LIKE,
  FETCH_BY_SEARCH,
} from "../constants/postConstants";

export const postsReducer = (state = {posts:[]}, action) => {
  switch (action.type) {
    case UPDATE:
    case LIKE:
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case FETCH_BY_SEARCH:
      return {...state,posts:action.payload};
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case CREATE:
      return [...state, action.payload];
    case DELETE:
      return state.filter((post) => post._id !== action.payload);
    default:
      return state;
  }
};
