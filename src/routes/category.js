const express = require('express');
const router = express.Router();
const categoryController = require('./../controllers/category');
const jwt_token = require('./../middlewares/jwt_token')


router.get('/', categoryController.getAll);

router.use(jwt_token.checkAccessToken);
router.use(jwt_token.checkAdmin)

router.put('/:id', categoryController.update);
router.post('/', categoryController.create);
router.delete('/:id', categoryController.destroy);


module.exports = router;