/**
 * CampaignProfile model events
 */

'use strict';

import {EventEmitter} from 'events';
var CampaignProfile = require('../../sqldb').CampaignProfile;
var CampaignProfileEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CampaignProfileEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  CampaignProfile.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    CampaignProfileEvents.emit(event + ':' + doc._id, doc);
    CampaignProfileEvents.emit(event, doc);
    done(null);
  }
}

export default CampaignProfileEvents;
