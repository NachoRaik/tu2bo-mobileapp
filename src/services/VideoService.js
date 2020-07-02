import api from '@config/api';

export const getVideos = () => api.get('/videos');

export const getVideoById = (id) => api.get(`/videos/${id}`);

export const getVideoComments = (id) => api.get(`/videos/${id}/comments`);

export const commentVideo = (id, comment) =>
  api.post(`/videos/${id}/comments`, comment);

export const updateLikedVideo = (id, liked) =>
  api.put(`/videos/${id}/likes`, liked);

export const deleteVideo = (id) => api.delete(`/videos/${id}`);

export const editVideo = (id, fields) => api.patch(`/videos/${id}`, fields);
