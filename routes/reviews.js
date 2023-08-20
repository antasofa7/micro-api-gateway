const express = require('express');

const router = express.Router();

const reviewsHandler = require('./handler/reviews');

router.post('/', reviewsHandler.create);
router.patch('/:id', reviewsHandler.update);
router.delete('/:id', reviewsHandler.destroy);

module.exports = router;
