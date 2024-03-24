const { Router } = require('express');
const authRouter = require('../modules/auth/auth.routes');

const router = Router();

router.use('/users', authRouter);

module.exports = router;
