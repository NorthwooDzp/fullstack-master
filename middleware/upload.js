const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'uploads/')
    },
    filename(req, file, callback) {
        const date = moment().format('DD_MM_YYYY-HHmmss_SSS');
        callback(null, `${file.originalname}-${date}`)
    }
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/*') {
        console.log(file);
    }
};

module.exports = multer({
    storage
});