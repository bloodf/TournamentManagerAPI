const Hapi = require('hapi');
const config = require('config');

const routes = require('./routes');
const plugins = require('./plugins');
const logger = require('./server/utils/logger');

const server = new Hapi.Server({
  port: config.get('app.port'),
});


// attach routes here
server.route(routes);

// export modules
module.exports = server;
