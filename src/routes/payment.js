const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment');
const {TYPE_VALIDATE} = require('./../utils/constants/typeValidate')

router.post('/create-session', paymentController.createSession);
router.get('/get-status-payment/:status', paymentController.checkout);

router.use('/create-payment-intent', paymentController.createPaymentIntent);

module.exports = router;
