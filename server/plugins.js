/*eslint-disable */
const config = require('config');
const HapiResponseTime = require('hapi-response-time');
const MrHorse = require('mrhorse');
const disinfect = require('disinfect');
const Package = require('../package.json');

const AclPolicies = {
  plugin: MrHorse,
  options: {
    policyDirectory: `${__dirname}/policies`,
  },
};

const Cleaner = {
  plugin: disinfect,
  options: {
    disinfectQuery: true,
    disinfectParams: true,
    disinfectPayload: true,
  },
};

const HealthCheck = {
  plugin: require('hapi-and-healthy'),
  options: {
    custom: {},
    env: config.get('app.env'),
    name: Package.name,
    test: {
      node: [],
      features: [],
    },
    version: Package.version,
  },
};

const plugins = [
  HapiResponseTime,
  AclPolicies,
  Cleaner,
  HealthCheck,
];

module.exports = plugins;
