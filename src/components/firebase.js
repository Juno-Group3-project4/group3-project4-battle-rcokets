import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAd8dgsjhLn2rtC2ifQAEiDbXY3j3jC6SI",
  authDomain: "battlerocket-39ba6.firebaseapp.com",
  databaseURL: "https://battlerocket-39ba6-default-rtdb.firebaseio.com",
  projectId: "battlerocket-39ba6",
  storageBucket: "battlerocket-39ba6.appspot.com",
  messagingSenderId: "650858328170",
  appId: "1:650858328170:web:61a6ffe4cb76e98468da13"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;


