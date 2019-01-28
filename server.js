const Hapi = require('hapi');
const config = require('config');
const HapiJWT = require('hapi-jsonwebtoken');

const routes = require('./routes');
const HapiJWTConfig = require('./server/authentication/jsonwebtoken');

const server = new Hapi.Server({
  port: config.get('app.port'),
});

server.register(HapiJWT.plugin);

server.auth.strategy('jwt', 'hapi-jsonwebtoken', HapiJWTConfig);
server.auth.default('jwt');

// attach routes here
server.route(routes);

// export modules
module.exports = server;
