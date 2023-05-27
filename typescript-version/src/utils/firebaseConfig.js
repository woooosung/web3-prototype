import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore/lite"
import { getAuth } from "firebase/auth"
import dotenv from 'dotenv'

dotenv.config({ path: 'config.env' })

const firebaseConfig = {
  // Your Firebase configuration values here
  apiKey: "AIzaSyB2N_GsSPGy1Wbdn9tHJGzL1Al612We8U4",
  authDomain: "donotgiveup-8c7b4.firebaseapp.com",
  projectId: "donotgiveup-8c7b4",
  storageBucket: "donotgiveup-8c7b4.appspot.com",
  messagingSenderId: "567812605511",
  appId: "1:567812605511:web:7d3221e1aac5ebb1c09362",
  databaseURL : "https://donotgiveup-8c7b4-default-rtdb.firebaseio.com",
  measurementID : "G-LGNZNL22TK"
};

const app = initializeApp(firebaseConfig, {
  experimentalForceLongPolling: true, // this line
  useFetchStreams: false, // and this line
});
export const db = getFirestore(app)
export const auth = getAuth(app);
