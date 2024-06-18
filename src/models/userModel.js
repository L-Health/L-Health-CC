const { db } = require('../config/firebase');

const createUserProfile = async (userId, profileData) => {
  await db.collection('users').doc(userId).set(profileData);
};

const getUserProfile = async (userId) => {
  const userDoc = await db.collection('users').doc(userId).get();
  return userDoc.exists ? userDoc.data() : null;
};

const updateUserProfile = async (userId, profileData) => {
  await db.collection('users').doc(userId).update(profileData);
};

const deleteUserProfile = async (userId) => {
  await db.collection('users').doc(userId).delete();
};

module.exports = {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile
};
