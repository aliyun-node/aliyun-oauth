'use strict';

const KEY = process.env.AKID;

var OAuth = require('../');
var expect = require('expect.js');

describe('/openapi', function () {
  it('load should ok', function* () {
    var client = new OAuth(KEY, 'secret');
    try {
      yield client.load('token', 'secret');
    } catch (ex) {
      expect(ex.message).to.be('OpenAPI: code(40115), message(token_illegal)');
      return;
    }
    expect(false).to.be('should not execute to here');
  });

  it('aliyunid_kp should ok', function* () {
    var client = new OAuth(KEY, 'secret');
    try {
      yield client.aliyunid_kp('token', 'secret');
    } catch (ex) {
      expect(ex.message).to.be('OpenAPI: code(40115), message(token_illegal)');
      return;
    }
    expect(false).to.be('should not execute to here');
  });

  it('timestamp should ok', function* () {
    var client = new OAuth(KEY, 'secret');
    try {
      yield client.timestamp('secret');
    } catch (ex) {
      expect(ex.message).to.be('OpenAPI: code(401), message(access forbidden)');
      return;
    }
    expect(false).to.be('should not execute to here');
  });

  it('check should ok', function* () {
    var client = new OAuth(KEY, 'secret');
    try {
      yield client.check('aliyunid', 'token', 'secret');
    } catch (ex) {
      expect(ex.message).to.be('OpenAPI: code(40115), message(token_illegal)');
      return;
    }
    expect(false).to.be('should not execute to here');
  });

  it('check_accesstoken_kp should ok', function* () {
    var client = new OAuth(KEY, 'secret');
    try {
      yield client.check_accesstoken_kp('kp', 'token', 'secret');
    } catch (ex) {
      expect(ex.message).to.be('OpenAPI: code(40115), message(token_illegal)');
      return;
    }
    expect(false).to.be('should not execute to here');
  });
});
