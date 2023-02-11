const cloudinary = require('cloudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const { getFileName } = require('./../utils/getFileName')
const multer = require('multer')
const { CLOUDINARY_CONFIG } = require('./../config/cloudinary')

cloudinary.config(CLOUDINARY_CONFIG)

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'computer',
    public_id: (req, file) => {
      return `${Date.now()}-${getFileName(file.originalname)}`
    }
  }

})

const upload = multer({ storage: storage })

module.exports = upload;