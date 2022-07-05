const express = require('express');
const router = express.Router();
const addressController = require('./../controllers/addressController');
const jwt_token=require('./../middlewares/jwt_token')

router.use(jwt_token.checkToken)
router.get('/', addressController.getAll); 
router.put('/:id', addressController.update); 
router.post('/', addressController.create); 
router.delete('/:id', addressController.destroy);


module.exports = router;