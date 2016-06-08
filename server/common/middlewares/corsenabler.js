'use strict';

import cors from 'cors';

let whitelist = ['http://www.dev-autoboxcorp.com', 'http://example2.com'];
let corsOptions = {
    origin: function (origin, callback) {
        console.log('Evaluating origin -> ' + origin);
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    }
};

module.exports = cors(corsOptions);