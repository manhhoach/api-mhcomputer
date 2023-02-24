const express = require('express');
const router = express.Router();
const propertyValueController = require('./../controllers/property_value');
const {TYPE_VALIDATE} = require('./../utils/constants/typeValidate')

router.get('/', propertyValueController.getAll);
// router.put('/:id', propertyValueController.update);
router.post('/', propertyValueController.create);
// router.delete('/:id', propertyValueController.delete);
// router.get('/:id', propertyValueController.getById);

module.exports = router;