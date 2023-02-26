const express = require('express');
const router = express.Router();
const jwt_token = require('./../middlewares/jwt_token')
const showRoomController = require('./../controllers/show_room');
const {TYPE_VALIDATE} = require('./../utils/constants/typeValidate')
const validateShowRoom=require('./../validations/show_room')
const validateStored=require('./../validations/stored_product')


router.get('/', showRoomController.getAll);
router.get('/all-paging', showRoomController.getAllPaging);

router.use(jwt_token.checkAccessToken);
router.use(jwt_token.checkAdmin)


router.get('/get-product/:id',showRoomController.getProductInShowRoom);
router.post('/add-product', validateStored(TYPE_VALIDATE.CREATE), showRoomController.addProductInShowRoom);
router.put('/update-quantity/:id', validateStored(TYPE_VALIDATE.UPDATE), showRoomController.updateQuantityInShowRoom);


router.put('/:id',validateShowRoom(TYPE_VALIDATE.UPDATE), showRoomController.update);
router.post('/', validateShowRoom(TYPE_VALIDATE.CREATE), showRoomController.create);
router.delete('/:id', showRoomController.destroy);


module.exports = router;