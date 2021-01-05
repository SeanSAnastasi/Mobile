import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAWMDLeR9Lv4gTJPAWjY1UeCEVtFpBILqM",
    authDomain: "forummobileapp.firebaseapp.com",
    projectId: "forummobileapp",
    storageBucket: "forummobileapp.appspot.com",
    messagingSenderId: "930262989888",
    appId: "1:930262989888:web:83bb2bfa8f04e1fdcef3a5"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const firestore = firebaseApp.firestore();
  
  export {firestore, firebaseConfig};