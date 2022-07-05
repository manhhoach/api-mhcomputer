const express = require('express');
const router = express.Router();
const wardController = require('./../controllers/wardController');

router.get('/:districtId', wardController.getAllByDistrictId); 

module.exports = router;