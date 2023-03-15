const { getFriends } = require('../controller/messengerController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = require('express').Router();

router.get('/get-friends', authMiddleware, getFriends);
module.exports = router;