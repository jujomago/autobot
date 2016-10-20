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

    let crmRecordsInserted=Number(result.crmRecordsInserted);
    let crmRecordsUpdated=Number(result.crmRecordsUpdated);
    let listRecordsDeleted=Number(result.listRecordsDeleted);
    let listRecordsInserted=Number(result.listRecordsInserted);
    let message = '';
    if(crmRecordsInserted === 0 && crmRecordsUpdated === 0 && listRecordsDeleted === 0 && listRecordsInserted === 0){
      message+= 'Nothing was changed during the update.';
    }
    if(listRecordsDeleted !== 0){
      message+=listRecordsDeleted+' Call List records deleted, ';
    }
    if(listRecordsInserted !== 0){
      message+=listRecordsInserted+' Call List records inserted, ';
    }
    if(crmRecordsInserted !== 0){
      message+=crmRecordsInserted+' Contact Records inserted, ';
    }
    if(crmRecordsUpdated !== 0){
      message+=crmRecordsUpdated+' Contact Records updated';
    }

    if(message[message.length-1]===' '){
      message = message.substring(0, message.length - 2);
    }
    return message;
  }
  function _getListItems(result,isUpdate){
    let items=[];
    items.push(_getSummaryFirstRow(result));

    let uploadDuplicatesCount=Number(result.uploadDuplicatesCount);
    let uploadErrorsCount=Number(result.uploadErrorsCount);
    let warningsCount=result.warningsCount;

    if(!isUpdate){
      let errorsFoundQty=uploadDuplicatesCount+uploadErrorsCount;
      items.push(`${errorsFoundQty} ERRORS FOUND`);
      if(uploadErrorsCount!==0){
        items.push(`${uploadErrorsCount} lines with parse erros found`);
      }
      if(uploadDuplicatesCount!==0){
        items.push(`${uploadDuplicatesCount} lines with duplicate keys found`);
      }

    }else{
        if(uploadErrorsCount !== 0){
          items.push(result.uploadErrorsCount+' UPLOAD ERRORS FOUND');
        }
        if(uploadDuplicatesCount !== 0){
          items.push(`${uploadDuplicatesCount} ERRORS FOUND`);
          items.push(`${uploadDuplicatesCount} lines with duplicate keys found`);
        }
        else{
          items.push('No errors found');
        }
    }
     if(warningsCount){
          items.push(`${warningsCount.entry[0].value} WARNINGS FOUND`);
          items.push(`${warningsCount.entry[0].value} lines with import warning found`);
    }else{
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

    content.list = _getListItems(result,isUpdate);
    return content;
  }
  class ListComponent {
    constructor(ListsService,$stateParams,$state, $filter, ModalManager,ConfirmAsync, AlertMessage, Global) {
        this.lists = [];
        _$stateParams = $stateParams;
        this.message = { show: false };
        this.selectedRow = null;
        if (_$stateParams.message !== null) {
          this.message = { show: true, type: _$stateParams.message.type, text: _$stateParams.message.text,expires: 3000 };
          this.selectedRow = _$stateParams.list;
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
        let identifier = _$stateParams.identifier;
        _$stateParams.identifier = null;
        if(identifier){
          promiseLists.then(() =>{
            this.goToProcessedRow();
            this.getResult(identifier, _$stateParams.name, _$stateParams.isUpdate);
          });
        }

    }
    goToProcessedRow(){
      let index =  _myIndex(this.lists, _$stateParams.name);
      this.currentPage = _myPage(index, this.numPerPage);
      this.pageChanged();
      this.processedRow = _$stateParams.name;
    }
    goToSelectedRow(){
      let index =  _myIndex(this.lists, this.selectedRow.listName);
      this.currentPage = _myPage(index, this.numPerPage);
      this.pageChanged();
      this.selectedRow = this.selectedRow.listName;
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
           if(this.selectedRow){
             this.goToSelectedRow();
           }
           return this.lists;
        })
        .catch(error =>{
          this.message={ show: true, type: 'danger', text: error.errorMessage};
          return error;
        });
    }
    updateList(listName, index, summaryMessage) {
      return _ListsService.getList(listName)
        .then(response => {
          response.summaryMessage = summaryMessage;
          this.lists[index].size = response.data[0].size;
          this.processedRow = null;
          _Global.proccessIsRunning = false;
          this.selectedRow = listName;
          _AlertMessage(response.summaryMessage);
          return response;
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
        this.toggleListRow = indexRow;
        return _ListsService.deleteList(list);
      })
      .then(response => {
        this.toggleListRow = -1;
        let index = this.lists.indexOf(list);
        this.lists.splice(index, 1);
        this.message={ show: true,
                       type: 'success',
                       text: 'List "' + list.name + '" Deleted"',
                       expires:3000};
        return response;
      })
      .catch(error =>{
        if(error){
          this.toggleListRow = -1;
          this.message={ show: true, type: 'danger', text: error.errorMessage, expires: 5000 };
          return error;
        }
      });
    }

    pageChanged() {
      this.beginNext = (this.currentPage - 1) * this.numPerPage;
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
          if(!response.data){
            return _ListsService.getResult(identifier);
          }
        })
        .then(response =>{
          let summaryMessage = _formatMessage(response.data, isUpdate, listName);
          let index = _myIndex(this.lists, _$stateParams.name);
          return this.updateList(listName ,index, summaryMessage);
        })
       .catch(error =>{
          this.message={ show: true, type: 'danger', text: error.errorMessage, expires: 5000 };
          return error;
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
