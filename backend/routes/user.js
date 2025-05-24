const express = require('express');
const { signup, login, getUserProfile } = require('../controllers/user');
const authMiddleware = require('../middleware/authMiddleware'); 

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user-profile', authMiddleware, getUserProfile); 

module.exports = router;
