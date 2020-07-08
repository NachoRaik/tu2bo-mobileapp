export const sortChats = (chats) => {
  const copy = [...chats];
  copy.sort(
    (a, b) =>
      b.lastMessage.createdAt.toDate() - a.lastMessage.createdAt.toDate()
  );
  return copy;
};

export const shouldNotify = (msg, user) =>
  !msg?.read && msg.user._id !== user.id;
