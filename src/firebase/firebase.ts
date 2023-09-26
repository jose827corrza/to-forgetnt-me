import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
}

// const firebaseConfig = {
//   apiKey: "AIzaSyAslj28-GuMdG7VcLi2HpBccA9RbIoWNKU",
//   authDomain: "to-forgetnt-me.firebaseapp.com",
//   projectId: "to-forgetnt-me",
//   storageBucket: "to-forgetnt-me.appspot.com",
//   messagingSenderId: "986566517355",
//   appId: "1:986566517355:web:e92750dd318348e55b872e",
//   measurementId: "G-SCLYJHYERY"
// };

// Conn to Firebase project
export const app = initializeApp(firebaseConfig);

// Firebase Services
export const auth = getAuth(app);

export function initializeFirebase(){
  return {
    app: initializeApp(firebaseConfig),
    auth: getAuth(app),
  }
}