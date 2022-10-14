const express = require('express');
const router = express.Router();
const orderController = require('./../controllers/orderController');
const orderDetailController = require('./../controllers/orderDetailController');
const jwt_token = require('./../middlewares/jwt_token')

router.use(jwt_token.checkToken);

router.get('/', orderController.getAll);
router.put('/:id', orderDetailController.updateQuantity);
router.post('/', orderController.create);
router.delete('/:id', orderDetailController.destroy);

router.post('/check-out', orderController.checkOut);


module.exports = router;