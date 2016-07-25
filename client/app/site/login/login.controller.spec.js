'use strict';

describe('Component: LoginController', function() {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));
  beforeEach(module('stateMock'));

  var scope;
  var loginComponent;
  var state;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(
    _$httpBackend_,
    $http,
    $componentController,
    $rootScope,
    $state) {
      $httpBackend = _$httpBackend_;

      scope = $rootScope.$new();
      state = $state;
      loginComponent = $componentController('login', {     
        $state: state
      });
      




  }));

 it('should initialize variables', function() {  
    expect(loginComponent.username).to.equal('');
    expect(loginComponent.password).to.equal('');
     expect(loginComponent.cleanWrognPassword).to.equal(false);
    expect(loginComponent.message).to.eql({show:false});
  });

 it('could not login, bad credentials', function() {  
   loginComponent.username='admin@autoboxcofrp.com';
   loginComponent.password='djf923';

   loginComponent.autentichate();
    expect(loginComponent.message).to.eql({ show: true, text: 'Invalid username and/or password. Please try again', type: 'danger'});
    expect(loginComponent.password).to.equal('');
    expect(loginComponent.cleanWrognPassword).to.equal(true);
  });


});