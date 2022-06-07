// Trying to get rid of code: 'ERR_INVALID_ARG_TYPE' when running node server.js
// app.use(noopServiceWorkerMiddleware('/'));

const routes = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes')

routes.use('/user', userRoutes);
routes.use('/post', postRoutes);
routes.use('/comment', commentRoutes);

module.exports = routes;