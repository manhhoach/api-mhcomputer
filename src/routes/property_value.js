const express = require('express');
const router = express.Router();
const propertyValueController = require('./../controllers/property_value');
const {TYPE_VALIDATE} = require('./../utils/constants/typeValidate')
const propertyValueValidate=require('./../validations/property_value')
const jwt_token = require('./../middlewares/jwt_token')

router.use(jwt_token.checkAccessToken);
router.use(jwt_token.checkAdmin)

router.put('/:id',propertyValueValidate(TYPE_VALIDATE.UPDATE), propertyValueController.update);
router.post('/', propertyValueValidate(TYPE_VALIDATE.CREATE), propertyValueController.create);
router.delete('/:id', propertyValueController.delete);


module.exports = router;