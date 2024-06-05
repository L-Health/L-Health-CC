const admin = require('firebase-admin');
const axios = require('axios');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();

async function loginUser(email, password) {
  try {
    const apiKey = 'AIzaSyDKK53ix2RmbudHOE6zdjt_DPzwcqDOZlI';  // Replace with your actual API key
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

    // Log in the user using Firebase Auth REST API
    const response = await axios.post(url, {
      email: email,
      password: password,
      returnSecureToken: true
    });

    const userId = response.data.localId;

    // Update user login data in Firestore
    await firestore.collection('users').doc(userId).update({
      lastLogin: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log('User logged in and login data updated in Firestore');

    // Fetch user data from Firestore to create user profile
    const userDoc = await firestore.collection('users').doc(userId).get();
    const userData = userDoc.data();
    
    // Here you can create the user profile using userData
    // For example:
    const userProfile = {
      email: userData.email,
      displayName: userData.displayName,
      // Add other fields as needed
    };
    
    console.log('User profile created:', userProfile);
    
    // Return the user profile if needed
    return userProfile;
  } catch (error) {
    console.error('Error logging in and updating user data: ', error);
  }
}

// Call the function with test data
loginUser('user@example.com', 'password123');
