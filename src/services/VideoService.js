import api from '@config/api';

export const getVideos = () => api.get('/videos');

export const getVideoComments = (id) => api.get(`/videos/${id}/comments`);

export const commentVideo = (id, comment) =>
  api.post(`/videos/${id}/comments`, comment);

export const updateLikedVideo = (id, liked) =>
  api.put(`/videos/${id}/likes`, liked);
