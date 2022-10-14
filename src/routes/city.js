const express = require('express');
const router = express.Router();
const cityController = require('./../controllers/cityController');

router.get('/', cityController.getAll); 

module.exports = router;