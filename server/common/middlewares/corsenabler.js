'use strict';

import cors from 'cors';

module.exports = {
    cors: function (req, res, next) {
        let app = req.app;
        console.log ('Starting cors enabling '+req);
        var whitelist = ['http://www.dev-autoboxcorp.com', 'http://example2.com'];
        var corsOptions = {
            origin: function (origin, callback) {
                console.log ('Evaluating origin -> '+origin);
                var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
                callback(null, originIsWhitelisted);
            }
        };
        app.use(cors(corsOptions));
        console.log ('Finishing cors enabling '+req);
        next();
    }
}