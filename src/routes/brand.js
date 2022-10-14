const express = require('express');
const router = express.Router();
const jwt_token = require('./../middlewares/jwt_token')
const brandController = require('./../controllers/brandController');


router.get('/', brandController.getAll);
router.get('/:id', brandController.getById);

router.use(jwt_token.checkToken);
router.use(jwt_token.checkAdmin)

router.put('/:id', brandController.update);
router.post('/', brandController.create);
router.delete('/:id', brandController.destroy);


module.exports = router;