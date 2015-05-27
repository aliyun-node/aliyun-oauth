# aliyun-oauth
Aliyun OAuth for ES6

## Installation
```
$ npm install aliyun-oauth --save
```

## Documentation

文档地址： http://doxmate.cool/ali-sdk/aliyun-oauth/index.html

## Usage

```js
var config = require('../config');
var OAuth = require('aliyun-oauth');
var oauth = new OAuth(config.oauth.key, config.oauth.secret);

// 路由 /login
exports.login = function *() {
  if (this.session.user) {
    this.redirect('/');
    return;
  }

  var callbackUrl = "http://your.domain.com/callback";
  var requestToken = yield* oauth.requestToken(callbackUrl);
  this.session.oauth_token_secret = requestToken.oauth_token_secret;
  var authUrl = oauth.getAuthUrl(requestToken.oauth_token);
  // 跳转去auth/
  this.redirect(authUrl);
};

// 路由 /callback
exports.callback = function * () {
  var query = this.query;
  var token = query.oauth_token;
  var verifier = query.oauth_verifier;
  var secret = this.session.oauth_token_secret;
  // 获取access token
  var accessToken = yield* oauth.getAccessToken(token, verifier, secret);
  this.session.oauth_token = accessToken.oauth_token;
  this.session.oauth_token_secret = accessToken.oauth_token_secret;

  var user = yield* oauth.aliyunid_kp(accessToken.oauth_token, accessToken.oauth_token_secret);
  this.session.user = user;
  this.redirect('/');
};
// 退出时请清理session即可
```

## License
The MIT license
