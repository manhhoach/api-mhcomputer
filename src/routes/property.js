const express = require('express');
const router = express.Router();
const propertyController = require('./../controllers/property');
const { TYPE_VALIDATE } = require('./../utils/constants/typeValidate')
const propertyValidate = require('./../validations/property')
const jwt_token = require('./../middlewares/jwt_token');

router.get('/', propertyController.getAll);
router.use(jwt_token.checkAccessToken)
router.use(jwt_token.checkAdmin)
router.put('/:id', propertyValidate(TYPE_VALIDATE.UPDATE), propertyController.update);
router.post('/', propertyValidate(TYPE_VALIDATE.CREATE), propertyController.create);
router.delete('/:id', propertyController.delete);


module.exports = router;