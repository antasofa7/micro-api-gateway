const express = require('express');

const router = express.Router();

const coursesHandler = require('./handler/courses');

const verifyToken = require('../middlewares/verifyToken');
const can = require('../middlewares/permission');

router.get('/', coursesHandler.getAll);
router.get('/:id', coursesHandler.get);

router.post('/', verifyToken, can('ADMIN'), coursesHandler.create);
router.patch('/:id', verifyToken, can('ADMIN', 'STUDENT'), coursesHandler.update);
router.delete('/:id', verifyToken, can('ADMIN'), coursesHandler.destroy);

module.exports = router;
