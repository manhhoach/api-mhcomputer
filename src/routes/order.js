const express = require('express');
const router = express.Router();
const orderController = require('./../controllers/order');
const jwt_token = require('./../middlewares/jwt_token')



router.use(jwt_token.checkAccessToken);

router.get('/', orderController.getOrdersByStatus);
router.put('/:id', orderController.updateStatusOrder);






module.exports = router;