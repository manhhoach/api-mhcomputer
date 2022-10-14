const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');
const jwt_token = require('./../middlewares/jwt_token')



router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/login-with-google', userController.loginWithGoogleAPI);
router.post('/login-with-facebook', userController.loginWithFacebookAPI);


router.post('/forgot-password', userController.forgotPassword)
router.put('/reset-password/:token', userController.resetPassword)




router.use(jwt_token.checkToken)
router.get('/me', userController.getMe);
router.put('/me', userController.updateMe);
router.put('/change-password', userController.changePassword);
//router.post('/verify-email', userController.verifyEmail);

router.use(jwt_token.checkOwner);
router.get('/all', userController.getAll);
router.put('/update-admin', userController.updateToAdmin);


module.exports = router;