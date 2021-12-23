import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCop9ONe_HrUb3E9f_rDYCfwdcBRhsmDrk",
    authDomain: "travehochatapp.firebaseapp.com",
    projectId: "travehochatapp",
    storageBucket: "travehochatapp.appspot.com",
    messagingSenderId: "816116956132",
    appId: "1:816116956132:web:3d1f7ee865b1056b2625f1"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
