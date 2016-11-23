'use strict';

var config = require ('.');

let _apiUri = config.apiUri;
exports = module.exports = {
  // List of user roles
  userRoles: ['guest', 'user', 'admin'],
  apiUri: 'http://192.168.14.104:9999/api'
  //apiUri: _apiUri
};
