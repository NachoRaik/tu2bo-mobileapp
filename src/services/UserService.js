import api from '@config/api';

export const uploadVideo = (id, videoInfo) =>
  api.post(`/users/${id}/videos`, videoInfo);

export const getUserById = (id) => api.get(`/users/${id}`);

export const sendFriendRequest = (id) => api.post(`users/${id}/friend_request`);

export const getFriendRequests = () => api.get(`users/my_requests`);

export const acceptFriendshipRequest = (id) => api.post(`users/${id}/friends`);
