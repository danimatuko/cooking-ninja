import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC84qM-0_l0MhCear29jFR-d-1mC0PSAaI",
  authDomain: "cooking-ninja-dm.firebaseapp.com",
  projectId: "cooking-ninja-dm",
  storageBucket: "cooking-ninja-dm.appspot.com",
  messagingSenderId: "810179170575",
  appId: "1:810179170575:web:c110b9744fc5d53314ee7a",
};

// init firebase
firebase.initializeApp(firebaseConfig);
// init services
const firestore = firebase.firestore();

export { firestore };
