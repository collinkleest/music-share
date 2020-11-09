const { Router } = require('express');
const { v1Router } = require('./v1/index.js');

const apiRouter = Router();

apiRouter.use('/v1', v1Router);

module.exports = {apiRouter};