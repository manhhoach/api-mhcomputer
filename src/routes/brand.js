const express = require('express');
const router = express.Router();
const jwt_token = require('./../middlewares/jwt_token')
const brandController = require('./../controllers/brand');
const validateBrand=require('./../validations/brand')

router.get('/all-paging', brandController.getAllPaging);
router.get('/', brandController.getAll);
router.get('/:id', brandController.getById);

router.use(jwt_token.checkAccessToken);
router.use(jwt_token.checkAdmin)

router.put('/:id', validateBrand('UPDATE'),brandController.update);
router.post('/', validateBrand('CREATE'), brandController.create);
router.delete('/:id', brandController.destroy);


module.exports = router;