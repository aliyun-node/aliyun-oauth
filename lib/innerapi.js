'use strict';

exports.check_access_token = function * (token) {
  var url = this.prefix + 'innerapi/oauth/check_access_token';
  var opts = {oauth_token: token};
  return yield* this._request(url, opts);
};
