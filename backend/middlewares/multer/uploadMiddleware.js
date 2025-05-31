const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Epiblog',
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    }
});

const parser = multer({ storage: storage });

module.exports = parser;