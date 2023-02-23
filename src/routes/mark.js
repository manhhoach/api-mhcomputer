const express = require('express');
const router = express.Router();
const markController = require('./../controllers/mark');
const jwt_token=require('./../middlewares/jwt_token')


router.use(jwt_token.checkAccessToken)
router.get('/', markController.getAll); 
router.post('/', markController.create); 
router.delete('/:id', markController.destroy); 


module.exports = router;