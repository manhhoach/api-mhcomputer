const express = require('express');
const router = express.Router();
const bannerController = require('./../controllers/bannerController');
const jwt_token=require('./../middlewares/jwt_token')

router.get('/', bannerController.getAll);
router.use(jwt_token.checkToken)
router.use(jwt_token.checkAdmin)
router.post('/', bannerController.create); // xong
router.put('/:id', bannerController.update); // xong
router.delete('/:id', bannerController.destroy); // xong


module.exports = router;