const express = require('express');
const { register, login, getUser, updateUser, deleteUser } = require('../controllers/userController');
const authenticate = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user/:userId', authenticate, getUser);
router.put('/user/:userId', authenticate, updateUser);
router.delete('/user/:userId', authenticate, deleteUser);

module.exports = router;
