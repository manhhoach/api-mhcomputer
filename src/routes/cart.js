const express = require('express');
const router = express.Router();
const orderController = require('./../controllers/order');
const orderDetailController = require('./../controllers/order_detail');
const jwt_token = require('./../middlewares/jwt_token')

router.use(jwt_token.checkAccessToken);

router.get('/', orderController.getProductsInCart);
router.put('/:orderDetailId', orderDetailController.updateQuantity);
router.post('/', orderController.addProductInCart);
router.delete('/:orderDetailId', orderDetailController.removeProduct);

router.post('/check-out', orderController.checkOut);


module.exports = router;