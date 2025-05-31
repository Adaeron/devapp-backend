// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

export let firebaseApp: FirebaseApp;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};
export const FirebaseConnectionManager = {
    // Initialize Firebase
    connect: async () => {
        firebaseApp = initializeApp(firebaseConfig);
        console.log('Se conectó a Firebase.');
        return firebaseApp;
    },
    getDb: () => {
        if (!firebaseApp) {
            FirebaseConnectionManager.connect();
            return getFirestore(firebaseApp);
        } else {
            return getFirestore(firebaseApp);
        }
    }
};
