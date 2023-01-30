import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD1O84fR0WQp3uuCkgP2JGoYg8YPNEfIrs",
    authDomain: "foodsha-2aa1f.firebaseapp.com",
    projectId: "foodsha-2aa1f",
    storageBucket: "foodsha-2aa1f.appspot.com",
    messagingSenderId: "148282561491",
    appId: "1:148282561491:web:15d8aceb1ab61a1e0ad526",
    measurementId: "G-KL1L62S2S5"
  };
  if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
  export {firebase};