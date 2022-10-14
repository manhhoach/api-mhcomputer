const express = require('express');
const router = express.Router();
const categoryController = require('./../controllers/categoryController');
const jwt_token = require('./../middlewares/jwt_token')


router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getById);

router.use(jwt_token.checkToken);
router.use(jwt_token.checkAdmin)

router.put('/:id', categoryController.update);
router.post('/', categoryController.create);
router.delete('/:id', categoryController.destroy);


module.exports = router;