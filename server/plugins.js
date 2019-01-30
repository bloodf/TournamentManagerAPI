/*eslint-disable */
const config = require('config');

const Acl = require('./authentication/acl');
const Package = require('../package.json');

const DEVELOPMENT = 'development';

const ACLAUTH = {
  plugin: require('hapi-acl-auth'),
  options: {
    handler: Acl.handler,
  },
};

const plugins = [];

module.exports = plugins;
