const { Router } = require('express');
const { authRouter } = require('../modules/auth');
const { urlRouter } = require('../modules/url');
const { authMiddleware } = require('../middleware');

const router = Router();

router.use('/users', authRouter);
router.use('/urls', authMiddleware, urlRouter);

module.exports = router;
