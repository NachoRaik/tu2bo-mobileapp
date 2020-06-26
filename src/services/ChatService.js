import * as firebase from 'firebase';
import 'firebase/firestore';
import { fb } from '@config/firebase';

const db = fb.firestore();

export const sendMessages = (messages, me_id, dest_id) => {
  const ids = [me_id, dest_id].sort();
  for (let i = 0; i < messages.length; i++) {
    const { text, user } = messages[i];
    const message = {
      text,
      user,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };
    db.collection(`${ids[0]}-${ids[1]}`).add(message);
  }
};

const parse = (doc) => {
  if (doc) {
    const { timestamp, text, user } = doc.data();
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
  return (
    db
      .collection(`${ids[0]}-${ids[1]}`)
      //.limitToLast(20)
      .onSnapshot(function (querySnapshot) {
        querySnapshot.docChanges().forEach(function (change) {
          if (change.type === 'added') {
            callback(parse(change.doc));
          }
        });
      })
  );
};
