'use strict';
(function () {

    let _ConfirmAsync,_SkillsService;
    let _$state,_$filter;

    class ListComponent {

        constructor($state, $stateParams, $filter, ConfirmAsync, SkillsService) {
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
            this.currentPage = 1;
            this.sortKey = '';
            this.reverse = true;
            this.numPerPage = 10;
            this.beginNext = 0;
            this.quantities = [5, 10, 15, 20];

        }
        $onInit() {
            this.getSkills();
            this.sortColumn('skill.name');
        }

        getSkills() {
            return _SkillsService.getSkillsInfo()
                .then(_skills => {
                    this.skills = _skills.data;
                    return this.skills;
                }).catch(error => {
                    this.message = { show: true, type: 'danger', text: error.errorMessage };
                    return error;
                });
        }

        pageChanged() {
            this.beginNext = (this.currentPage - 1) * this.numPerPage;
        }

        sortColumn(columnName) {
            if (columnName !== undefined && columnName) {
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
                            let index = this.skills.indexOf(item);
                            this.skills.splice(index, 1);
                            this.toggleSkillRow = -1;
                            this.message = { show: true, type: 'success', text: 'Skill Deleted Successfully', expires:3000 };
                            return response;
                        }).catch(error => {
                            this.toggleSkillRow = -1;
                            this.message = { show: true, type: 'danger', text: error.errorMessage, expires:8000};
                            return error;
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
            if(this.search.skill.name){
                this.beginNext = 0;
                this.currentPage = 1;
                return true;
            }else{
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
