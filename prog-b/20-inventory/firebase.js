  // Your web app's Firebase configuration
  const firebaseConfig = {

    apiKey: "AIzaSyCnYVf060WpPHjjnyjbH1sp9mBFAvR0VX4",
  
    authDomain: "steph-testdb.firebaseapp.com",
  
    projectId: "steph-testdb",
  
    storageBucket: "steph-testdb.firebasestorage.app",
  
    messagingSenderId: "926762639509",
  
    appId: "1:926762639509:web:8f8bbbd198c51bf69a7b9c"
  
  };
  
  
    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);
    const database = firebase.firestore()