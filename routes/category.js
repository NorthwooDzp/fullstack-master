const express = require('express');
const passport = require('passport');
const controller = require('../controllers/category');
const router = express.Router();

const guard = passport.authenticate('jwt', {session: false});

router.get('/', guard, controller.getAll);
router.get('/:id', controller.getById);
router.delete('/:id', controller.remove);
router.post('/', controller.create);
router.put(':id', controller.update);

module.exports = router;