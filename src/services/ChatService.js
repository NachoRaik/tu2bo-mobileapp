import * as firebase from 'firebase';
import 'firebase/firestore';
import { fb } from '@config/firebase';

const db = fb.firestore();

export const sendMessages = (messages, myUser, otherUser) => {
  const sortUsers = [myUser, otherUser].sort((a, b) => a.id - b.id);
  for (let i = 0; i < messages.length; i++) {
    const { text, user } = messages[i];
    const message = {
      text,
      user,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    const chatRef = db
      .collection('chats')
      .doc(`${sortUsers[0].id}-${sortUsers[1].id}`);

    chatRef.set(
      { user1: sortUsers[0], user2: sortUsers[1], lastMessage: message },
      { merge: true }
    );
    chatRef.collection('messages').add(message);
  }
};

const parseMessage = (doc) => {
  if (doc) {
    const { createdAt: timestamp, text, user } = doc.data({
      serverTimestamps: 'estimate'
    });
    const message = {
      _id: doc.id,
      createdAt: timestamp?.toDate(),
      text,
      user
    };
    return message;
  }
};

export const on = (callback, me_id, dest_id) => {
  const ids = [me_id, dest_id].sort();
  return db
    .collection('chats')
    .doc(`${ids[0]}-${ids[1]}`)
    .collection('messages')
    .orderBy('createdAt', 'asc')
    .onSnapshot(function (querySnapshot) {
      querySnapshot.docChanges().forEach(function (change) {
        if (change.type === 'added') {
          callback(parseMessage(change.doc));
        }
      });
    });
};

const parseChat = (doc, me) => {
  if (doc) {
    const { user1, user2, lastMessage } = doc.data({
      serverTimestamps: 'estimate'
    });
    const user = user1.username === me.username ? user2 : user1;
    return { user, lastMessage };
  }
};

export const onNewChat = (callback, user, me) => {
  return db
    .collection('chats')
    .where(`${user}.username`, '==', me.username)
    .onSnapshot(function (querySnapshot) {
      querySnapshot.docChanges().forEach(function (change) {
        if (change.type === 'added') {
          callback(parseChat(change.doc, me));
        }
      });
    });
};
