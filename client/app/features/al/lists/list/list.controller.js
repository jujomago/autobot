'use strict';
(function(){
  let _ConfirmAsync, _ListsService, _AlertMessage, _Global, _ModalManager;
  let _$state,_$stateParams, _$filter;
  function _myIndex(lists ,name){
    //TODO: replace with return _lodash.findIndex(lists, function(list) { return list.name === name });
    return lists.map(e=>e.name).indexOf(name);
  }
  function _myPage(index, numPerPage){
    return (Math.floor(index/numPerPage)+1);
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
  class ListComponent {
    constructor(ListsService,$stateParams,$state, $filter, ModalManager,ConfirmAsync, AlertMessage, Global) {
        this.lists = [];
        _$stateParams = $stateParams;
        this.message = { show: false }; 
        if (_$stateParams.message !== null) {
          this.message = { show: true, type: _$stateParams.message.type, text: _$stateParams.message.text,expires: 3000 };
        }
        _$filter = $filter;
        _AlertMessage = AlertMessage;
        _ModalManager = ModalManager;
        _Global = Global;
        this.currentPage = 1;
        this.sortKey = '';
        this.reverse = true;
        this.numPerPage = 10;
        this.beginNext = 0;
        this.quantities = [5, 10, 15, 20];
        this.toggleListRow = -1;
        this.toggleStatusRow=-1;
        this.processedRow = null;
        this.typeCampaignFilter = '';   
        this.search={name:''};
        this.originalLists=[];
        _$state = $state;
        _ConfirmAsync = ConfirmAsync;
        _ListsService = ListsService;
    }
    $onInit() {
        let promiseLists = this.getLists();
        if(_$stateParams.identifier){  
          promiseLists.then(() =>{
            this.goToProcessedRow();
            this.getResult(_$stateParams.identifier, _$stateParams.name, _$stateParams.isUpdate);
          });
        }
    }
    goToProcessedRow(){
      let index =  _myIndex(this.lists, _$stateParams.name);
      this.currentPage = _myPage(index, this.numPerPage);
      this.pageChanged();
      this.processedRow = _$stateParams.name;
    }
    orderList(list){
      if(this.sortKey){
        this.lists = _$filter('orderBy')(list, this.sortKey, this.reverse);
      }
    }
    sortColumn(columnName) {
        if (columnName !== undefined && columnName) {
            this.sortKey = columnName;
            this.reverse = !this.reverse;
            this.orderList(this.lists);
            return true;
        } else {
            return false;
        }
    }
    getMax(){
        let total=this.currentPage*this.numPerPage;
        return (total>this.lists.length)?this.lists.length+'':total;
    }
    getLists() {
      return _ListsService.getLists()
        .then(response => {         
          if (response.statusCode === 200) {
              this.originalLists = response.data;
              this.lists = this.originalLists;
              this.sortColumn('name');
           } 
           return this.lists;
        })
       .catch(e =>{    
          let theMsg= (e.error)? e.error.body:e; 
          this.message={ show: true, type: 'warning', text: theMsg};
          return e;
        });
    }

    updateListRecord(list){
      _$state.go('ap.al.listsEdit', {name: list, isUpdate: true});
    }
    deleteListRecord(list){
      _$state.go('ap.al.listsEdit', {name: list, isUpdate: false});
    }
    filteringBySearch(){  
      this.lists = _$filter('filter')(this.originalLists, this.search);
      this.orderList(this.lists);
      if(this.search.name){               
          this.beginNext=0;
          this.currentPage = 1;
          return true;
       }
       return false;
    }
    openModal(){
      this.modalInstance = _ModalManager.open({
        animation: false,
        template: '<al.lists.create></al.lists.create>',
        size: 'md',
        appendTo: angular.element('#modal-container'),
        backdropClass: 'dark-backdrop',
        controllerAs: '$ctrl',
      });

    }
    deleteList(list, indexRow) {
    return _ConfirmAsync('Are you sure to delete "' + list.name + '"?')          
      .then(() => {
        console.log ('ACCEPTED!');
        this.toggleListRow = indexRow;
        return _ListsService.deleteList(list);
      })
      .then(response => {
        console.log('response in client');
        console.log(response);
        this.toggleListRow = -1;
        if (response.statusCode === 204) {
          let index = this.lists.indexOf(list);

          this.lists.splice(index, 1);
          
          this.message={ show: true, 
                         type: 'success', 
                         text: 'List "' + list.name + '" Deleted"', 
                         expires:3000};
        }
        else
        {
          console.log('response in client if failed');
          console.log(response);
          this.message = { show: true, type: 'danger', text: 'The object cannot be deleted. Please verify it is not being used by any campaign.', expires:8000};
        } 
        return response;
      })
      .catch(e =>{    
       return e;
      });
    }
    
    pageChanged() {
      console.log('Page changed to: ' + this.currentPage);
      this.beginNext = (this.currentPage - 1) * this.numPerPage;
      console.log('beginNext:' + this.beginNext);
    }
    updateRowSize(index, result){
      if(index>-1){
        this.lists[index].size+= result.listRecordsInserted - result.listRecordsDeleted;
      }
    }
    getResult(identifier, listName, isUpdate) {
      _Global.proccessIsRunning = true;       
      return _ListsService.isImportRunning(identifier,300)
        .then(response=>{
          console.log(response);
          if(!response.data){
            return _ListsService.getResult(identifier);
          }
        })
        .then(response =>{
          response.summaryMessage = _formatMessage(response.data, isUpdate, listName);
          _AlertMessage(response.summaryMessage);
          let index = _myIndex(this.lists, _$stateParams.name);
          this.updateRowSize(index, response.data);
          this.processedRow = null;
          _Global.proccessIsRunning = false;
          return response;
        })
       .catch(e =>{    
          let theMsg= e.errorMessage;
          this.message={ show: true, type: 'danger', text: theMsg};
          return e;
        });    
    }
  }

  ListComponent.$inject = ['ListsService','$stateParams','$state', '$filter', 'ModalManager', 'ConfirmAsync', 'AlertMessage', 'Global'];

  angular.module('fakiyaMainApp')
    .component('al.lists.list', {
      templateUrl: 'app/features/al/lists/list/list.html',
      controller: ListComponent
    });

})();
