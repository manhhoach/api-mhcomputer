const express = require('express');
const router = express.Router();
const jwt_token = require('./../middlewares/jwt_token');
const productController = require('./../controllers/product');
const {TYPE_VALIDATE} = require('./../utils/constants/typeValidate')
const validateProduct = require ('./../validations/product')


router.get('/all-paging', productController.getAllPaging);
router.get('/:id', productController.getById);


router.use(jwt_token.checkAccessToken)
router.use(jwt_token.checkAdmin)
router.post('/', validateProduct(TYPE_VALIDATE.CREATE), productController.create);
router.delete('/:id', productController.delete);
router.put('/:id', validateProduct(TYPE_VALIDATE.UPDATE), productController.update);


module.exports = router;