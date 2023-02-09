const router = require('router');
const { userRegister } = require('../controller/authController');
module.exports.authRouter = () => {
    router.post('/user-register', userRegister);
}