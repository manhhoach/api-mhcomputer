const express = require('express');
const router = express.Router();
const jwt_token = require('./../middlewares/jwt_token');
const productController = require('./../controllers/productController');


router.get('/all-paging', productController.getAllPaging);
router.get('/:id', productController.getById);


router.use(jwt_token.checkToken)
router.use(jwt_token.checkAdmin)
router.post('/', productController.create);
router.delete('/', productController.delete);
router.put('/:id', productController.update);


module.exports = router;