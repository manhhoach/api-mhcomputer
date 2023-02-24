const express = require('express');
const router = express.Router();
const markController = require('./../controllers/mark');
const jwt_token = require('./../middlewares/jwt_token')
const markValidation = require('./../validations/mark')
const { TYPE_VALIDATE } = require('./../utils/constants/typeValidate')


router.use(jwt_token.checkAccessToken)
router.get('/', markController.getAll);
router.post('/', markValidation(TYPE_VALIDATE.CREATE), markController.create);
router.delete('/:id', markController.destroy);


module.exports = router;