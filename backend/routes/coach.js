const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  getCoachById,
  getCoachProfile
} = require('../controllers/coach');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload'); // <--- multer middleware

router.post('/signup', upload.single('image'), signup);
router.post('/login', login);
router.get('/:id', getCoachById);
router.get('/coach-profile', authMiddleware('coach'), getCoachProfile);

module.exports = router;
