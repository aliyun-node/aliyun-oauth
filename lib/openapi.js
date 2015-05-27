'use strict';

exports.load = function * (token, secret) {
  var url = this.prefix + 'openapi/id/load';
  var opts = {oauth_token: token};
  return yield* this._request(url, opts, secret);
};

exports.aliyunid_kp = function * (token, secret) {
  var url = this.prefix + 'openapi/id/aliyunid_kp';
  var opts = {
    oauth_token: token
  };
  return yield* this._request(url, opts, secret);
};

exports.timestamp = function * (secret) {
  var url = this.prefix + 'openapi/util/timestamp';
  return yield* this._request(url, {}, secret);
};

exports.check = function * (aliyunId, token, secret) {
  var url = this.prefix + 'openapi/id/check';
  var opts = {
    oauth_token: token,
    aliyunID: aliyunId
  };
  return yield* this._request(url, opts, secret);
};

exports.check_accesstoken_kp = function * (kp, token, secret) {
  var url = this.prefix + 'openapi/id/check_accesstoken_kp';
  var opts = {
    oauth_token: token,
    kp: kp
  };
  return yield* this._request(url, opts, secret);
};
