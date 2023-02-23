const express = require('express');
const router = express.Router();
const assessController = require('./../controllers/assess');
const jwt_token=require('./../middlewares/jwt_token');
const validateAssess = require('./../validations/assess')

router.get('/product/:id', assessController.getAssessOfProduct); 
router.get('/statistical/:productId', assessController.statistical); 

router.use(jwt_token.checkAccessToken)
router.get('/my-assesses', assessController.getMyAssesses); 
router.post('/:orderDetailId', validateAssess('CREATE'), assessController.create); 

router.use(jwt_token.checkAdmin)
router.put('/:id', validateAssess('UPDATE'), assessController.update); 
router.delete('/:id', assessController.destroy); 


module.exports = router;