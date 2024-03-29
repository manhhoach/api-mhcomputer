const express = require('express');
const router = express.Router();
const jwt_token = require('./../middlewares/jwt_token')
const brandController = require('./../controllers/brand');
const validateBrand=require('./../validations/brand')
const {TYPE_VALIDATE} = require('./../utils/constants/typeValidate')


router.get('/all-paging', brandController.getAllPaging);
router.get('/', brandController.getAll);
router.get('/:id', brandController.getById);

router.use(jwt_token.checkAccessToken);
router.use(jwt_token.checkAdmin)

router.put('/:id', validateBrand(TYPE_VALIDATE.UPDATE),brandController.update);
router.post('/', validateBrand(TYPE_VALIDATE.CREATE), brandController.create);
router.delete('/:id', brandController.destroy);


module.exports = router;