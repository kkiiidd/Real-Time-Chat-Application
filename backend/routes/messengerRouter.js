const { getFriends, sendMessage, getMessage, sendImage, seenAll, getTargetUser } = require('../controller/messengerController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = require('express').Router();

router.get('/get-friends', authMiddleware, getFriends);
router.post('/send-message', authMiddleware, sendMessage);
router.get('/get-message/:id', authMiddleware, getMessage);
router.post('/send-image', authMiddleware, sendImage)
router.post('/seen-all/:id', authMiddleware, seenAll)
router.get('/get-target-user/:email', authMiddleware, getTargetUser)
module.exports = router;