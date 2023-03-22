const router = require('express').Router();
const { userRegister, userLogin, userLogout } = require('../controller/authController');

router.post('/user-register', userRegister);
router.post('/user-login', userLogin);
router.post('/user-logout', userLogout);

module.exports = router;