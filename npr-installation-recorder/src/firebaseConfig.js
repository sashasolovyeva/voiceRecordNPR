import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

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