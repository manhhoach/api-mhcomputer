const express = require('express');
const router = express.Router();
const orderController = require('./../controllers/orderController');
const orderDetailController = require('./../controllers/orderDetailController');
const jwt_token = require('./../middlewares/jwt_token')


// for client
router.use(jwt_token.checkToken);
router.get('/client', orderController.getMyOrderForClient);
router.put('/client/:orderId', orderController.updateStatusForClient);

// for admin
router.use(jwt_token.checkAdmin)
router.get('/admin', orderController.getMyOrderForAdmin);
router.put('/admin/:orderId', orderController.updateStatusForAdmin);





module.exports = router;