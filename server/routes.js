/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';
import cors from 'cors';

export default function (app) {
  //Insert middlewares below
  var whitelist = ['http://www.dev-autoboxcorp.com:8080', 'http://example2.com'];
  var corsOptions = {
    origin: function (origin, callback) {
      console.log('Evaluating origin -> ' + origin);
      var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
      callback(null, originIsWhitelisted);
    }
  };
  app.use(cors(corsOptions));

  app.use('/api', require('./common/middlewares/partnerenabler').partner);

  // Insert routes below
  app.use('/api/f9/campaigns', require('./api/five9/campaign'));
  app.use('/api/f9/skills', require('./api/five9/skill'));
  app.use('/api/f9/users', require('./api/five9/user'));
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
