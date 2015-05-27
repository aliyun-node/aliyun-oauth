'use strict';

var utils = require('../lib/utils');
var expect = require('expect.js');

describe('/utils', function () {
  it('createTimestamp should ok', function () {
    var timestamp = utils.createTimestamp();
    expect(timestamp * 1000).to.be.below(Date.now());
  });

  it('encode should ok', function () {
    var encoded = utils.encode('中文');
    expect(encoded).to.be('%E4%B8%AD%E6%96%87');
  });

  it('normalize should ok', function () {
    var obj = {'key': 'value', 'key2': 'value1', 'key1': 'value2'};
    var normalized = utils.normalize(obj);
    var result = [['key', 'value'], ['key1', 'value2'], ['key2', 'value1']];
    expect(normalized).to.eql(result);
  });

  it('buildAuth should ok', function () {
    var val = utils.buildAuth([['oauth_token', 'token'], ['key', 'value']]);
    expect(val).to.be('OAuth oauth_token="token", key="value"');
  });
});
