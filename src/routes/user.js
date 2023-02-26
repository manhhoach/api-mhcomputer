const express = require('express');
const router = express.Router();
const userController = require('./../controllers/user');
const jwt_token = require('./../middlewares/jwt_token')
const { TYPE_VALIDATE } = require('./../utils/constants/typeValidate')
const validateUser = require('./../validations/user')

router.post('/refresh-access-token', userController.refreshToken);
router.post('/register', validateUser(TYPE_VALIDATE.CREATE), userController.register);
router.post('/login', validateUser(TYPE_VALIDATE.LOGIN), userController.login);
router.post('/login-with-google', userController.loginWithGoogleAPI);
router.post('/login-with-facebook', userController.loginWithFacebookAPI);


router.post('/forgot-password', userController.forgotPassword)
router.put('/reset-password/:token', userController.resetPassword)




router.use(jwt_token.checkAccessToken)
router.get('/me', userController.getMe);
router.put('/me', validateUser(TYPE_VALIDATE.UPDATE), userController.updateMe);
router.put('/change-password', userController.changePassword);
//router.post('/verify-email', userController.verifyEmail);

router.use(jwt_token.checkOwner);
router.get('/all', userController.getAll);
router.put('/update-admin', userController.updateToAdmin);


module.exports = router;