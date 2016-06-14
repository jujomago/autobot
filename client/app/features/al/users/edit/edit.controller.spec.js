'use strict';

describe('Component: al.users.edit', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var EditComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    EditComponent = $componentController('al.users.edit', {
      $scope: scope
    });
  }));


   describe('#Check contructor Vars', () => {

        it('Check initialization of variables', () => {
       
            expect(EditComponent.message).to.eql({show:false});
            expect(EditComponent.rolSelectedPermissions).to.have.lengthOf(0);
            expect(EditComponent.allRoles).to.eql( ['admin', 'agent', 'reporting', 'supervisor']);
        });
    });
});
