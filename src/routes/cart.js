const express = require('express');
const router = express.Router();
const orderController = require('./../controllers/order');
const orderDetailController = require('./../controllers/order_detail');
const jwt_token = require('./../middlewares/jwt_token')
const {TYPE_VALIDATE} = require('./../utils/constants/typeValidate')
const orderValidate= require('./../validations/order')


router.use(jwt_token.checkAccessToken);

router.get('/', orderController.getProductsInCart);
router.put('/:orderDetailId', orderDetailController.updateQuantity);
router.post('/', orderController.addProductInCart);
router.delete('/:orderDetailId', orderDetailController.removeProduct);

router.post('/check-out', orderValidate(TYPE_VALIDATE.CREATE), orderController.checkOut);


module.exports = router;