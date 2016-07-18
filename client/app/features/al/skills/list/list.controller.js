'use strict';
(function () {

    let _ConfirmAsync,_SkillsService;
    let _$state,_$filter;

    class ListComponent {   

        constructor($state, $stateParams, $filter, ConfirmAsync, SkillsService) {

            console.log('Component ListComponent - al.skills.list');

             _ConfirmAsync=ConfirmAsync;
             _SkillsService=SkillsService;
             _$state = $state;
             _$filter = $filter;

            this.message = { show: false };

            if ($stateParams.message !== null) {
                this.message = { show: true, type: $stateParams.message.type, text: $stateParams.message.text , expires:3000 };
            }             

            this.init();         
            this.toggleSkillRow = -1;
            this.search={skill:{name:''}};
            this.filteredSkills=[];        
            this.totalMin = false;

        }

        init() {
            this.skills = [];
            this.totalItems = 0;
            this.currentPage = 1;
            this.sortKey = '';
            this.reverse = true;
            this.numPerPage = 10;
            this.beginNext = 0;
            this.quantities = [5, 10, 15, 20];

        }
        $onInit() {
            this.getSkills();
        }

        getSkills() {
            return _SkillsService.getSkillsInfo()
                .then(_skills => {
                    // console.log('error comes in _skills');
                    //console.log(_skills);
                    if (_skills.statusCode === 200) {
                        this.skills = _skills.data;
                        this.totalItems = this.skills.length;
                        return this.skills;
                    } else {
                        this.message = { show: true, type: 'warning', text: _skills.errorMessage };
                        return null;
                    }

                }).catch(err => {
                    console.log('====ERROR====');
                    console.log(err);
                });
        }

        pageChanged() {
            console.log('Page changed to: ' + this.currentPage);
            this.beginNext = (this.currentPage - 1) * this.numPerPage;
            console.log('beginNext:' + this.beginNext);
        }

        sortColumn(columnName) {
            if (columnName !== undefined && columnName) {
                console.log('sorting:' + columnName);
                this.sortKey = columnName;
                this.reverse = !this.reverse;
                this.skills = _$filter('orderBy')(this.skills, this.sortKey, this.reverse);
                return true;
            } else {
                return false;
            }
        }

        deleteSkill(item, indexRow) {
            return _ConfirmAsync('Are you sure to delete?')
                .then(() => {                 
                 
                    this.toggleSkillRow = indexRow;
                    return _SkillsService.deleteSkill(item.skill)
                        .then(response => {                   
                            if (response.statusCode === 204 && response.data === null) {
                                let index = this.skills.indexOf(item);
                                this.skills.splice(index, 1);

                                this.toggleSkillRow = -1;
                                this.message = { show: true, type: 'success', text: 'Skill Deleted', expires:3000 };

                            }else{

                                  this.toggleSkillRow = -1;

                                   this.message = { show: true, type: 'danger', text: response.errorMessage, expires:8000};
                            }
                            return response;
                        }).catch(err => {
                              console.error(err);
                        });
                })
                .catch(() => {
                    return false;
                });
        }
        getMax(){
            let total=this.currentPage*this.numPerPage;
            return (total>this.filteredSkills.length)?this.filteredSkills.length+'':total;
        }
        getDetail(item) {
            _$state.go('ap.al.skillsEdit', { name: item.name });
        }

        filteringBySearch(){
            this.beginNext = 0;
            this.currentPage = 1;
            if(this.search.skill.name){
                let total = this.filter('filter')(this.skills, this.search.skill.name);
                this.totalItems = total.length;
                this.totalMin = this.totalItems < this.numPerPage ? true : false;
                return true;
            }else{
                this.totalItems = this.skills.length;
                return false;
            }
        }


    }


    ListComponent.$inject = ['$state', '$stateParams', '$filter', 'ConfirmAsync', 'SkillsService'];

    angular.module('fakiyaMainApp')
        .component('al.skills.list', {
            templateUrl: 'app/features/al/skills/list/list.html',
            controller: ListComponent
        });

})();
