const express = require('express');
const router = express.Router();
const controller = require('../controllers/order');

router.get('/', controller.getAll);
router.post('/', controller.crete);

module.exports = router;