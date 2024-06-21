const express = require('express');
<<<<<<< HEAD
const { register, login} = require('../controllers/userController');
// const { authenticate } = require('../middlewares/authMiddleware');
=======
const { register, login, getUser, updateUser, deleteUser } = require('../controllers/userController');
const authenticate = require('../middlewares/authMiddleware');
>>>>>>> d8aff3604d31a0ac917323d3dce57f45bda50b66
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
<<<<<<< HEAD
// router.get('/user/:userId', authenticate, getUser);

// router.put('/user/:userId', authenticate, updateUser);
// router.delete('/user/:userId', authenticate, deleteUser);
=======
router.get('/user/:userId', authenticate, getUser);
router.put('/user/:userId', authenticate, updateUser);
router.delete('/user/:userId', authenticate, deleteUser);
>>>>>>> d8aff3604d31a0ac917323d3dce57f45bda50b66

module.exports = router;
