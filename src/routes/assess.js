const express = require('express');
const router = express.Router();
const assessController = require('./../controllers/assess');
const jwt_token=require('./../middlewares/jwt_token');
const validateAssess = require('./../validations/assess')
const {TYPE_VALIDATE} = require('./../utils/constants/typeValidate')

router.get('/product/:id', assessController.getAssessOfProduct); 
router.get('/statistical/:productId', assessController.statistical); 

router.use(jwt_token.checkAccessToken)
router.get('/my-assesses', assessController.getMyAssesses); 
router.post('/:orderDetailId', validateAssess(TYPE_VALIDATE.CREATE), assessController.create); 

router.use(jwt_token.checkAdmin)
router.put('/:id', validateAssess(TYPE_VALIDATE.UPDATE), assessController.update); 
router.delete('/:id', assessController.destroy); 


module.exports = router;