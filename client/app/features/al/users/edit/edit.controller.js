'use strict';
(function() {


    let _UsersService,_stateParams,_state,_$uibModal;

    class EditComponent {

        constructor($stateParams, $state,  $sessionStorage , $q, $uibModal, UsersService) {

            //  console.log('Component EditComponent - al.users.edit');
            _$uibModal = $uibModal;
            _stateParams = $stateParams;
            _UsersService = UsersService;
            _state=$state;
            this.storage = $sessionStorage;
            this.qp = $q;
            this.SubmitText = 'Save';
            this.found = false;
            this.allRoles = ['admin', 'agent', 'reporting', 'supervisor'];
            this.userRoles = [];
            this.showErrorMessage = { show: false, message: '' };   
            this.message = { show: false };
            this.rolSelectedPermissions = [];  
        }

        $onInit() {      
        
            let userName = _stateParams.name;
          
            this.getAllPermissions()
            .then(()=>{
                this.getUserDetail(userName)
                .then(()=>{
                    for (var key in this.userInfo.roles) {
                        console.log('enter');            
                        var rolValue = this.userInfo.roles[key];  
                        this.storage.rolesPermissions[key]=rolValue;                       
                    }
                    console.log(this.storage.rolesPermissions);
                });
            });       
        }
        
        openModal(){
            this.modalInstance = _$uibModal.open({
                animation: false,
                size: 'md',
                controllerAs: '$ctrl',
                appendTo: angular.element(document.querySelector('#modal-container')),
                template: '<al.users.change-password></al.users.change-password>',
            });
            this.modalInstance.result
            .then(password => {
                if(password!==null){
                    this.changePass = true;
                    this.userInfo.generalInfo.password = password;
                }
            });
        }
        getAllPermissions(){
              return _UsersService.getPermissions()
                .then(response => {
                    console.log('loaded permissions');
                   this.storage.rolesPermissions = response;
                   return response;
                })
                .catch(error => {
                    console.log('error');
                    console.error(error);
                });    
        }
        getUserDetail(userName){
             return _UsersService.getUserDetail(userName)
                .then(_users => {                                  
                    console.log('loaded user detail');      
                    this.found = true;
                    this.userInfo = _users;
                    this.userInfo.generalInfo.password = '**********';
                    this.userRoles = Object.keys(this.userInfo.roles);
                    
                    let rolesAvailable = this.allRoles.filter(function(value) {
                        if(this.userRoles.indexOf(value) > -1){
                            return false;
                        }
                        return true;               
                    }, this);
                    
                    this.allRoles = rolesAvailable;
                    return _users;
                })
                .catch(error => console.log(error));
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
            if (this.userRoles.indexOf(rolName) >= 0 ||  this.allRoles.indexOf(rolName) >= 0) {
                this.userRolSelectedIndex = this.userRoles.indexOf(rolName);
                if (this.storage.rolesPermissions) {
                    this.rolSelectedPermissions = this.storage.rolesPermissions[rolName.toLowerCase()];
                }
                return true;
            }
            return false;
        }        
       update(){
       
           if (this.userRoles.length === 0) {       
                this.showWarningRolMessage = true;
                console.warn('You must select at least one rol');
                let deferred = this.qp.defer();
                console.log ('Deferred value -->'+deferred);
                deferred.resolve(null);
                return deferred.promise;
            }else{
                
                 this.SubmitText = 'Saving...';
                let _rolesToRemove=this.allRoles.map((el)=>{        
                     if(el==='admin') {
                         return 'DomainAdmin';
                    }else {
                        return el.charAt(0).toUpperCase()+el.slice(1);
                    }
                });
                
                let _rolesToSet={};                
                this.userRoles.forEach((selectedRol)=>{                   
                    _rolesToSet[selectedRol]=this.storage.rolesPermissions[selectedRol];
                }, this); 
                
                        
               var reqFormat = {              
                      userGeneralInfo: this.userInfo.generalInfo,
                      rolesToSet:_rolesToSet,
                      rolesToRemove: _rolesToRemove                   
                };
                
                console.log(reqFormat);
                
                return _UsersService.updateUser(reqFormat)
                .then(response=>{
                    if(response.statusCode===200){
                        console.log('userInfo update:');
                        console.log(response.data);                        
                        let messageObj={show:true,type:'success',text:'User Updated'};
                        _state.go('ap.al.users', { message: messageObj });                                         
                    }else{
                        this.message = { show: true, type:'danger', text:response.errorMessage };
                    }                   
                    return response;
                })
                .catch(error => {
                    this.SubmitText = 'Save';
                    this.message = { show: true, type:'danger', text:error };
                    console.error('error');
                    console.log(error);
                });
                
            }
       }



    }


    EditComponent.$inject = ['$stateParams', '$state',  '$sessionStorage','$q', '$uibModal', 'UsersService'];

    angular.module('fakiyaMainApp')
        .component('al.users.edit', {
            templateUrl: 'app/features/al/users/edit/edit.html',
            controller: EditComponent
        });

})();
