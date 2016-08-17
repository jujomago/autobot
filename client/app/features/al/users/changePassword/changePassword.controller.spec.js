'use strict';

describe('Component: ChangePasswordComponent', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var _ChangePasswordComponent, _ModalManager;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, ModalManager) {
    _ModalManager = ModalManager;
    _ChangePasswordComponent = $componentController('al.users.changePassword', {

        });
  
  }));

  it('should return null if close modal', function () {
    let modalInstance = _ModalManager.open({
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
    let modalInstance = _ModalManager.open({
                          controllerAs: '$ctrl',
                          template: '<al.users.changePassword></al.users.changePassword>',
                        });
    _ChangePasswordComponent.instance = modalInstance;
    _ChangePasswordComponent.password = 'newPass!';
    _ChangePasswordComponent.confirm = 'newPass!';
    modalInstance.result
    .then(password => {
        expect(password).to.equal('newPass!');
    });
    _ChangePasswordComponent.save();
  });

  it('should show message error if passwords did not match', function () {
    let modalInstance = _ModalManager.open({
                          controllerAs: '$ctrl',
                          template: '<al.users.changePassword></al.users.changePassword>',
                        });
    _ChangePasswordComponent.instance = modalInstance;
    _ChangePasswordComponent.password = 'newPass!';
    _ChangePasswordComponent.confirm = 'diferentPass!';
    _ChangePasswordComponent.save();
    expect(_ChangePasswordComponent.message.show).to.equal(true);
    expect(_ChangePasswordComponent.message.type).to.equal('danger');
    expect(_ChangePasswordComponent.message.text).to.equal('Passwords should match');
  });
  it('should show message error if password is equal to userName', function () {
    let modalInstance = _ModalManager.open({
                          controllerAs: '$ctrl',
                          template: '<al.users.changePassword></al.users.changePassword>',
                        });
    _ChangePasswordComponent.instance = modalInstance;
    _ChangePasswordComponent.userName = 'username';
    _ChangePasswordComponent.password = 'username';
    _ChangePasswordComponent.confirm = 'username';
    _ChangePasswordComponent.save();
    expect(_ChangePasswordComponent.message.show).to.equal(true);
    expect(_ChangePasswordComponent.message.type).to.equal('danger');
    expect(_ChangePasswordComponent.message.text).to.equal('Password cannot match customer name');
  });

});
