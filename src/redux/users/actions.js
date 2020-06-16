import { uploadVideo } from '@services/UserService';
import videoActionCreators from '@redux/videos/actions';

export const actions = {
  UPLOAD_VIDEO: '@@USERS/UPLOAD_VIDEO',
  UPLOAD_VIDEO_SUCCESS: '@@USERS/UPLOAD_VIDEO_SUCCESS',
  UPLOAD_VIDEO_FAILURE: '@@USERS/UPLOAD_VIDEO_FAILURE',
  CLEAN_STATE: '@@USERS/CLEAN_STATE'
};

const actionCreators = {
  uploadVideo: (userId, videoInfo) => async (dispatch) => {
    dispatch({ type: actions.UPLOAD_VIDEO });
    const response = await uploadVideo(userId, videoInfo);
    if (response.ok) {
      dispatch({
        type: actions.UPLOAD_VIDEO_SUCCESS,
        payload: response.data.id
      });
      dispatch(videoActionCreators.getVideos());
    } else {
      dispatch({
        type: actions.UPLOAD_VIDEO_FAILURE,
        payload: response.data.reason
      });
    }
  },
  cleanState: () => ({
    type: actions.CLEAN_STATE
  })
};

export default actionCreators;
