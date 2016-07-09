/**
 * Disposition model events
 */

'use strict';

import {EventEmitter} from 'events';
var Disposition = require('../../sqldb').Disposition;
var DispositionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DispositionEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Disposition.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    DispositionEvents.emit(event + ':' + doc._id, doc);
    DispositionEvents.emit(event, doc);
    done(null);
  }
}

export default DispositionEvents;
