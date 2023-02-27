const express = require('express');
const router = express.Router();
const { uploadMemoryStorage } = require('./../middlewares/upload')
const uploadController = require('./../controllers/upload');
const { validateUpload } = require('./../validations/upload');
const {TYPE_VALIDATE} = require('./../utils/constants/typeValidate')

router.post('/single', uploadMemoryStorage.single('file'), validateUpload(TYPE_VALIDATE.SINGLE), uploadController.uploadSingle);
router.post('/array', uploadMemoryStorage.array('files'), validateUpload(TYPE_VALIDATE.ARRAY), uploadController.uploadArray);


module.exports = router;