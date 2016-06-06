'use strict';

var config = require ('.');

let _apiUri = config.apiUri;
exports = module.exports = {
  // List of user roles
  userRoles: ['guest', 'user', 'admin'],
  //apiUri: 'http://localhost:9000/api'
  apiUri: _apiUri
};
