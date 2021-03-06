'use strict';
(function() {

    let _UsersService,_stateParams,_state, _SkillsService, _ConfirmAsync, _ModalManager;
    let _$filter;

    class EditComponent {

        constructor($stateParams, $state,  $sessionStorage , $q, $filter, $scope,UsersService, SkillsService, ConfirmAsync, ModalManager,Global) {

            _stateParams = $stateParams;
            _UsersService = UsersService;
            _SkillsService = SkillsService;
            _ConfirmAsync = ConfirmAsync;
            _ModalManager = ModalManager;
            _state=$state;
            _$filter = $filter;            
            this.storage = $sessionStorage;
            this.qp = $q;
            this.SubmitText = 'Save';
            this.found = false;
            this.changePass = false;
            this.allRoles = ['agent', 'supervisor' , 'admin', 'reporting'];
            this.userRoles = [];
            this.userSkills = [];
            this.showErrorMessage = { show: false, message: '' };
            this.message = { show: false };
            this.rolSelectedPermissions = [];
            this.global = Global;
            this.permissionTitle = false;
            this.lastUserRolSelected='';
            this.filteredSkills=[];
            this.skills = [];
            this.currentPage = 1;
            this.sortKey = '';
            this.reverse = true;
            this.numPerPage = 10;
            this.beginNext = 0;
            this.quantities = [5, 10, 15, 20];
            this.toggleSkillRow = -1;
            this.search={skillName:''};
            this.methodSkills = 'create';
            this.tab = false;           
        }

       
        $onInit() {   
            let userName = _stateParams.name;
            this.getAllPermissions()
            .then(()=>{
                return this.getUserDetail(userName);
            })
            .then(()=>{
                for (var key in this.userInfo.roles) {
                    var rolValue = this.userInfo.roles[key];
                    this.storage.rolesPermissions[key]=rolValue;
                }
                return this.getAllSkills();
            })
            .then((skills)=>{
                this.storage.skills = skills.data;
            })
            .catch(error => {
                let errorMessage = error.errorMessage?error.errorMessage:error;
                this.message = { show: true, type: 'danger', text: errorMessage };
                return error;
            });
        }
        openModal(){
            this.modalInstance = _ModalManager.open({
                animation: false,
                size: 'md',
                controllerAs: '$ctrl',
                appendTo: angular.element('#modal-container'),
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
               this.storage.rolesPermissions = response;
               return response;
            });
        }

        getAllSkills(){
             return _SkillsService.getSkills()
                .then(response => {
                    return response;
                })
                .catch(error => {
                    this.message = { show: true, type: 'danger', text: error.errorMessage };
                    return error;
                });
        }

        getUserDetail(userName){
             return _UsersService.getUserDetail(userName)
                .then(_users => {
                
                    this.found = true;
                    this.userInfo = _users;
                    this.userInfo.generalInfo.password = '**********';
                    this.userRoles = Object.keys(this.userInfo.roles);
                    this.userSkills = this.userInfo.skills;
                    let extesionString=this.userInfo.generalInfo.extension.toString();
                    if(extesionString.length<4){                        
                        let cerosToAdd=new Array((4-extesionString.length)+1).join('0');
                        this.userInfo.generalInfo.extension=cerosToAdd.concat(extesionString);
                    }else if(extesionString.length>4){
                        return false;
                    }

                    let rolesAvailable = this.allRoles.filter(function(value) {
                        if(this.userRoles.indexOf(value) > -1){
                            return false;
                        }
                        return true;
                    }, this);

                    this.allRoles = rolesAvailable;
                    return _users;
                });
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
                this.permissionTitle = false;
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
                    this.permissionTitle = true;
                }
                return true;
            }
            return false;
        }
       update(){

           if (this.userRoles.length === 0) {
                this.showWarningRolMessage = true;
                let deferred = this.qp.defer();
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

                return _UsersService.updateUser(reqFormat)
                .then(response=>{
                    let messageObj={show:true,type:'success',text:'User Updated Successfully'};
                    _state.go('ap.al.users', { message: messageObj });
                    return response;
                })
                .catch(error => {
                    this.SubmitText = 'Save';
                    this.message = { show: true, type:'danger', text: error.errorMessage };
                    return error;
                });

            }
       }

       addSkill(){
        this.methodSkills = 'create';
        this.skillModal();
       }

       updateSkill(skill){
        this.methodSkills = 'update';
        this.skill = skill;
        this.skillModal();
       }

       skillModal(){
        this.modalInstance = _ModalManager.open({
            animation: false,
            size: 'sm',
            controllerAs: '$ctrl',
            appendTo: angular.element('#modal-skill-container'),
            template: '<al.users.skill-modal></al.users.skill-modal>'
        });

        this.modalInstance.result
            .then(result => {
                if(typeof result !== 'undefined' && Object.keys(result).length > 0){
                    result.userName = this.userInfo.generalInfo.userName;
                    if(this.methodSkills === 'create'){
                        this.addSkillToUser(result).then(()=>{
                            this.getUserDetailSkill(this.userInfo.generalInfo.userName);
                        })
                        .catch(error => {
                            this.message = { show: true, type:'danger', text: error.errorMessage };
                        });
                    }else{
                        this.updateSkillFromUser(result).then(()=>{
                            this.getUserDetailSkill(this.userInfo.generalInfo.userName);
                        })
                        .catch(error => {
                            this.message = { show: true, type:'danger', text: error.errorMessage };
                        });
                    }
                }
            });
      }

      getUserDetailSkill(userName){
             return _UsersService.getUserDetail(userName)
                .then(_users => {
                    this.found = true;
                    this.userInfo.skills = _users.skills;
                    this.userSkills = _users.skills;
                    return _users;
                })
                .catch(error => {
                    this.message = { show: true, type:'danger', text: error.errorMessage };
                    return error;
                });
      }

      addSkillToUser(skill){
        return _UsersService.addSkilltoUser(skill)
                .then(response => {
                   let theMsg = 'Skill Added Successfully';
                   this.message={ show: true, type: 'success', text: theMsg, expires: 3000};
                   return response;
                })
                .catch(error => {
                    this.message = { show: true, type:'danger', text: error.errorMessage };
                    return error;
                });
      }

      deleteSkillFromUser(item, indexRow){
        return _ConfirmAsync('Are you sure to delete?')
                .then(() => {
                    this.toggleSkillRow = indexRow;
                    return _UsersService.deleteSkillfromUser(item)
                        .then(response => {
                            if (response.statusCode === 204 && response.data === null) {
                                let index = this.userSkills.indexOf(item);
                                this.userSkills.splice(index, 1);

                                this.toggleSkillRow = -1;
                                this.message = { show: true, type: 'success', text: 'Skill Deleted Successfully', expires:3000 };

                            }else{
                                this.toggleSkillRow = -1;

                                this.message = { show: true, type: 'danger', text: response.errorMessage, expires:8000};
                            }
                            return response;
                        })
                        .catch(error => {
                            this.toggleSkillRow = -1;
                            this.message = { show: true, type:'danger', text: error.errorMessage };
                            return error;
                        });
                })
                .catch(() => {
                    return false;
                });
      }

      updateSkillFromUser(skill){
        return _UsersService.updateSkillfromUser(skill)
                .then(response => {
                   let theMsg = 'Skill updated';
                   this.message={ show: true, type: 'success', text: theMsg, expires: 3000};
                   return response;
                })
                .catch(error => {
                    this.message = { show: true, type:'danger', text: error.errorMessage };
                    return error;
                });
      }

      checkTab(tab){
        if(tab === 'skills'){
            this.tab = true;
        }else{
            this.tab = false;
        }
      }

       pageChanged() {
        this.beginNext = (this.currentPage - 1) * this.numPerPage;
       }

        getMax(){
            if(this.userSkills){
                let total=this.currentPage*this.numPerPage;
                return (total>this.filteredSkills.length)?this.filteredSkills.length+'':total;
            }
        }

        sortColumn(columnName) {
          if (columnName !== undefined && columnName) {
            this.sortKey = columnName;
            this.reverse = !this.reverse;
            this.orderList(this.filteredSkills);
            return true;
          } else {
              return false;
          }
        }

        orderList(list){
            if(this.sortKey){
                this.filteredSkills = _$filter('orderBy')(list, this.sortKey, this.reverse);
            }
        }

        CheckClear(rolName,action)
        {   
            let permissionsRol = this.storage.rolesPermissions[rolName];
            console.log(this.storage.rolesPermissions[rolName]);
            if(rolName==='agent')
            {
                if (action === 'check') {
                    permissionsRol.alwaysRecorded = true;
                    permissionsRol.attachVmToEmail = true;
                    permissionsRol.sendEmailOnVm = true;
                }
                else
                {
                    permissionsRol.alwaysRecorded = false;
                    permissionsRol.attachVmToEmail = false;
                    permissionsRol.sendEmailOnVm = false;
                }
            }                    
            permissionsRol.permissions.forEach(function(element) {
                if (action === 'check') {
                    element.value = true;
                }
                else{
                    element.value = false;
                }
            }, this);             
        }        
    }

    EditComponent.$inject = ['$stateParams', '$state',  '$sessionStorage','$q', '$filter', '$scope','UsersService', 'SkillsService', 'ConfirmAsync', 'ModalManager','Global'];

    angular.module('fakiyaMainApp')
        .component('al.users.edit', {
            templateUrl: 'app/features/al/users/edit/edit.html',
            controller: EditComponent
        });

})();
