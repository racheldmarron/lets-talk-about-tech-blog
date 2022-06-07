const routes = require('express').Router(); 
const apiRoutes = require('./api'); 
const homepageRoutes = require('.homepageRoutes'); 
const dashboardRoutes = require('./dashboardRoutes'); 

routes.use('/', homepageRoutes);
routes.use('/', dashboardRoutes); 
routes.use('/api', require(apiRoutes));

module.exports = routes
