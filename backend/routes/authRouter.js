const router = require('express').Router();
const { userRegister, userLogin } = require('../controller/authController');

router.post('/user-register', userRegister);
router.post('/user-login', userLogin);

module.exports = router;