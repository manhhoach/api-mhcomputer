const multer = require('multer')

const memoryStorage = multer.memoryStorage()
const uploadMemoryStorage = multer({
  storage: memoryStorage
})

module.exports = {
  uploadMemoryStorage
};







// const cloudinary = require('./../config/cloudinary')
// const {validateUploadArray}=require('./../validations/upload')
// const { CloudinaryStorage } = require('multer-storage-cloudinary')
// const { getFileName } = require('./../utils/getFileName')
// const cloudStorage = new CloudinaryStorage({
//   cloudinary: cloudinary.v2,
//   params: {
//     folder: 'computer',
//     public_id: (req, file) => {
//       return `${Date.now()}-${getFileName(file.originalname)}`
//     }
//   }
// })

// const uploadCloudStorage = multer({ 
//   storage: cloudStorage,
//   fileFilter: (req, file, cb) => {
//     console.log('file in middleware', file);
//     if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//     }
//   }
// })

