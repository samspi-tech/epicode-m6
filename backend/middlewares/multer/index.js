const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Epiblog',
        format: async (req, file) => 'png',
        public_id: (req, file) => file.name,
    },
});

const cloudUpload = multer({ storage: cloudStorage });

module.exports = cloudUpload;
