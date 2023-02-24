const express = require('express');
const router = express.Router();
const categoryController = require('./../controllers/category');
const jwt_token = require('./../middlewares/jwt_token')
const categoryValidate = require('./../validations/category');
const {TYPE_VALIDATE} = require('./../utils/constants/typeValidate')


router.get('/', categoryController.getAll);
router.use(jwt_token.checkAccessToken);
router.use(jwt_token.checkAdmin)
router.put('/:id',categoryValidate(TYPE_VALIDATE.UPDATE), categoryController.update);
router.post('/', categoryValidate(TYPE_VALIDATE.CREATE), categoryController.create);
router.delete('/:id', categoryController.destroy);


module.exports = router;