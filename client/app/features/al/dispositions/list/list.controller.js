'use strict';
(function(){
    let _ConfirmAsync;
    const ORIGINAL_CAMPAIGN_MESSAGE='Can&apos;t remove disposition which is in use';
    const ORIGINAL_SYSTEM_MESSAGE='Cannot remove system disposition';
    const CUSTOM_CAMPAIGN_MESSAGE='The object cannot be deleted. Please verify it is not being used by any campaign.';
    const CUSTOM_SYSTEM_MESSAGE='The object is a system disposition and it cannot be deleted';
    function replaceUndefined(disposition){
        if(!angular.isDefined(disposition.description)){
            disposition.description='';
        }
        return disposition;
    }
    function getFormatedMessage(message)
    {
        switch(message)
        {
            case ORIGINAL_CAMPAIGN_MESSAGE:
                return CUSTOM_CAMPAIGN_MESSAGE;
            case ORIGINAL_SYSTEM_MESSAGE:
                return CUSTOM_SYSTEM_MESSAGE;
        }
        return message;
    }
    function getErrorMessage(xmlMessage)
    {
        let firstStep=xmlMessage.split('<faultstring>');
        if(firstStep.length<2){
            return xmlMessage;
        }
        let secondStep=firstStep[1].split('</faultstring>');
        if(secondStep.length>0){
            return getFormatedMessage(secondStep[0]);
        }
        return xmlMessage;
    }
	class ListComponent {
		constructor($state, $stateParams, ConfirmAsync, DispositionsService) {
			this.message = { show: false };
			if ($stateParams.message !== null) {
				this.message = { show: true, type: $stateParams.message.type, text: $stateParams.message.text,expires: 3000 };

			}
			this.DispositionsService = DispositionsService;
			this.state = $state;
			this.init();
			this.toggleSkillRow = -1;
			_ConfirmAsync=ConfirmAsync;
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
                console.log('response in client Dispositions');
                console.log(_dispositions);
				if (_dispositions.statusCode === 200) {
					this.dispositions = _dispositions.data.map(replaceUndefined);
					return this.dispositions;
				} else {
					this.message = { show: true, type: 'warning', text: _dispositions.errorMessage };
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
                            console.log('response in client');
                            console.log(response);
                            if (response.statusCode === 204 && response.data === null) {
                                let index = this.dispositions.indexOf(item);
                                this.dispositions.splice(index, 1);
                                this.toggleDispositionRow = -1;
                                this.message = { show: true, type: 'success', text: 'Disposition Deleted', expires: 3000 };
                            }else{

                                this.toggleDispositionRow = -1;
                                this.message = { show: true, type: 'danger', text: getErrorMessage(response.errorMessage), expires:8000};
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
        filteringBySearch(){  
            if(this.search.name){               
                this.beginNext=0;
                this.currentPage = 1;
                return true;
             }
             return false;
        }
	}
	ListComponent.$inject = ['$state', '$stateParams',  'ConfirmAsync' ,'DispositionsService',];
	angular.module('fakiyaMainApp')
	  .component('al.dispositions.list', {
	    templateUrl: 'app/features/al/dispositions/list/list.html',
	    controller: ListComponent
	  });

})();
