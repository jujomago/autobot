'use strict';

describe('Component: ChangePasswordComponent', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var _ChangePasswordComponent, _$uibModal;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $uibModal) {
    _$uibModal = $uibModal;
    _ChangePasswordComponent = $componentController('al.users.changePassword', {

        });
  
  }));

  it('should return null if close modal', function () {
    let modalInstance = _$uibModal.open({
                          controllerAs: '$ctrl',
                          template: '<al.users.changePassword></al.users.changePassword>',
                        });
    _ChangePasswordComponent.instance = modalInstance;
    modalInstance.result
    .then(password => {
        expect(password).to.equal(null);
    });
    _ChangePasswordComponent.close();
  });

  it('should return new password if passwords match', function () {
    let modalInstance = _$uibModal.open({
                          controllerAs: '$ctrl',
                          template: '<al.users.changePassword></al.users.changePassword>',
                        });
    _ChangePasswordComponent.instance = modalInstance;
    _ChangePasswordComponent.password = "newPass!";
    _ChangePasswordComponent.confirm = "newPass!";
    modalInstance.result
    .then(password => {
        expect(password).to.equal("newPass!");
    });
    _ChangePasswordComponent.save();
  });

  it('should show message error if passwords did not match', function () {
    let modalInstance = _$uibModal.open({
                          controllerAs: '$ctrl',
                          template: '<al.users.changePassword></al.users.changePassword>',
                        });
    _ChangePasswordComponent.instance = modalInstance;
    _ChangePasswordComponent.password = "newPass!";
    _ChangePasswordComponent.confirm = "diferentPass!";
    _ChangePasswordComponent.save();
    expect(_ChangePasswordComponent.message.show).to.equal(true);
    expect(_ChangePasswordComponent.message.type).to.equal('danger');
    expect(_ChangePasswordComponent.message.text).to.equal('Passwords did not match');
  });

});
