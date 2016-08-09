'use strict';
(function () {

    let _$state, _$stateParams;
    let _ListsService;
    const LIST_ADD_MODES={
                ADD_FIRST: 'ADD_FIRST',
                ADD_ALL: 'ADD_ALL',
                ADD_IF_SOLE_CRM_MATCH: 'ADD_IF_SOLE_CRM_MATCH'
              };
    const CRM_ADD_MODES={
                ADD_NEW: 'ADD_NEW',
                DONT_ADD: 'DONT_ADD'
              };
    const CRM_UPDATE_MODES={
                UPDATE_FIRST: 'UPDATE_FIRST',
                UPDATE_ALL: 'UPDATE_ALL',
                UPDATE_SOLE_MATCHES: 'UPDATE_SOLE_MATCHES'
              };
    const LIST_DELETE_MODES={
                DELETE_ALL: 'DELETE_ALL',
                DELETE_EXCEPT_FIRST: 'DELETE_EXCEPT_FIRST'
              };
    function _setParams(settingsParams, listDeleteSettings, listUpdateSettings,deleteSelected, updateSelected){
      if(deleteSelected){
        settingsParams.listDeleteSettings = listDeleteSettings;
      }
      else if(updateSelected){
        settingsParams.listUpdateSettings = listUpdateSettings;
      }
    }
    class SettingsComponent {   

        constructor($state, $stateParams, ListsService) {
            _ListsService=ListsService;
            _$state = $state;
            _$stateParams = $stateParams;
            this.found=false;
            this.list = {};
            this.sent = false;
            this.confirm = false;
            this.message = { show: false };
            this.advancedOptions = {isCollapsed: true};
            this.updateRecords = true;
            this.settingsParams = {skipPreview: false};
            this.listUpdateSettings = {listAddMode: LIST_ADD_MODES.ADD_FIRST, crmAddMode: CRM_ADD_MODES.ADD_NEW,crmUpdateMode: CRM_UPDATE_MODES.UPDATE_FIRST, cleanListBeforeUpdate: false};
            this.listDeleteSettings = {listDeleteMode: LIST_DELETE_MODES.DELETE_ALL};
        }

        $onInit() {
        	if(_$stateParams.name!==null){
                this.selectHome();
                this.displayButtons();
        		let listName = _$stateParams.name;
	            this.getList(listName);
        	}
        }
        selectDelete(){
            this.homeSelected=false;
            this.deleteSelected=true;
            this.updateSelected=false;
        }
        selectUpdate(){
            this.homeSelected=false;
            this.deleteSelected=false;
            this.updateSelected=true;
        }
        selectHome(){
            this.homeSelected=true;
            this.deleteSelected=false;
            this.updateSelected=false;
            this.displayButtons();
        }
        displayButtons(){
            this.optionButtons = true;
            this.fileSelected = false;
        }
        displayFileField(){
            this.optionButtons = false;
            this.fileSelected = true;
        }
        goBack(){
          if(this.fileSelected){
            this.displayButtons();
          }
          else{
            this.selectHome();
          }
        }
        browseFile(){
          angular.element('#csv-file').trigger('click');
        }
        setUpdateValue(){
          if(this.updateRecords){
            this.listUpdateSettings.crmUpdateMode = CRM_UPDATE_MODES.UPDATE_FIRST;
          }
          else{
            this.listUpdateSettings.crmUpdateMode = CRM_UPDATE_MODES.DONT_UPDATE;
          }
        }
        nextStep()
        {
          _setParams(this.settingsParams, this.listDeleteSettings, this.listUpdateSettings, this.deleteSelected, this.updateSelected);
          _$state.go('ap.al.listsEdit-list', {settings:this.settingsParams,name:_$stateParams.name, manual: true});
        }
        sendFile()
        {
          this.sent = true;
          if(this.csvFile)
          {
            this.confirm = true;
            return _ListsService.getCSV(this.csvFile.data)
            .then(response => {
              this.confirm=false;
              if(response.statusCode === 200){
                this.settingsParams.csvData = response.data;
                _setParams(this.settingsParams, this.listDeleteSettings, this.listUpdateSettings, this.deleteSelected, this.updateSelected);
                _$state.go('ap.al.mapping', {settings:this.settingsParams,name:_$stateParams.name});
              }
              else{
                let theMsg= response.errorMessage; 
                this.message={ show: true, type: 'danger', text: theMsg};             
              }
              return response;
            });
          }

        }

        getList(name) {
            
            if(name){
                return _ListsService.getList(name)
                .then(response=>{

                  if(response.statusCode===200){
                     this.list={
                       name:response.data.name,
                       size:response.data.size,          
                     };
                     this.found=true;
                  }
                  return response;
                })
               .catch(e =>{    
                        let theMsg= (e.error)? e.error.body:e; 
                        this.message={ show: true, type: 'danger', text: theMsg};
                        this.found=false;
                        return e;
                });    
           }else{
                this.message={ show: true, type: 'danger', text: 'Bad params'};
                this.found=false;
           }
            
        }
    }


    SettingsComponent.$inject = ['$state', '$stateParams', 'ListsService'];

    angular.module('fakiyaMainApp')
        .component('al.lists.settings', {
            templateUrl: 'app/features/al/lists/edit/step1-settings/step1-settings.html',
            controller: SettingsComponent
        });

})();
