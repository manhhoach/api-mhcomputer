const express = require('express');
const router = express.Router();
const addressController = require('../controllers/address');
const jwt_token = require('./../middlewares/jwt_token')
const validateAddress = require('./../validations/address')
const {TYPE_VALIDATE} = require('./../utils/constants/typeValidate')

router.use(jwt_token.checkAccessToken);

router.get('/', addressController.getAll);

router.post('/', validateAddress(TYPE_VALIDATE.CREATE), addressController.create);

router.put('/:id', validateAddress(TYPE_VALIDATE.UPDATE), addressController.update);

router.delete('/:id', addressController.destroy);


module.exports = router;