import firebase from "firebase/app";
import "firebase/auth";

// firebase config
var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASECONFIG_API_KEY,
  authDomain: "seolstudylog.firebaseapp.com",
  projectId: "seolstudylog",
  storageBucket: "seolstudylog.appspot.com",
  messagingSenderId: "557472836635",
  appId: "1:557472836635:web:0f82a764b0a86d29905cbe",
};

// initialize firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
