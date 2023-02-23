const express = require('express');
const router = express.Router();
const addressController = require('./../controllers/addressController');
const jwt_token = require('./../middlewares/jwt_token')
const validateAddress = require('./../validations/address')

router.use(jwt_token.checkAccessToken)
router.get('/', addressController.getAll);
router.put('/:id', addressController.update);
router.post('/', validateAddress, addressController.create);
router.delete('/:id', addressController.destroy);


module.exports = router;