  // Your web app's Firebase configuration
  const firebaseConfig = {

    apiKey: theKey,
  
    authDomain: "mental-reload-95d66.firebaseapp.com",
  
    projectId: "mental-reload-95d66",
  
    storageBucket: "mental-reload-95d66.firebasestorage.app",
  
    messagingSenderId: "634955541388",
  
    appId: "1:634955541388:web:64a9e7fc037ead46f1c4a9"
  
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const database = firebase.firestore()