const express = require('express');
const { apiRouter, redirectRouter } = require('./routes');

const app = express();

app.use(express.json());
app.use('/api', apiRouter);
app.use('/', redirectRouter);

module.exports = app;
