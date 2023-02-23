const express = require('express');
const router = express.Router();
const addressController = require('../controllers/address');
const jwt_token = require('./../middlewares/jwt_token')
const validateAddress = require('./../validations/address')

router.use(jwt_token.checkAccessToken);

router.get('/', addressController.getAll);

router.post('/', validateAddress('CREATE'), addressController.create);

router.put('/:id', validateAddress('UPDATE'), addressController.update);

router.delete('/:id', addressController.destroy);


module.exports = router;