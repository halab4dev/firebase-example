// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";

// Your web app's Firebase configuration
import firebaseConfig from './firebase.config.json';

export default  {
    initialize: function(): void {
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    }
}

