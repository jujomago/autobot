'use strict';
(function () {

    let _$state, _$stateParams, _$timeout, _$rootScope;
    let _ListsService,_AlertMessage;
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
    function _getSummaryFirstRow(result){
      let message = '';
      if(result.crmRecordsInserted === '0' && result.crmRecordsUpdated === '0' && result.listRecordsDeleted === '0' && result
        .listRecordsInserted === '0'){
        message+= 'Nothing was changed during the update.';
      }
      if(result.crmRecordsInserted !== '0'){
        message+='Contact Records inserted: '+result.crmRecordsInserted+', ';
      }
      if(result.crmRecordsUpdated !== '0'){
        message+='Contact Records updated: '+result.crmRecordsUpdated+', ';
      }
      if(result.listRecordsDeleted !== '0'){
        message+='Call List records deleted: '+result.listRecordsDeleted+', ';
      }
      if(result.listRecordsInserted !== '0'){
        message+='Call List records inserted: '+result.listRecordsInserted;
      }
      if(message[message.length-1]===' '){
        message = message.substring(0, message.length - 2);
      }
      return message;
    }
    function _getListItems(result){
      let items=[];
      items.push(_getSummaryFirstRow(result));
      if(result.uploadErrorsCount !== '0'){
        items.push(result.uploadErrorsCount+' UPLOAD ERRORS FOUND');
      }
      if(result.uploadDuplicatesCount !== '0'){
        items.push(result.uploadDuplicatesCount+' lines with duplicate keys found');
        items.push(result.uploadDuplicatesCount+' ERRORS FOUND');
      }
      else{
        items.push('No errors found');
      }
      if(result.warningsCount){
        items.push(result.warningsCount.entry.length+' WARNINGS FOUND');
      }
      else{
        items.push('No warnings found');
      }
      return items;
    }
    function _formatMessage(result, isUpdate, listName){
      let content = {title: 'Summary'};
      let body=' for list "'+listName+'" has been succesfully completed.';
      if(isUpdate){
        body = 'Update'+body;
      }
      else{
        body = 'Delete'+body;
      }
      content.body = body;
      
      content.list = _getListItems(result);
      return content;
    }
    class SettingsComponent {   

        constructor($state, $stateParams,$timeout, $rootScope, ListsService, AlertMessage) {
            _ListsService=ListsService;
            _AlertMessage = AlertMessage;
            _$state = $state;
            _$stateParams = $stateParams;
            _$timeout = $timeout;
            _$rootScope = $rootScope;
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
          console.log(_$stateParams);
        	if(_$stateParams.name!==null){
            this.selectHome();
            this.displayButtons();
            if(!_$stateParams.identifier){  
        		  let listName = _$stateParams.name;
	            this.getList(listName);
            }
            else{
              this.getResult(_$stateParams.identifier, _$stateParams.name, _$stateParams.isUpdate);
            }
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
        getResult(identifier, listName, isUpdate) {
              _$rootScope.proccessIsRunning = true;            
              return _ListsService.isImportRunning(identifier,300)
                .then(response=>{
                  console.log(response);
                  if(!response.data){
                    return _ListsService.getResult(identifier);
                  }
                })
                .then(response =>{
                  response.summaryMessage = _formatMessage(response.data, isUpdate, listName);
                  console.log(response.data);
                  this.getList(listName);
                  _AlertMessage(response.summaryMessage);
                  _$rootScope.proccessIsRunning = false;
                  return response;
                })
               .catch(e =>{    
                  let theMsg= e.errorMessage;
                  this.message={ show: true, type: 'danger', text: theMsg};
                  return e;
                });    
        }

    }


    SettingsComponent.$inject = ['$state', '$stateParams', '$timeout', '$rootScope', 'ListsService', 'AlertMessage'];

    angular.module('fakiyaMainApp')
        .component('al.lists.settings', {
            templateUrl: 'app/features/al/lists/edit/step1-settings/step1-settings.html',
            controller: SettingsComponent
        });

})();
