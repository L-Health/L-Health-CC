const admin = require('firebase-admin');
const axios = require('axios');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();

async function signUpUser(email, password, userName) {
  try {
    const apiKey = 'AIzaSyDKK53ix2RmbudHOE6zdjt_DPzwcqDOZlI';  
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
    
    // Sign up the user using Firebase Auth REST API
    const response = await axios.post(url, {
      email: email,
      password: password,
      returnSecureToken: true
    });

    const userId = response.data.localId;

    // Store user data in Firestore
    await firestore.collection('users').doc(userId).set({
      email: email,
      name: userName,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log('User signed up and data stored in Firestore');
  } catch (error) {
    console.error('Error signing up and storing user data: ', error);
  }
}

// Call the function with test data
signUpUser('user@example.com', 'password123', 'User Name');
