import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey:  'AIzaSyDdP1nUib4jXc7kORmQkqy0FzqHt_P6KsA',
    authDomain: "unique-96603.firebaseapp.com",
    projectId: "unique-96603",
    storageBucket: "unique-96603.appspot.com",
    messagingSenderId: "190418836034",
    appId: "1:190418836034:web:ba0f5dddfaf55cac1b6bdb",
    measurementId: "G-GLNKTHZ2YB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);