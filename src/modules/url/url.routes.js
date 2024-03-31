const { Router } = require('express');
const { createShortUrl, getUrls, deleteUrl } = require('./url.controller');

const router = Router();

router.get('/', getUrls);
router.post('/', createShortUrl);
router.delete('/:urlId', deleteUrl);

module.exports = router;
