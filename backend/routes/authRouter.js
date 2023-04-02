const router = require('express').Router();
const { userRegister, userLogin, userLogout, getInfo } = require('../controller/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/user-register', userRegister);
router.post('/user-login', userLogin);
router.post('/user-logout', userLogout);
router.get('/user-info', authMiddleware, getInfo);

module.exports = router;