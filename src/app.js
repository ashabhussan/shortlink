const express = require('express');
const { v1Router, redirectRouter } = require('./routes');
const { errorMiddleware } = require('./middleware');

const app = express();

app.use(express.json());

app.use('/v1', v1Router);
app.use('/', redirectRouter);

app.use(errorMiddleware);

module.exports = app;
