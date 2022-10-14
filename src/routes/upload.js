const express = require('express');
const router = express.Router();
const upload = require('./../middlewares/upload')
const uploadController = require('./../controllers/uploadController');



router.post('/single', upload.single('file'), uploadController.uploadSingle);
router.post('/array', upload.array('files'), uploadController.uploadArray);
router.get('/', uploadController.get);

module.exports = router;