const express = require('express');
const router = express.Router();
const { uploadMemoryStorage, uploadCloudStorage } = require('./../middlewares/upload')
const uploadController = require('./../controllers/upload');
const { validateUploadSingle } = require('./../validations/upload');


router.post('/single', uploadMemoryStorage.single('file'), validateUploadSingle, uploadController.uploadSingle);
router.post('/array', uploadCloudStorage.array('files'), uploadController.uploadArray);


module.exports = router;