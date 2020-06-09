import { uploadVideo } from '@services/UserService';

export const actions = {
  UPLOAD_VIDEO: '@@USERS/UPLOAD_VIDEO',
  UPLOAD_VIDEO_SUCCESS: '@@USERS/UPLOAD_VIDEO_SUCCESS',
  UPLOAD_VIDEO_FAILURE: '@@USERS/UPLOAD_VIDEO_FAILURE'
};

const actionCreators = {
  uploadVideo: (userId, videoInfo) => async (dispatch) => {
    dispatch({ type: actions.UPLOAD_VIDEO });
    const response = await uploadVideo(userId, videoInfo);
    if (response.ok) {
      dispatch({
        type: actions.UPLOAD_VIDEO_SUCCESS,
        payload: response.data
      });
    } else {
      dispatch({
        type: actions.UPLOAD_VIDEO_FAILURE,
        payload: response.problem
      });
    }
  }
};

export default actionCreators;