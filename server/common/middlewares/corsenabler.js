'use strict';

import cors from 'cors';

let whitelist = ['http://www.dev-autoboxcorp.com:8080', 'http://www.dev-autoboxcorp.com', 'http://www.dev-autoboxcorp.com:8081', 'http://dev-autoboxcorp.com:7000'];
let corsOptions = {
    origin: function (origin, callback) {
        console.log('Evaluating origin -> ' + origin);
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    }
};

let corsOptionsDelegate = function(req, callback){
  var corsOptions;
  if(whitelist.indexOf(req.header('Origin')) !== -1){
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response 
  }else{
    corsOptions = { origin: false }; // disable CORS for this request 
  }
  callback(null, corsOptions); // callback expects two parameters: error and options 
};

module.exports = cors(corsOptionsDelegate);