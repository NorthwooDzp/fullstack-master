const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'uploads/');
    },
    filename(req, file, callback) {
        const date = moment().format('DD_MM_YYYY-HHmmss_SSS');
        callback(null, `${file.originalname}-${date}`);
    }
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype == 'image/jpeg') {
        callback(null, true);
    } else {
        cb(null, false);
    }
};

const limits = {
    filesize: 1024 * 1024 * 5
};

module.exports = multer({
    storage, fileFilter, limits
});