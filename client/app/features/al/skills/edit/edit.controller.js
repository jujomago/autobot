'use strict';
(function () {

     let _$state,_SkillsService,_UsersService;

    class EditComponent {
        constructor($stateParams, $state, SkillsService, UsersService) {
            _$state = $state;
            _SkillsService = SkillsService;
            _UsersService = UsersService;
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
            _SkillsService.getSkill(nameSkill)
                .then(_skillInfo => {
                    this.found = true;
                    this.selectedSkill = _skillInfo.data.skill;
                    this.UsersNamesSkills = (_skillInfo.data.hasOwnProperty('users')) ? _skillInfo.data.users : [];
                })
                .catch(error => {
                    this.message={show:true,type:'danger',text: error.errorMessage};
                    return error;
                });
        }
        save() {
            this.SubmitText = 'Saving...';
            _SkillsService.updateSkill(this.selectedSkill)
                .then(() => {
                    var messageObj = {
                        type: 'success',
                        text: 'Skill Updated Successfully'
                    };
                    _$state.go('ap.al.skills', { message: messageObj });
                    this.SubmitText = 'Saved';
                }).catch(error => {
                    this.message={show:true,type:'danger',text: error.errorMessage};
                    this.SubmitText = 'Save';
                    return error;
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
                    // response when creating new stuff, RETURNS NOTHING
                    if (response.statusCode === 201 && response.data === null) {

                        let index = this.filteredUsers.indexOf(userObj);
                        this.filteredUsers.splice(index, 1);
                        this.toggleUserItem.item = -1;

                        this.message={show:true,type:'success',text:'User Added Successfully',expires:2000};

                        this.UsersNamesSkills.push(userObj);
                        return true;
                    }
                    return false;
                })
                .catch(error => {
                    this.message={show:true,type:'danger',text: error.errorMessage};
                    return error;
                });
        }
        deleteUserfromSkill(user, i) {

            var userSkillObj = {
                id: this.selectedSkill.id,
                level:1,
                skillName: this.selectedSkill.name,
                userName: user.userName
            };

            this.toggleUserNameItem = i;

            return _UsersService.deleteSkillfromUser(userSkillObj)
                .then(response => {

                    if (response.statusCode === 204 && response.data === null ){

                        this.showPanelInfo=false;

                        let index = this.UsersNamesSkills.indexOf(user);
                        this.UsersNamesSkills.splice(index, 1);
                        this.toggleUserNameItem = -1;

                        this.message={show:true,type:'success',text:'User Removed Successfully',expires:2000};

                        this.listUsers();
                        return response;
                    }
                   return null;
                })
                .catch(error => {
                    this.message={show:true,type:'danger',text: error.errorMessage};
                    return error;
                });
        }

        showUserInfo(username, i) {
            this.DetailUser = {};
            this.showPanelInfo = true;
            this.toggleUsernameLink = i;
            return _UsersService.getUser(username)
                .then(_userInfo => {
                    this.DetailUser = _userInfo;
                    return this.DetailUser;
                })
                .catch(error => {
                    this.message={show:true,type:'danger',text: error.errorMessage};
                    return error;
                });
        }
        listUsers() {
            this.filteredUsers = [];
            _UsersService.getUsers()
                .then(_users => {
                    this.userslist = _users.data;
                    this.filterUsersBounded(this.userslist);
                })
                .catch(error => {
                    this.message={show:true,type:'danger',text: error.errorMessage};
                });
        }
        filterUsersBounded(rawUserList) {
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
            this.beginNext = (this.currentPage - 1) * this.numPerPage;
        }

    }

    EditComponent.$inject = ['$stateParams', '$state', 'SkillsService', 'UsersService'];
    angular.module('fakiyaMainApp')
        .component('al.skills.edit', {
            templateUrl: 'app/features/al/skills/edit/edit.html',
            controller: EditComponent
        });

})();
