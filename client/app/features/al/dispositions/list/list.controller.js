'use strict';
(function(){
    let _ConfirmAsync;
    function replaceUndefined(disposition){
        if(!angular.isDefined(disposition.description)){
            disposition.description='';
        }
        return disposition;
    }    
    let _Global;
	class ListComponent {
		constructor($state, $stateParams, ConfirmAsync, DispositionsService,Global) {
            
			this.message = { show: false };
			if ($stateParams.message !== null) {
				this.message = { show: true, type: $stateParams.message.type, text: $stateParams.message.text,expires: 3000 };
			}
			this.DispositionsService = DispositionsService;
			this.state = $state;
			this.init();
			this.toggleSkillRow = -1;
			_ConfirmAsync=ConfirmAsync;
            _Global = Global;
            this.global = Global;
			this.search={name:''};
			this.filteredDispositions=[];            
		}
		init() {
			this.dispositions = [];
			this.currentPage = 1;            
			this.sortKey = '';
			this.reverse = true;
			this.numPerPage = 10;
			this.beginNext = 0;
			this.quantities = [5, 10, 15, 20];
		}
        
		$onInit() {
            this.getDispositions();
            this.sortColumn('name');
        }
		getDispositions() {
			return this.DispositionsService.getDispositions()
			.then(_dispositions => {
				if (_dispositions.statusCode === 200) {
					this.dispositions = _dispositions.data.map(replaceUndefined);
					return this.dispositions;
				}
		    })
            .catch(error => {
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
                return true;
            } else {
                return false;
            }
        }
        getMax(){

            let total=this.currentPage*this.numPerPage;
            return (total>this.filteredDispositions.length)?this.filteredDispositions.length+'':total;
        }
        deleteDisposition(item, indexRow) {
            return _ConfirmAsync('Remove '+item.name+'?')
                .then(() => {

                    this.toggleDispositionRow = indexRow;
                    return this.DispositionsService.deleteDisposition(item)
                        .then(response => {
                            let index = this.dispositions.indexOf(item);
                            this.dispositions.splice(index, 1);
                            this.toggleDispositionRow = -1;
                            this.message = { show: true, type: 'success', text: 'Disposition Deleted Successfully', expires: 3000 };
                            return response;
                        }).catch(error => {
                            this.toggleDispositionRow = -1;
                            this.message = { show: true, type: 'danger', text: error.errorMessage, expires:8000};
                            return error;
                        });
                })
                .catch(() => {
                    return false;
                });
        }
        getDetail(item) {
            this.state.go('ap.al.dispositionsEdit', { dispositionName: item.name });
        }
        filteringBySearch(){
            if(this.search.name){
                this.beginNext=0;
                this.currentPage = 1;
                return true;
             }
             return false;
        }
	}
	ListComponent.$inject = ['$state', '$stateParams', 'ConfirmAsync' ,'DispositionsService','Global'];
	angular.module('fakiyaMainApp')
	  .component('al.dispositions.list', {
	    templateUrl: 'app/features/al/dispositions/list/list.html',
	    controller: ListComponent
	  });

})();
