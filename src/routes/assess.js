const express = require('express');
const router = express.Router();
const assessController = require('./../controllers/assess');
const jwt_token=require('./../middlewares/jwt_token')

router.get('/product/:id', assessController.getAssessOfProduct); 
router.get('/statistical/:productId', assessController.statistical); 

router.use(jwt_token.checkAccessToken)
router.get('/my-assesses', assessController.getMyAssesses); 
router.post('/', assessController.create); 
router.use(jwt_token.checkAdmin)
router.put('/:id', assessController.update); 
router.delete('/:id', assessController.destroy); 


module.exports = router;