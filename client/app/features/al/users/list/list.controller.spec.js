'use strict';


describe('Component: al.users.list', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var ListComponent, scope;
  var timeout, state, userService;
  var httpBackend, sandbox, window, endPointUrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope, $state, $timeout, $httpBackend, $window, _UsersService_,appConfig) {
    scope = $rootScope.$new();
    state = $state;
    timeout = $timeout;
    userService = _UsersService_;
    httpBackend = $httpBackend;
    window = $window;

    if(appConfig.apiUri){
          endPointUrl=appConfig.apiUri+'/f9/admin/users';
    }


    ListComponent = $componentController('al.users.list', {
      $scope: scope,
      $stateParams: { message: null },
      $tiimeout: timeout,
      $state: state,
      UserService: userService
    });


    sandbox = sinon.sandbox.create();

     httpBackend.whenGET(url=>(url.indexOf('.html') !== -1)).respond(200);


  }));

  afterEach(function () {
    httpBackend.verifyNoOutstandingRequest();
    sandbox.restore();
  });

  describe('#deleteUser', () => {

    it('=> should return 204 when delete', () => {

      sandbox.stub(window, 'confirm').returns(true);


      httpBackend.whenDELETE(endPointUrl+'/josue@autoboxcorp.com').respond(204, '');

      ListComponent.deleteUser({ userName: 'josue@autoboxcorp.com' }, 8).then(response => {

        expect(response.statusCode).to.equal(204);
        expect(response.data).to.equal(null);
        expect(ListComponent.toogleUserRow).to.equal(-1);
        expect(ListComponent.message).to.eql({ show: true, type: 'success', text: 'User Deleted Successfully' });

      });

      expect(window.confirm.calledOnce).to.equal(true);


      httpBackend.flush();

    });

    it('=> message type danger show, one user cant be deleted', () => {

      sandbox.stub(window, 'confirm').returns(true);

      // user blueruby cant be deleted, it produces error 500

      httpBackend.whenDELETE(endPointUrl+'/blueruby').respond(500, { error: 'Internal Server Error' });

      ListComponent.deleteUser({ userName: 'blueruby' }, 4).then(response => {

        expect(response.statusCode).to.equal(500);
        expect(ListComponent.message.show).to.equal(true);
        expect(ListComponent.message.type).to.equal('danger');
        expect(ListComponent.message.text).to.equal('Internal Server Error');
        expect(ListComponent.toogleUserRow).to.equal(-1);

      });

      expect(window.confirm.calledOnce).to.equal(true);
      httpBackend.flush();

    });


  });


  it('=> message type warning show, users cant be loaded', () => {


    httpBackend.whenGET(endPointUrl).respond(401, { error: 'some error' });

    ListComponent.$onInit()
    .then(response => {
      expect(response.statusCode).to.equal(401);
      expect(ListComponent.message.show).to.equal(true);
      expect(ListComponent.message.type).to.equal('danger');
      expect(ListComponent.message.text).to.equal('some error');
    });

    httpBackend.flush();

  });


  describe('#filteringBySearch', () => {

    it('Should return true, when searching something', () => {
      ListComponent.search.userName='some text to search';
      ListComponent.usersList = [
        {userName:'some text to search'},
        {userName:'Other userName'},
        {userName:'some text to search'}
      ];
      expect(ListComponent.filteringBySearch()).to.equal (true);
      expect(ListComponent.beginNext).to.equal(0);
      expect(ListComponent.currentPage).to.equal(1);
    });

    it('Should return false, when input search is empty', () => {
        ListComponent.search.userName='';
        expect(ListComponent.filteringBySearch()).to.equal (false);
    });

  });
});