'use strict';

var OAuth = require('../lib/oauth');
var expect = require('expect.js');

const KEY = process.env.AKID;

describe('/oauth', function () {
  it('should ok', function () {
    var client = new OAuth('key', 'secret');
    expect(client.key).to.be('key');
    expect(client.secret).to.be('secret');
    expect(client.prefix).to.be('https://account.aliyun.com/');
  });

  it('buildParams should ok', function () {
    var client = new OAuth('key', 'secret');
    var params = client.buildParams();
    expect(params.oauth_consumer_key).to.be('key');
    expect(params.oauth_signature_method).to.be('HMAC-SHA1');
    expect(params.oauth_version).to.be('1.0');
  });

  it('getAuthUrl should ok', function () {
    var client = new OAuth('key', 'secret');
    var url = client.getAuthUrl('token');
    expect(url).to.be('https://account.aliyun.com/oauth/authorize?oauth_token=token');
  });

  it('signature should ok', function () {
    var client = new OAuth('key', 'secret');
    var sign = client.signature('url', 'method', [['key1', 'value1']], 'secret');
    expect(sign).to.be('Zbqq/HOepidNCxuW/4aZ9LLv4oo=');
  });

  it('requestToken 40110', function * () {
    var client = new OAuth('key', 'secret');
    try {
      yield client.requestToken('http://callback/url');
    } catch (ex) {
      expect(ex.message).to.be('OpenAPI: code(40110), message(consumer_key_invalid)');
      return;
    }
    expect(false).to.be('should not execute to here');
  });

  it('requestToken 40107', function * () {
    var client = new OAuth(KEY, 'secret');
    try {
      yield client.requestToken('http://callback/url');
    } catch (ex) {
      expect(ex.message).to.be('OpenAPI: code(40107), message(signature_invalid)');
      return;
    }
    expect(false).to.be('should not execute to here');
  });

  it('getAccessToken 40113', function * () {
    var client = new OAuth(KEY, 'secret');
    try {
      yield client.getAccessToken('token', 'verifier', 'secret');
    } catch (ex) {
      expect(ex.message).to.be('OpenAPI: code(40113), message(token_expired)');
      return;
    }
    expect(false).to.be('should not execute to here');
  });
});
