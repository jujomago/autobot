'use strict';
(function () {

     let _$state,_SkillsService,_UsersService;

    class EditComponent {
        constructor($stateParams, $state, SkillsService, UsersService) {

            console.log('Component EditComponent - al.skills.edit');

            _$state = $state;
            _SkillsService = SkillsService;
            _UsersService = UsersService;

            //   console.log($stateParams);
            this.selectedSkill = {};
            this.nameSkill = $stateParams.name;

            this.found = false;
            this.UsersNamesSkills = [];
            this.filteredUsers = [];
            this.numPerPage = 10;
            this.beginNext = 0;
            this.currentPage = 1;

            this.toggleUsernameLink = -1;
            this.toggleUserItem = { item: -1 };
            this.toggleUserNameItem = -1;

            this.showPanelInfo = false;            
            this.message={show:false};
            
            this.SubmitText = 'Save';
        }

        showSkill() {
            this.found = false;
            var nameSkill = this.nameSkill;
            console.log('---------------');

            _SkillsService.getSkill(nameSkill)
                .then(_skillInfo => {
                    this.found = true;
                    console.log('showSkill');
                    console.log(_skillInfo);
                    this.selectedSkill = _skillInfo.skill;
                    this.UsersNamesSkills = (_skillInfo.hasOwnProperty('users')) ? _skillInfo.users : [];

                }).catch(err => {
                    console.error(err);
                });
        }
        save() {
            this.SubmitText = 'Saving...';
            console.log('before saving');
            console.log(this.selectedSkill);
            _SkillsService.updateSkill(this.selectedSkill)
                .then(_skillInfo => {
                    if (_skillInfo.hasOwnProperty('skill')) {
                        console.log('ok, updated');

                        var messageObj = {
                            type: 'success',
                            text: 'Skill Updated SuccessFully'
                        };

                        _$state.go('ap.al.skills', { message: messageObj });

                        this.SubmitText = 'Saved';
                    } else {
                        console.warn('there is an error');
                        console.log(_skillInfo);
                    }
                }).catch(err => {
                    console.error(err);
                });
        }
        cancel() {
            _$state.go('ap.al.skills');
        }
        addUsertoSkill(userObj, i) {

            this.toggleUserItem.item = i;

            var userSkillObj = {
                id: this.selectedSkill.id,
                level: 1,
                skillName: this.selectedSkill.name,
                userName: userObj.userName
            };

  
            return _UsersService.addSkilltoUser(userSkillObj)
                .then(response => {
                   // console.log('response');
                    console.log(response);
                    // response when creating new stuff, RETURNS NOTHING
                    if (response.statusCode === 200 && response.data === null) {                        
                        console.log('added OK');
                        let index = this.filteredUsers.indexOf(userObj);
                        this.filteredUsers.splice(index, 1);
                        this.toggleUserItem.item = -1;
                        
                        this.message={show:true,type:'success',text:'User Added Sucessfully',expires:2000};
                     
                        this.UsersNamesSkills.push(userObj);
                        return true;
                    }
                    return false;
                })
                .catch(err => {
                    console.log('error in client');
                    console.error(err);
                     this.message={show:true,type:'danger',text:err.data.body};
                });
        }
        deleteUserfromSkill(user, i) {

            var userSkillObj = {
                skillName: this.selectedSkill.name,
                userName: user.userName
            };

            this.toggleUserNameItem = i;

            return _UsersService.deleteSkillfromUser(userSkillObj)
                .then(response => {

                    if (response.statusCode === 204 && response.data === null ){ 
                        console.log('deleted OK');
                        
                        this.showPanelInfo=false;
                                               
                        let index = this.UsersNamesSkills.indexOf(user);
                        this.UsersNamesSkills.splice(index, 1);
                        this.toggleUserNameItem = -1;
                        
                        this.message={show:true,type:'success',text:'User Removed Sucessfully',expires:2000};
                    
                        this.listUsers();     
                        return response;
                    }
                   return null;
                })
                .catch(err => {
                    console.error(err);
                });
        }

        showUserInfo(username, i) {
            this.DetailUser = {};
            this.showPanelInfo = true;
            this.toggleUsernameLink = i;
            return _UsersService.getUser(username)
                .then(_userInfo => {
                  ///  console.log(_userInfo);
                    this.DetailUser = _userInfo;
                    return this.DetailUser;
                }).catch(err => {
                    console.error(err);
                });
        }
        listUsers() {
            this.filteredUsers = [];
            _UsersService.getUsers()
                .then(_users => {                   
                    if(_users.statusCode===200){                          
                          this.userslist = _users.data;
                          this.filterUsersBounded(this.userslist);
                    }else{
                         console.error(_users);       
                         this.message={show:true,type:'warning',text:_users.errorMessage};    
                    }
                }).catch(err => {
                    console.error(err);
                });          
        }
        filterUsersBounded(rawUserList) {
          //  console.log('filtering');

            if (this.UsersNamesSkills.length === 0) {
                this.filteredUsers = rawUserList;
            } else {
                var usersSkills = this.UsersNamesSkills;
                var tempA = [];

                rawUserList.forEach(rawUser => {

                    var band = false;
                    for (var i = 0; i < usersSkills.length; i++) {

                        let userSkill = usersSkills[i];

                        if (userSkill.userName === rawUser.userName) {
                            band = true;
                            break;
                        }
                    }
                    if (!band && rawUser.active) {
                        tempA.push(rawUser);
                    }
                });
                // users thar area active and does not have the selectedSkill
                this.filteredUsers = tempA;
            }
        }

        pageChanged() {
            console.log('Page changed to: ' + this.currentPage);
            this.beginNext = (this.currentPage - 1) * this.numPerPage;
            console.log('beginNext:' + this.beginNext);
        }

    }

    EditComponent.$inject = ['$stateParams', '$state', 'SkillsService', 'UsersService'];
    angular.module('fakiyaMainApp')
        .component('al.skills.edit', {
            templateUrl: 'app/features/al/skills/edit/edit.html',
            controller: EditComponent
        });

})();
