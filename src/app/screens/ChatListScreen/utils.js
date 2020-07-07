export const sortChats = (chats) =>
  [...chats].sort(
    (a, b) =>
      b.lastMessage.createdAt.toDate() - a.lastMessage.createdAt.toDate()
  );

export const shouldNotify = (msg, user) =>
  !msg?.read && msg.user._id !== user.id;
