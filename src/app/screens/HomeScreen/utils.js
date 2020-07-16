import { ROUTES } from '@constants/routes';

export const notificationHanlder = (data) => ({
  CHAT_NOTIFICATION: {
    redirect: ROUTES.Chat,
    payload: {
      user: { ...data }
    }
  },
  FRIEND_REQUEST_NOTIFICATION: {
    redirect: ROUTES.Profile,
    payload: {
      tabSelected: 1
    }
  },
  ACCEPTED_REQUEST_NOTIFICATION: {
    redirect: ROUTES.Profile,
    payload: { ...data }
  }
});
