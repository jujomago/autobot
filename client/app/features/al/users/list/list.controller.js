'use strict';
(function () {

    //Private members
    let _timeout, _state;
    let _UsersService, _ConfirmAsync;

    class ListComponent {

        constructor($stateParams, $timeout, $state, ConfirmAsync, $filter, UsersService) {
            this.message = { show: false };
            if ($stateParams.message !== null) {
                this.message = { show: true, type: $stateParams.message.type, text: $stateParams.message.text };
                $timeout(() => {
                    this.message.show = false;
                }, 3000);
            }

            _timeout = $timeout;
            _state = $state;
            _UsersService = UsersService;
            _ConfirmAsync = ConfirmAsync;

            this.usersList = [];
            this.currentPage = 1;
            this.sortKey = '';
            this.reverse = true;
            this.numPerPage = 10;
            this.beginNext = 0;
            this.quantities = [5, 10, 15, 20];

            this.toogleUserRow = -1;
            this.search={userName:''};
            this.filteredUsers=[];
            this.filter = $filter;
            this.totalMin = false;

        }

        $onInit() {
            this.sortColumn('userName');
            return _UsersService.getUsers()
                .then(_users => {

                    if (_users.statusCode === 200) {
                        this.usersList = _users.data;
                    } else {
                        this.message = { show: true, type: 'warning', text: _users.errorMessage };
                    }
                    return _users;
                })
                .catch(error => {
                    this.message = { show: true, type:'danger', text: error.errorMessage };
                    return error;
                });
        }

        deleteUser(user, indexRow) {
            return _ConfirmAsync('Are you sure to delete user "'+user.userName+'" ?')
                .then(() => {

                    this.toogleUserRow = indexRow;
                    return _UsersService.deleteUser(user.userName)
                        .then(response => {

                            if (response.statusCode === 204 && response.data === null) {
                                let index = this.usersList.indexOf(user);
                                this.usersList.splice(index, 1);
                                this.toogleUserRow = -1;

                                this.message = { show: true, type: 'success', text: 'User Deleted Successfully' };

                                _timeout(() => {
                                    this.message.show = false;
                                }, 3000);
                            }
                            return response;
                        })
                        .catch(error => {
                            this.SubmitText = 'Save';
                            this.toogleUserRow = -1;
                            this.message = { show: true, type:'danger', text: error.errorMessage };
                            return error;
                        });
                })
                .catch(() => {
                    return null;
                });

        }
        getDetail(user) {
            _state.go('ap.al.usersEdit', { name: user.userName });
        }
        getMax(){
            let total=this.currentPage*this.numPerPage;
            return (total>this.filteredUsers.length)?this.filteredUsers.length+'':total;
        }
        pageChanged() {
            this.beginNext = (this.currentPage - 1) * this.numPerPage;
        }
        sortColumn(columnName) {
            this.sortKey = columnName;
            this.reverse = !this.reverse;
            this.usersList = this.filter('orderBy')(this.usersList, this.sortKey, this.reverse);
        }

        filteringBySearch(){

            if(this.search.userName){
                this.beginNext = 0;
                this.currentPage = 1;
                return true;
            }else{
                return false;
            }
        }

    }

    ListComponent.$inject = ['$stateParams', '$timeout', '$state', 'ConfirmAsync', '$filter', 'UsersService'];
    angular.module('fakiyaMainApp')
        .component('al.users.list', {
            templateUrl: 'app/features/al/users/list/list.html',
            controller: ListComponent
        });

})();
