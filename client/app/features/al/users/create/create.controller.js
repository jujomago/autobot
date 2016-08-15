'use strict';

(function () {

    let _UsersService,_state,_$q,_ModalManager;
    
    class CreateComponent {

        constructor($state, $sessionStorage, $q, UsersService, ModalManager) {
            _ModalManager = ModalManager;
            this.storage = $sessionStorage;                  
            this.newUser = {
                active: true,
                mustChangePassword: true,
                canChangePassword: true
            };

            this.userRoles = [];
            this.allRoles = ['Agent', 'Supervisor', 'Admin', 'Reporting'];

            this.SubmitText = 'Save';
            this.showWarningRolMessage = this.showWarningUserMessage = false;
            this.userRolSelectedIndex = -1;

            this.rolSelectedPermissions = [];
            this.message = { show: false };
            
            _UsersService = UsersService;
            _$q = $q;
            _state = $state;
         

        }
        openModal(){
            this.modalInstance = _ModalManager.open({
                animation: true,
                backdrop: 'static',
                size: 'md',
                controllerAs: '$ctrl',
                appendTo: angular.element(document.querySelector('#modal-container')),
                template: '<al.users.change-password></al.users.change-password>',
            });

            this.modalInstance.result
            .then(password => {
                if(password!==null){
                    this.newUser.password = password;
                }
            });

        }
        
        $onInit() {
            console.log('loading roles'); 

            return _UsersService.getPermissions()
                .then(response => {
                    this.storage.rolesPermissions = response;
                    return response;
                })
                .catch(error => {
                    console.log('error');
                    console.error(error);
                });

            //   console.log(this.newUser);

        }
        checkStepOne(form) {
            //    console.log(form);
            this.showWarningUserMessage = (!form.$valid) ? true : false;

        }
        addRol(rolName) {
            this.showWarningRolMessage = false;
            if (this.userRoles.indexOf(rolName) < 0 && this.allRoles.indexOf(rolName) >= 0) {
                let indexElem = this.allRoles.indexOf(rolName);
                this.allRoles.splice(indexElem, 1);
                this.userRoles.push(rolName);
                return true;
            } else {
                return false;
            }
        }
        deleteSelectedRol() {
            if (this.userRolSelectedIndex >= 0 && this.userRolSelectedIndex <= (this.userRoles.length - 1)) {
                this.allRoles.push(this.userRoles[this.userRolSelectedIndex]);
                this.userRoles.splice(this.userRolSelectedIndex, 1);
                this.userRolSelectedIndex = -1;
                this.rolSelectedPermissions = [];
                return true;
            } else {
                return false;
            }
        }

        getPermissions(rolName) {
            if (this.userRoles.indexOf(rolName) >= 0 || this.allRoles.indexOf(rolName) >= 0) {
                this.userRolSelectedIndex = this.userRoles.indexOf(rolName);
                if (this.storage.rolesPermissions) {
                    this.rolSelectedPermissions = this.storage.rolesPermissions[rolName.toLowerCase()];
                }
                return true;
            }
            return false;
        }

        save() {
                       
                if (this.userRoles.length === 0) {
                    this.showWarningRolMessage = true;
                    console.warn('You must select at least one rol');

                    let deferred = _$q.defer();
                    console.log('Deferred value -->' + deferred);
                    deferred.resolve(null);
                    return deferred.promise;

                } else {

                    this.showWarningRolMessage = false;
                    this.SubmitText = 'Saving...';

                                        
                    let _rolesToSet={};                
                    this.userRoles.forEach((selectedRol)=>{      
                        let selRol=selectedRol.toLowerCase();             
                        _rolesToSet[selRol]=this.storage.rolesPermissions[selRol];
                    }, this); 
                
                    
                    var reqFormat = {
                        userInfo: {
                            generalInfo: this.newUser,
                            roles: _rolesToSet
                        }
                    };


                    return _UsersService.createUser(reqFormat)
                        .then(userInfo => {
                            if (userInfo.statusCode === 200) {
                                var response = userInfo.data;
                                if (response.hasOwnProperty('generalInfo')) {
                                    var messageObj = {
                                        type: 'success',
                                        text: 'User Created'
                                    };
                                    this.newUser = {}; //clean object                        
                                    _state.go('ap.al.users', { message: messageObj });
                                    return response;

                                } else {
                                    this.message = { show: true, type: 'danger', text: 'Inconsistent data returned' };
                                    return null;
                                }
                            } else {
                                this.SubmitText = 'Save';
                                this.message = { show: true, type: 'danger', text: userInfo.errorMessage };
                                return null;
                            }

                        })
                        .catch(error => {                      

                            console.error('error in client');
                            console.log(error);
                            
                            this.SubmitText = 'Save';
                            this.message = { show: true, type: 'danger', text: error.errorMessage };
                        });
                }
        }
    }



    CreateComponent.$inject = ['$state', '$sessionStorage', '$q', 'UsersService', 'ModalManager'];

    angular.module('fakiyaMainApp')
        .component('al.users.create', {
            templateUrl: 'app/features/al/users/create/create.html',
            controller: CreateComponent
        });
})();
