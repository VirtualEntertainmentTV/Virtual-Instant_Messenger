import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBqpEkgNk7XaOD8vnaR1Sg-vKVmovalXy0",
  authDomain: "virtual-instant-messenger.firebaseapp.com",
  projectId: "virtual-instant-messenger",
  storageBucket: "virtual-instant-messenger.appspot.com",
  messagingSenderId: "96767504372",
  appId: "1:96767504372:web:68c49df99e008322c2d3a1",
  measurementId: "G-1QRQH7YE6K",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebaseApp.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
