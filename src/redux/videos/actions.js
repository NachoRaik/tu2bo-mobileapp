import { getVideos } from '@services/VideoService';

export const actions = {
  GET_VIDEOS: '@@VIDEOS/GET_VIDEOS',
  GET_VIDEOS_SUCCESS: '@@VIDEOS/GET_VIDEOS_SUCCESS',
  GET_VIDEOS_FAILURE: '@@VIDEOS/GET_VIDEOS_FAILURE'
};

const actionCreators = {
  getVideos: () => async (dispatch) => {
    dispatch({ type: actions.GET_VIDEOS });
    const response = await getVideos();
    if (response.ok) {
      dispatch({
        type: actions.GET_VIDEOS_SUCCESS,
        payload: response.data.videos
      });
    } else {
      dispatch({
        type: actions.GET_VIDEOS_FAILURE,
        payload: response.problem
      });
    }
  }
};

export default actionCreators;
