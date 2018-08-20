const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'uploads/');
    },
    filename(req, file, callback) {
        const date = moment().format('DD_MM_YYYY-HHmmss_SSS');
        console.log(file);
        callback(null, `${date}_${file.originalname}`);
    }
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        callback(null, true);
    } else {
        callback(null, false);
    }
};

const limits = {
    filesize: 1024 * 1024 * 5
};

module.exports = multer({
    storage, fileFilter, limits
});