/*eslint-disable */
const config = require('config');
const HapiResponseTime = require('hapi-response-time');
const MrHorse = require('mrhorse');
const Package = require('../package.json');

const AclPolicies = {
  plugin: MrHorse,
  options: {
    policyDirectory: `${__dirname}/policies`,
  },
};

const plugins = [
  HapiResponseTime,
  AclPolicies
];

module.exports = plugins;
