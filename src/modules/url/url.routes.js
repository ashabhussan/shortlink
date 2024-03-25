const { Router } = require('express');
const { createShortUrl } = require('./url.controller');

const router = Router();

router.post('/create', createShortUrl);

module.exports = router;
