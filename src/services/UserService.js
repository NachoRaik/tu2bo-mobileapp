import api from '@config/api';

export const uploadVideo = (id, videoInfo) =>
  api.post(`/users/${id}/videos`, videoInfo);
