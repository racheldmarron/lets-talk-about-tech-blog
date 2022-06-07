const routes = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes')

routes.use('/user', userRoutes);
routes.use('/post', postRoutes);
routes.use('/comment', commentRoutes);

module.exports = router;