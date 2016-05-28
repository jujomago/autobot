'use strict';

import bluebird from 'bluebird';

console.log ('promisifying soap...');
bluebird.promisifyAll (require('soap'));

console.log ('promisifying completed!');
