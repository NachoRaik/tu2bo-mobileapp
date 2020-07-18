import api from '@config/api';

export const uploadVideo = (id, videoInfo) =>
  api.post(`/users/${id}/videos`, videoInfo);

export const getUserById = (id) => api.get(`/users/${id}`);

export const editUserById = (id, profileData) =>
  api.put(`/users/${id}`, profileData);

export const getVideosById = (id) => api.get(`/users/${id}/videos`);

export const sendFriendRequest = (id) => api.post(`users/${id}/friend_request`);

export const getFriendRequests = () => api.get(`users/my_requests`);

export const acceptFriendshipRequest = (id) => api.post(`users/${id}/friends`);

export const getFriends = (id) => api.get(`users/${id}/friends`);

export const resetPassword = (email) =>
  api.post(`users/reset_password`, { email });

export const verifyCode = (email, code) =>
  api.get(`users/password`, { email, code });

export const newPassword = (email, code, password) =>
  api.get(`users/password`, { password }, { params: { email, code } });
