'use strict';

describe('Service:EventBus', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var EventBus;
  beforeEach(inject(function (_EventBus_) {
    EventBus = _EventBus_;
  }));

  it('should have the same behavior in all app', function () {
    let bus1 = EventBus;
    let bus2 = EventBus;
    bus1.subscribe('testEvent',function(event, testParam){
      expect(testParam).to.be.equal('bus2');
    });
    bus2.publish('testEvent', 'bus2');
  });

});
