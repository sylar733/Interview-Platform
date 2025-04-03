// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCPvZIKvC20Y9GgySHaIg8BuO83VuR2GFE',
  authDomain: 'prepwise-ce0ca.firebaseapp.com',
  projectId: 'prepwise-ce0ca',
  storageBucket: 'prepwise-ce0ca.firebasestorage.app',
  messagingSenderId: '532170654465',
  appId: '1:532170654465:web:1ba75ed58725dde8769100',
  measurementId: 'G-08S3DGLHQD',
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
