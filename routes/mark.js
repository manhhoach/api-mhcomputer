const express = require('express');
const router = express.Router();
const markController = require('./../controllers/markController');
const jwt_token=require('./../middlewares/jwt_token')


router.use(jwt_token.checkToken)
router.get('/', markController.getMarkList); 
router.post('/', markController.create); 
//router.put('/:id', markController.update); 
router.delete('/:id', markController.destroy); 


module.exports = router;