'use strict';
(function() {

    function _getErrorMessage(xmlMessage){
        let message = xmlMessage.match('<faultstring>(.*)</faultstring>');
        return message[1];
    }

    let _UsersService,_stateParams,_state, _SkillsService, _ConfirmAsync, _ModalManager;

    class EditComponent {

        constructor($stateParams, $state,  $sessionStorage , $q, UsersService, SkillsService, ConfirmAsync, ModalManager) {

            //  console.log('Component EditComponent - al.users.edit');
            _stateParams = $stateParams;
            _UsersService = UsersService;
            _SkillsService = SkillsService;
            _ConfirmAsync = ConfirmAsync;
            _ModalManager = ModalManager;
            _state=$state;
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
                    console.log('enter');            
                    var rolValue = this.userInfo.roles[key];  
                    this.storage.rolesPermissions[key]=rolValue;                       
                }
                console.log(this.storage.rolesPermissions);
                return this.getAllSkills();
            })
            .then((skills)=>{
                this.storage.skills = skills.data;
            });
        }

        openModal(){
            this.modalInstance = _ModalManager.open({
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

        getAllSkills(){
             return _SkillsService.getSkills()
                .then(response => {
                    console.log('loaded skills');
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
                    this.userSkills = this.userInfo.skills;
                    
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
            appendTo: angular.element(document.querySelector('#modal-container')),
            template: '<al.users.skill-modal></al.users.skill-modal>'
        });

        this.modalInstance.result
            .then(result => {
                if(typeof result !== 'undefined' && Object.keys(result).length > 0){
                    result.userName = this.userInfo.generalInfo.userName;
                    if(this.methodSkills === 'create'){
                        this.addSkillToUser(result).then(()=>{
                            this.getUserDetailSkill(this.userInfo.generalInfo.userName);
                        }).catch((theMsg)=>{
                            this.message={ show: true, type: 'warning', text: theMsg, expires: 3000}; 
                        });   
                    }else{
                        this.updateSkillFromUser(result).then(()=>{
                            this.getUserDetailSkill(this.userInfo.generalInfo.userName);
                        }).catch((theMsg)=>{
                            this.message={ show: true, type: 'warning', text: theMsg, expires: 3000}; 
                        });   
                    }
                }
            });
      }

      getUserDetailSkill(userName){
             return _UsersService.getUserDetail(userName)
                .then(_users => {                                  
                    console.log('loaded user detail');
                    this.found = true;
                    this.userInfo.skills = _users.skills;
                    this.userSkills = _users.skills;
                    return _users;
                })
                .catch(error => console.log(error));
      }

      addSkillToUser(skill){
        return _UsersService.addSkilltoUser(skill)
                .then(response => {
                   console.log(response);
                   let theMsg = 'Skill added';
                   this.message={ show: true, type: 'success', text: theMsg, expires: 3000};
                   return response;
                })
                .catch(error => {
                    console.log('error');
                    console.error(error);
                    let textError = _getErrorMessage(error.data.body);
                    this.message={ show: true, type: 'warning', text: textError, expires: 5000};
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
                                this.message = { show: true, type: 'success', text: 'Skill Deleted', expires:3000 };

                            }else{
                                console.log(response.statusCode);
                                this.toggleSkillRow = -1;

                                this.message = { show: true, type: 'danger', text: response.errorMessage, expires:8000};
                            }
                            return response;
                        }).catch(err => {
                              console.error(err);
                              let textError = _getErrorMessage(err.data.body);
                              this.message = { show: true, type: 'danger', text: textError, expires:8000};
                              return err;
                        });
                })
                .catch(() => {
                    return false;
                });
      }

      updateSkillFromUser(skill){
        return _UsersService.updateSkillfromUser(skill)
                .then(response => {
                   console.log(response);
                   let theMsg = 'Skill updated';
                   this.message={ show: true, type: 'success', text: theMsg, expires: 3000};
                   return response;
                })
                .catch(error => {
                    console.log('error');
                    console.error(error);
                    let textError = _getErrorMessage(error.data.body);
                    this.message={ show: true, type: 'warning', text: textError, expires: 5000};
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
        console.log('Page changed to: ' + this.currentPage);
        this.beginNext = (this.currentPage - 1) * this.numPerPage;
        console.log('beginNext:' + this.beginNext);
       }

        getMax(){
            if(this.userSkills){
                let total=this.currentPage*this.numPerPage;
                return (total>this.filteredSkills.length)?this.filteredSkills.length+'':total;
            }
        }

        sortColumn(columnName) {
          if (columnName !== undefined && columnName) {
                console.log('sorting:' + columnName);
              this.sortKey = columnName;
              this.reverse = !this.reverse;
              return true;
          } else {
              return false;
          }
        }
    }
    EditComponent.$inject = ['$stateParams', '$state',  '$sessionStorage','$q', 'UsersService', 'SkillsService', 'ConfirmAsync', 'ModalManager'];

    angular.module('fakiyaMainApp')
        .component('al.users.edit', {
            templateUrl: 'app/features/al/users/edit/edit.html',
            controller: EditComponent
        });

})();
