const {v2: cloudinary} = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
  // cloudinary: cloudinary,
  cloudinary,
   // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png', 'svg'],
  params: { folder: 'Van_Swap' } 
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
//   }
});

//                        storage: storage
const uploadCloud = multer({ storage });

module.exports = uploadCloud;