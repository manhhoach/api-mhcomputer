const express = require('express');
const router = express.Router();
const jwt_token = require('./../middlewares/jwt_token')
const showRoomController = require('./../controllers/showRoomController');


router.get('/', showRoomController.getAll);

router.use(jwt_token.checkAccessToken);
router.use(jwt_token.checkAdmin)


router.get('/manage-product/:id',showRoomController.getProductInShowRoom);
router.post('/manage-product/:id',showRoomController.addProductInShowRoom);
router.put('/manage-product/:id',showRoomController.updateQuantityInShowRoom);


router.put('/:id', showRoomController.update);
router.post('/', showRoomController.create);
router.delete('/:id', showRoomController.destroy);


module.exports = router;