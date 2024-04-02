const express = require('express');
const { apiRouter, redirectRouter } = require('./routes');
const { errorMiddleware } = require('./middleware');

const app = express();

app.use(express.json());

app.use('/api', apiRouter);
app.use('/', redirectRouter);

app.use(errorMiddleware);

module.exports = app;
