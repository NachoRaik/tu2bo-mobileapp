import { actions } from './actions';

const initialState = {
  videoId: null,
  loading: false,
  error: null
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.UPLOAD_VIDEO:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actions.UPLOAD_VIDEO_SUCCESS:
      return {
        ...state,
        videoId: action.payload,
        loading: false
      };
    case actions.UPLOAD_VIDEO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case actions.CLEAN_STATE:
      return {
        videoId: null,
        error: null,
        loading: false
      };
    default:
      return state;
  }
}

export default reducer;
