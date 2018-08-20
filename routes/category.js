const express = require('express');
const controller = require('../controllers/category');
const upload = require('../middleware/upload');
const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.delete('/:id', controller.remove);
router.post('/', upload.single('image'), controller.create);
router.put(':id', upload.single('image'), controller.update);

module.exports = router;