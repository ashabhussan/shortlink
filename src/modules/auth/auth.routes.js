const { Router } = require('express');
const { createUser, login } = require('./auth.controller');

const router = Router();

router.post('/create', createUser);
router.post('/login', login);

module.exports = router;
