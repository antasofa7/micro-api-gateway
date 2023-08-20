const express = require('express');

const router = express.Router();

const refreshTokenHandler = require('./handler/refresh-token');

router.post('/', refreshTokenHandler.refreshToken);

module.exports = router;
