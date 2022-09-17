const cloudinary = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const { getFileName } = require('./../utils/getFileName')
const multer = require('multer')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})


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