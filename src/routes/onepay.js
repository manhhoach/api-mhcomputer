const express = require('express');
const router = express.Router();
const onepayController = require('./../controllers/onepayController');


router.post('/checkout',onepayController.checkout);
router.get('/:gateway/callback', onepayController.callback);

module.exports = router;
