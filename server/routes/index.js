/*eslint-disable */
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const index = [];

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    index.push(require(path.join(__dirname, file)));
  });

module.exports = _.flattenDeep(index);
