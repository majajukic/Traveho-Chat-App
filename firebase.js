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

//let app;

//if the app is already initialized, we shouldn't do it again, if it's not use the current app:
/*if(firebase.apps.legth === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}*/

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
