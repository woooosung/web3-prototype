import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  // Your Firebase configuration values here
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STOAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  measurementID: process.env.FIREBASE_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig, {
  experimentalForceLongPolling: true, // this line
  useFetchStreams: false // and this line
})

export const db = getFirestore(app)
export const auth = getAuth(app)
