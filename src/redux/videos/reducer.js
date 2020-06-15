import { actions } from './actions';

const initialState = {
  videos: [],
  loading: false,
  error: null,
  comments: [],
  liked: false
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_VIDEOS:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actions.GET_VIDEOS_SUCCESS:
      return {
        ...state,
        videos: action.payload,
        loading: false
      };
    case actions.GET_VIDEOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case actions.GET_VIDEO_COMMENTS:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actions.GET_VIDEO_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        loading: false
      };
    case actions.GET_VIDEO_COMMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case actions.COMMENT_VIDEO:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actions.COMMENT_VIDEO_SUCCESS:
      return {
        ...state,
        comments: [...state.comments, action.payload],
        loading: false
      };
    case actions.COMMENT_VIDEO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}

export default reducer;
