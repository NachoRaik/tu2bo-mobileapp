import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCD9EB8Kaos1qqSuS0isNv1BPz9ba48PwY',
  authDomain: 'tu2bo-131ec.firebaseapp.com',
  databaseURL: 'https://tu2bo-131ec.firebaseio.com',
  projectId: 'tu2bo-131ec',
  storageBucket: 'tu2bo-131ec.appspot.com',
  messagingSenderId: '665671721983',
  appId: '1:665671721983:web:a2a2cfa1cee89044ed3dca',
  measurementId: 'G-VXN8NZ6J2X'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const uploadImageAsync = async (uri, id) => {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.warn(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child('test/' + id);
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
};
