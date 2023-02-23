const express = require('express');
const router = express.Router();
const bannerController = require('./../controllers/banner');
const jwt_token=require('./../middlewares/jwt_token')

router.get('/all-paging', bannerController.getAllPaging);
router.get('/', bannerController.getAll);
router.get('/:id', bannerController.getById);

router.use(jwt_token.checkAccessToken)
router.use(jwt_token.checkAdmin)
router.post('/', bannerController.create);
router.put('/:id', bannerController.update);
router.delete('/:id', bannerController.destroy);


module.exports = router;