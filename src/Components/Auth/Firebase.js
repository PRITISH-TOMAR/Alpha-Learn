import { initializeApp } from 'firebase/app';



///////////////////////////////////////////////////////////////

const firebaseConfig = {
    apiKey:  process.env.REACT_APP_AUTH_KEY,
    authDomain: "unique-96603.firebaseapp.com",
    projectId: "unique-96603",
    storageBucket: "unique-96603.appspot.com",
    messagingSenderId: "190418836034",
    appId: "1:190418836034:web:ba0f5dddfaf55cac1b6bdb",
    measurementId: "G-GLNKTHZ2YB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);



///////////////////////////////////////////////////////////////
