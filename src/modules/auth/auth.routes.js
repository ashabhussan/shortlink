const { Router } = require('express');
const { createUser, login } = require('./auth.controller');

const authRouter = Router();

authRouter.post('/create', createUser);
authRouter.post('/login', login);

module.exports = authRouter;
