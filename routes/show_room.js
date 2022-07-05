const express = require('express');
const router = express.Router();
const jwt_token = require('./../middlewares/jwt_token')
const showRoomController = require('./../controllers/showRoomController');


router.get('/', showRoomController.getAll);

router.use(jwt_token.checkToken);
router.use(jwt_token.checkAdmin)


router.get('/product/:id',showRoomController.getProductInShowRoom);
router.post('/product/:id',showRoomController.addProductInShowRoom);
router.put('/product/:id',showRoomController.updateQuantityInShowRoom);


router.put('/:id', showRoomController.update);
router.post('/', showRoomController.create);
router.delete('/:id', showRoomController.destroy);


module.exports = router;