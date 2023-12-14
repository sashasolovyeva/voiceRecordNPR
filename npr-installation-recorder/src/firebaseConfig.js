import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = initializeApp({

    apiKey: "AIzaSyAvvu_v8fMrHk8Oq3eOdmwPQz6dvN0rLPY",

    authDomain: "npr-installation.firebaseapp.com",

    projectId: "npr-installation",

    storageBucket: "npr-installation.appspot.com",

    messagingSenderId: "303604699333",

    appId: "1:303604699333:web:d285e1b08b19ffce21a0ac"

});


// Firebase storage reference
const storage = getStorage(firebaseConfig);
export default storage;