const { Router } = require('express');
const { redirectShortUrl } = require('../modules/url');

const router = Router();

router.get('/:shortCode', redirectShortUrl);

module.exports = router;
