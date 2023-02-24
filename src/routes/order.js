const express = require('express');
const router = express.Router();
const orderController = require('./../controllers/order');
const jwt_token = require('./../middlewares/jwt_token')
const {TYPE_VALIDATE} = require('./../utils/constants/typeValidate')
const orderValidate= require('./../validations/order')

router.use(jwt_token.checkAccessToken);

router.get('/', orderController.getOrdersByStatus);
router.put('/:id', orderValidate(TYPE_VALIDATE.UPDATE), orderController.updateStatusOrder);






module.exports = router;