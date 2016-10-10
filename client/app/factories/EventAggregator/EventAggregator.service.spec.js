'use strict';

describe('Service:EventAggregator', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var EventAggregator;
  beforeEach(inject(function (_EventAggregator_) {
    EventAggregator = _EventAggregator_;
  }));

  it('should listen for test Event', function () {
    let instance = new EventAggregator();
    instance.subscribe('testEvent',function(event, testParam){
      expect(testParam).to.be.equal('Autobox Event Bus');
    });
    instance.publish('testEvent', 'Autobox Event Bus');
  });
  it('should empty param must be undefined', function () {
    let instance = new EventAggregator();
    instance.subscribe('testEvent',function(event, testParam){
      expect(testParam).to.be.equal(undefined);
    });
    instance.publish('testEvent');
  });

});
