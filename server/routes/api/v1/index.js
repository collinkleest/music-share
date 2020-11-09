const { Router } = require('express');
const { usersRouter } = require('./users/users.js');
const { spotifyRouter } = require('./spotify/spotify.js');
const v1Router = Router();

v1Router.use('/users', usersRouter);
v1Router.use('/spotify', spotifyRouter);

module.exports = {v1Router};