const express = require('express');

const router = express.Router();

const lessonsHandler = require('./handler/lessons');

router.get('/', lessonsHandler.getAll);
router.get('/:id', lessonsHandler.get);

router.post('/', lessonsHandler.create);
router.patch('/:id', lessonsHandler.update);
router.delete('/:id', lessonsHandler.destroy);

module.exports = router;
