import { actions } from './actions';

const initialState = {
  videos: [],
  loading: false,
  error: null
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
    default:
      return state;
  }
}

export default reducer;
