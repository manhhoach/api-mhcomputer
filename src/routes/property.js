const express = require('express');
const router = express.Router();
const propertyController = require('./../controllers/property');
const {TYPE_VALIDATE} = require('./../utils/constants/typeValidate')

router.get('/', propertyController.getAll);
//router.put('/:id', propertyController.update);
router.post('/', propertyController.create);
// router.delete('/:id', propertyController.delete);
// router.get('/:id', propertyController.getById);

module.exports = router;