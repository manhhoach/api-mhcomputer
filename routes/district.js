const express = require('express');
const router = express.Router();
const districtController = require('./../controllers/districtController');

router.get('/:cityId', districtController.getAllByCityId); 

module.exports = router;