const bcrypt = require('bcryptjs');
const { admin } = require('../config/firebase');
<<<<<<< HEAD
const { createUserProfile, getUserProfile } = require('../models/userModel');
=======
const { createUserProfile, getUserProfile, updateUserProfile, deleteUserProfile } = require('../models/userModel');
>>>>>>> d8aff3604d31a0ac917323d3dce57f45bda50b66

const register = async (req, res) => {
  const { email, password, profile } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const userRecord = await admin.auth().createUser({
      email,
      password: hashedPassword,
    });

    // Create user profile with password hash
    await createUserProfile(userRecord.uid, { ...profile, passwordHash: hashedPassword });

    res.status(201).send({ userId: userRecord.uid });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
<<<<<<< HEAD
    console.log('Email:', email);
    console.log('Password:', password); 
=======
    console.log('Email:', email); // Log email value
    console.log('Password:', password); // Log password value
>>>>>>> d8aff3604d31a0ac917323d3dce57f45bda50b66

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Verify email and password
    const userRecord = await admin.auth().getUserByEmail(email);
    console.log('User record:', userRecord); // Log user record

    // Assuming you have a separate user profile with a stored password hash
    const userDoc = await getUserProfile(userRecord.uid);
    console.log('User document:', userDoc); // Log user document

    if (!userDoc) {
      throw new Error('User not found');
    }

    if (!userDoc.passwordHash) {
      console.log('User document does not contain passwordHash:', userDoc); // Log missing passwordHash
      throw new Error('Password hash not found in user document');
    }

    // Validate password (assuming userDoc has a stored password hash)
    const validPassword = bcrypt.compareSync(password, userDoc.passwordHash);

    if (!validPassword) {
      throw new Error('Invalid credentials');
    }

    // Create a custom token 20 karakter
    const token = await admin.auth().createCustomToken(userRecord.uid);
    res.status(200).send({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(400).send({ error: error.message });
  }
};

<<<<<<< HEAD
// const getUser = async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const profile = await getUserProfile(userId);
//     if (profile) {
//       res.status(200).send(profile);
//     } else {
//       res.status(404).send({ error: 'User not found' });
//     }
//   } catch (error) {
//     res.status(400).send({ error: error.message });
//   }
// };

// const updateUser = async (req, res) => {
//   const { userId } = req.params;
//   const profileData = req.body;
//   try {
//     await updateUserProfile(userId, profileData);
//     res.status(200).send({ message: 'Profile updated' });
//   } catch (error) {
//     res.status(400).send({ error: error.message });
//   }
// };

// const deleteUser = async (req, res) => {
//   const { userId } = req.params;
//   try {
//     await deleteUserProfile(userId);
//     res.status(200).send({ message: 'Profile deleted' });
//   } catch (error) {
//     res.status(400).send({ error: error.message });
//   }
// };
=======
const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const profile = await getUserProfile(userId);
    if (profile) {
      res.status(200).send(profile);
    } else {
      res.status(404).send({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const profileData = req.body;
  try {
    await updateUserProfile(userId, profileData);
    res.status(200).send({ message: 'Profile updated' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await deleteUserProfile(userId);
    res.status(200).send({ message: 'Profile deleted' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
>>>>>>> d8aff3604d31a0ac917323d3dce57f45bda50b66

module.exports = {
  register,
  login,
<<<<<<< HEAD
  // getUser,
  // updateUser,
  // deleteUser
=======
  getUser,
  updateUser,
  deleteUser
>>>>>>> d8aff3604d31a0ac917323d3dce57f45bda50b66
};
