const { getFriends, sendMessage, getMessage, sendImage, seenAll, getTargetUser, addRequest, getRequest, addFriend } = require('../controller/messengerController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = require('express').Router();

router.get('/get-friends', authMiddleware, getFriends);
router.post('/send-message', authMiddleware, sendMessage);
router.get('/get-message/:id', authMiddleware, getMessage);
router.post('/send-image', authMiddleware, sendImage);
router.post('/seen-all/:id', authMiddleware, seenAll);
router.get('/get-target-user/:email', authMiddleware, getTargetUser);
router.post('/add-request', authMiddleware, addRequest);
router.get('/get-request/:id', authMiddleware, getRequest);
router.post('/add-friend', authMiddleware, addFriend);
module.exports = router;