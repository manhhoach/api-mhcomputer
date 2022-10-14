const express = require('express');
const router = express.Router();
const assessController = require('./../controllers/assessController');
const jwt_token=require('./../middlewares/jwt_token')

router.get('/product/:id', assessController.getAssessOfProduct); // xong
router.get('/statistical/:productId', assessController.statistical); // xong
router.use(jwt_token.checkToken)
router.get('/my-assesses', assessController.getMyAssesses); // xong
router.post('/', assessController.create); // xong


router.use(jwt_token.checkAdmin)
router.put('/:id', assessController.update); // xong
router.delete('/:id', assessController.destroy); // xong


module.exports = router;