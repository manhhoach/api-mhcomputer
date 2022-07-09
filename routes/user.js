const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');
const jwt_token = require('./../middlewares/jwt_token')
const passportGoogle = require('./../utils/passportGoogle')
const passportFacebook = require('./../utils/passportFacebook')



router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/login-with-google', userController.loginWithGoogleAPI);
router.post('/login-with-facebook', userController.loginWithFacebookAPI);


router.post('/forgot-password', userController.forgotPassword)
router.put('/reset-password/:token', userController.resetPassword)


router.use(passportGoogle.initialize());
router.get('/auth/google', passportGoogle.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passportGoogle.authenticate('google', { session: false }), userController.loginWithGoogle);


// router.use(passportFacebook.initialize())
// router.get('/auth/facebook', passportFacebook.authenticate('facebook'));
// router.get('/auth/facebook/callback', passportFacebook.authenticate('facebook', { session: false }), userController.loginWithFacebook);





router.use(jwt_token.checkToken)
router.get('/me', userController.getMe);
router.put('/me', userController.updateMe);
router.put('/change-password', userController.changePassword);
//router.post('/verify-email', userController.verifyEmail);

router.use(jwt_token.checkOwner);
router.get('/all', userController.getAll);
router.put('/update-admin', userController.updateToAdmin);


module.exports = router;