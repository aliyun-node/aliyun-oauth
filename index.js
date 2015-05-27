'use strict';

const OAuth = require('./lib/oauth');

Object.assign(OAuth.prototype,
  require('./lib/openapi'),
  require('./lib/innerapi'));

module.exports = OAuth;
