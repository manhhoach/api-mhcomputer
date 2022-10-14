const express = require('express');
const router = express.Router();
const propertyValueController = require('./../controllers/propertyValueController');


router.get('/', propertyValueController.getAll);
// router.put('/:id', propertyValueController.update);
router.post('/', propertyValueController.create);
// router.delete('/:id', propertyValueController.delete);
// router.get('/:id', propertyValueController.getById);

module.exports = router;