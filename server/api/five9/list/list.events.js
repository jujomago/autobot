/**
 * List model events
 */

'use strict';

import {EventEmitter} from 'events';
var List = require('../../../sqldb').List;
var ListEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ListEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  List.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ListEvents.emit(event + ':' + doc._id, doc);
    ListEvents.emit(event, doc);
    done(null);
  }
}

export default ListEvents;
