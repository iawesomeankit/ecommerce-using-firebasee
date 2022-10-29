import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBs7P0Z78C3COJVcv8t4GpsIN2PgT37-VI",
  authDomain: "using-firebase-14993.firebaseapp.com",
  projectId: "using-firebase-14993",
  storageBucket: "using-firebase-14993.appspot.com",
  messagingSenderId: "594180090845",
  appId: "1:594180090845:web:210def6eb544f21fcaa434"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {db,auth};