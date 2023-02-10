const express = require('express');
const router = express.Router();
const orderController = require('./../controllers/orderController');
const orderDetailController = require('./../controllers/orderDetailController');
const jwt_token = require('./../middlewares/jwt_token')

router.use(jwt_token.checkToken);

router.get('/', orderController.getProductsInCart);
router.put('/:orderDetailId', orderDetailController.updateQuantity);
router.post('/', orderController.addProductInCart);
router.delete('/:orderDetailId', orderDetailController.removeProduct);

router.post('/check-out', orderController.checkOut);


module.exports = router;