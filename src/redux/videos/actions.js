import {
  getVideos,
  getVideoComments,
  commentVideo
} from '@services/VideoService';

export const actions = {
  GET_VIDEOS: '@@VIDEOS/GET_VIDEOS',
  GET_VIDEOS_SUCCESS: '@@VIDEOS/GET_VIDEOS_SUCCESS',
  GET_VIDEOS_FAILURE: '@@VIDEOS/GET_VIDEOS_FAILURE',
  GET_VIDEO_COMMENTS: '@@VIDEOS/GET_VIDEO_COMMENTS',
  GET_VIDEO_COMMENTS_SUCCESS: '@@VIDEOS/GET_VIDEO_COMMENTS_SUCCESS',
  GET_VIDEO_COMMENTS_FAILURE: '@@VIDEOS/GET_VIDEO_COMMENTS_FAILURE',
  COMMENT_VIDEO: '@@VIDEOS/COMMENT_VIDEO',
  COMMENT_VIDEO_SUCCESS: '@@VIDEOS/COMMENT_VIDEO_SUCCESS',
  COMMENT_VIDEO_FAILURE: '@@VIDEOS/COMMENT_VIDEO_FAILURE'
};

const actionCreators = {
  getVideos: () => async (dispatch) => {
    dispatch({ type: actions.GET_VIDEOS });
    const response = await getVideos();
    if (response.ok) {
      dispatch({
        type: actions.GET_VIDEOS_SUCCESS,
        payload: response.data
      });
    } else {
      dispatch({
        type: actions.GET_VIDEOS_FAILURE,
        payload: response.data.reason
      });
    }
  },
  getVideoComments: (id) => async (dispatch) => {
    dispatch({ type: actions.GET_VIDEO_COMMENTS });
    const response = await getVideoComments(id);
    if (response.ok) {
      dispatch({
        type: actions.GET_VIDEO_COMMENTS_SUCCESS,
        payload: response.data
      });
    } else {
      dispatch({
        type: actions.GET_VIDEO_COMMENTS_FAILURE,
        payload: response.data.reason
      });
    }
  },
  commentVideo: (id, comment) => async (dispatch) => {
    dispatch({ type: actions.COMMENT_VIDEO });
    const response = await commentVideo(id, comment);
    if (response.ok) {
      dispatch({
        type: actions.COMMENT_VIDEO_SUCCESS,
        payload: response.data
      });
    } else {
      dispatch({
        type: actions.COMMENT_VIDEO_FAILURE,
        payload: response.data.reason
      });
    }
  }
};

export default actionCreators;
