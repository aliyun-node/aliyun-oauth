'use strict';

var querystring = require('querystring');
var kitx = require('kitx');
var httpx = require('httpx');
var utils = require('./utils');

var OAuth = function (key, secret) {
  this.key = key;
  this.secret = secret;
  this.prefix = 'https://account.aliyun.com/';
};

OAuth.prototype.buildParams = function () {
  return {
    oauth_consumer_key: this.key,
    oauth_nonce: parseInt((Math.random() * 100000000000), 10),
    oauth_timestamp: utils.createTimestamp(),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_version: '1.0'
  };
};

OAuth.prototype._request = function* (url, data, secret) {
  var params = this.buildParams();
  Object.assign(params, data);

  var method = 'GET';
  var normalized = utils.normalize(params);
  var signatured = this.signature(url, method, normalized, secret);
  normalized.push(['oauth_signature', utils.encode(signatured)]);
  var opts = {
    method: method,
    headers: {'Authorization': utils.buildAuth(normalized)}
  };
  var response = yield httpx.request(url, opts);
  var body = yield httpx.read(response, 'utf8');
  var contentType = response.headers['content-type'] || '';
  if (contentType.indexOf('application/x-www-form-urlencoded') !== -1) {
    return querystring.parse(body);
  }

  var json;
  try {
    json = JSON.parse(body);
  } catch (ex) {
    // keep the raw data
    ex.data = body;
    throw ex;
  }

  if (json.errorCode) {
    throw new Error('OpenAPI: code(' + json.errorCode + '), ' +
      'message(' + json.errorMsg + ')');
  }
  return json;
};

OAuth.prototype.requestToken = function * (callbackUrl) {
  var url = this.prefix + 'oauth/request_token';
  var opts = {
    oauth_callback: utils.encode(callbackUrl)
  };
  return yield this._request(url, opts);
};

OAuth.prototype.getAccessToken = function * (token, verifier, secret) {
  var url = this.prefix + 'oauth/access_token';
  var opts = {
    oauth_token: token,
    oauth_verifier: verifier
  };
  return yield this._request(url, opts, secret);
};

OAuth.prototype.getAuthUrl = function (token) {
  return this.prefix + 'oauth/authorize?oauth_token=' + token;
};

OAuth.prototype.signature = function (url, method, normalized, secret) {
  var methodPart = method.toUpperCase();
  var urlPart = utils.encode(url);

  var parts = [];
  for (var i = 0; i < normalized.length; i++) {
    parts.push(normalized[i].join('='));
  }

  var params = utils.encode(parts.join('&'));
  var baseString = [methodPart, urlPart, params].join('&');
  var key = utils.encode(this.secret) + '&' + utils.encode(secret || '');

  return kitx.sha1(baseString, key, 'base64');
};

module.exports = OAuth;
