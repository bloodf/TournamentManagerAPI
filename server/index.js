/*eslint-disable */
const Hapi = require('hapi');
const config = require('config');
const HapiJWT = require('hapi-jsonwebtoken');

const corsHeaders = require('./middleware/corsHeader');
const routes = require('./routes');
const HapiJWTConfig = require('./authentication/jsonwebtoken');

const index = new Hapi.Server({
  port: config.get('app.port'),
});

index.ext('onPreResponse', corsHeaders);
index.register(HapiJWT.plugin);

index.auth.strategy('jwt', 'hapi-jsonwebtoken', HapiJWTConfig);
index.auth.default('jwt');

index.route(routes);

module.exports = index;
