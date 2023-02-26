const { CloudinaryStorage } = require('multer-storage-cloudinary')
const { getFileName } = require('./../utils/getFileName')
const multer = require('multer')
const cloudinary = require('./../config/cloudinary')
const {validateUploadArray}=require('./../validations/upload')



const memoryStorage = multer.memoryStorage()
const uploadMemoryStorage = multer({
  storage: memoryStorage
})

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'computer',
    public_id: (req, file) => {
      return `${Date.now()}-${getFileName(file.originalname)}`
    }
  }
})

const uploadCloudStorage = multer({ 
  storage: cloudStorage,
  fileFilter: (req, files, cb)=>{{
    console.log(req.file, files);
  }}
})

module.exports = {
  uploadMemoryStorage, uploadCloudStorage
};