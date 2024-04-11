import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyBvT4CZOxNFcfGJmX0e5Y1QbEpIJME2dxk",
  authDomain: "storage-bca27.firebaseapp.com",
  projectId: "storage-db6e5",
  storageBucket: "storage-db6e5.appspot.com",
  messagingSenderId: "795937541380",
  appId: "1:795937541380:web:5443f9a1d1920b4e935451"
};
const app =firebase.initializeApp(firebaseConfig);
export const db = app.firestore();

