'use strict';
(function () {

    //Private members
    let _timeout, _state;
    let _UsersService, _ConfirmAsync;

    class ListComponent {

        constructor($stateParams, $timeout, $state, ConfirmAsync, $filter, UsersService) { 
            //    console.log('constructor');            


            this.message = { show: false };
            if ($stateParams.message !== null) {
                console.log('message state params');
                console.log($stateParams.message);
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

            this.totalItems = 0;
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
            return _UsersService.getUsers()
                .then(_users => {
                    console.log('in client');
                    console.log(_users);

                    if (_users.statusCode === 200) {
                        this.usersList = _users.data;
                        this.totalItems = _users.data.length;
                    } else {
                        this.message = { show: true, type: 'warning', text: _users.errorMessage };
                    }
                    return _users;
                })
                .catch(e => {
                    console.error('Error Trying to get Users');
                    console.log(e);
                });
        }

        deleteUser(user, indexRow) { 
            return _ConfirmAsync('Are you sure to delete user "'+user.userName+'" ?') 
                .then(() => {
                    
                    this.toogleUserRow = indexRow;
                    return _UsersService.deleteUser(user.userName)
                        .then(response => {

                            console.log('delete response');
                            console.log(response);

                            if (response.statusCode === 204 && response.data === null) {
                                let index = this.usersList.indexOf(user);
                                this.usersList.splice(index, 1);
                                this.toogleUserRow = -1;

                                this.message = { show: true, type: 'success', text: 'User "'+user.userName+'" Deleted' };

                                _timeout(() => {
                                    this.message.show = false;
                                }, 3000);
                            }
                            return response;
                        })
                        .catch(e => {
                            console.error('Error Trying to delete user');
                            this.message = { show: true, type: 'danger', text: e.data.body };
                            _timeout(() => {
                                this.message.show = false;
                            }, 3000);

                            this.toogleUserRow = -1;

                            return e;
                        });
                })
                .catch(() => {
                    return null;
                });

        }
        getDetail(user) {
            _state.go('ap.al.usersEdit', { name: user.userName });
        }

        pageChanged() {
            console.log('Page changed to: ' + this.currentPage);
            this.beginNext = (this.currentPage - 1) * this.numPerPage;
            console.log('beginNext:' + this.beginNext);
        }
        sortColumn(columnName) {
            console.log('sorting:' + columnName);
            this.sortKey = columnName;
            this.reverse = !this.reverse;
            this.usersList = this.filter('orderBy')(this.usersList, this.sortKey, this.reverse);
        }

        filteringBySearch(){
            this.beginNext = 0;
            this.currentPage = 1;  
            if(this.search.userName){
                let total = this.filter('filter')(this.usersList, {userName: this.search.userName});
                this.totalItems = total.length;
                this.totalMin = this.totalItems < this.numPerPage ? true : false;
                return true;
            }else{
                this.totalItems = this.usersList.length;
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
