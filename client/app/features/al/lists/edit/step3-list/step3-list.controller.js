'use strict';
(function(){
let _ConfirmAsync, _ListService, _, _ContactFieldsService;
let _$state, _$stateParams, _$filter, _$uibModal;

function _pad(num){
  return (num < 10) ? '0'+num : num;
}

function _formatDate(date, formatDate, formatTime){
  let formatedDate = '';
  let time = '';
  let month = _pad(date.getMonth()+1);
  let day = _pad(date.getDate());
  let year = _pad(date.getFullYear());
  let hours = _pad(date.getHours());
  let minutes = _pad(date.getMinutes());
  let seconds = _pad(date.getSeconds());
  
  switch(formatTime){
    case 'HH:mm:ss.SSS': time = hours + ':' + minutes + ':' + seconds;
    break;
    case 'HH:mm': time = hours + ':' + minutes;
    break;
    case 'hh:mm a': time = hours + ':' + minutes;
    break;
    case 'HH': time = hours;
    break;
    case 'hh a': time = hours;
    break;
    case 'H:mm': time = hours + ':' + minutes;
    break;
    case 'h:mm a': time = hours + ':' + minutes;
    break;
    default: time = hours + ':' + minutes + ':' + seconds;
    break;
  }

  switch(formatDate){
    case 'yyyy-MM-dd': formatedDate = year + '-' + month + '-' + day + ' ' + time;
    break;
    case 'MM/dd/yyyy': formatedDate = month + '/' + day + '/' + year + ' ' + time;
    break;
    case 'MM-dd-yyyy': formatedDate = month + '-' + day + '-' + year + ' ' + time;
    break;
    case 'MM-dd/yy': formatedDate = month + '-' + day + '/' + year + ' ' + time;
    break;
    case 'MMM dd': formatedDate = month + ' ' + day + ' ' + time;
    break;
    case 'yyyy': formatedDate = year + ' ' + time;
    break;
    case 'dd MMM': formatedDate = day + '-' + month + ' ' + time;
    break;
    case 'dd-MM': formatedDate = month + '-' + day + '-' + year + ' ' + time;
    break;
    case 'MM-dd': formatedDate = month + '-' + day + '-' + year + ' ' + time;
    break;
    default: formatedDate = month + '-' + day + '-' + year + ' ' + time; 
    break;
  }

  return formatedDate;
}
class ListComponent {
  constructor($state, $stateParams, $filter, $uibModal, ListsService, ConfirmAsync, ContactFieldsService, lodash) {
      
      this.importData = {fields: [], keys: [], rows: []};
      this.currentPage = 1;
      this.sortKey = '';
      this.reverse = false;
      this.numPerPage = 10;
      this.beginNext = 0;
      this.quantities = [5, 10, 15, 20];
      this.message = { show: false }; 
      this.search= '';
      this.filteredList=[];
      this.list = [];
      this.contact = {};
      this.selected = '';
      this.selectedOld = '';
      this.selectedArray = [];
      this.method = 'create';
      this.manual = false;
      this.sendContact = {listName: '', importData: { values: []}};
      this.contactFields = [];
      this.fieldsMapping = [];
      this.loadingContacts = true;
      this.listManual = {};
      this.sending = false;
      this.error = false;
      this.loaded = false;
      this.typeUpdate = false;
      _$state = $state;
      _$stateParams = $stateParams;
      _$filter = $filter;
      _$uibModal = $uibModal;
      _ListService = ListsService;
      _ConfirmAsync = ConfirmAsync;
      _ContactFieldsService = ContactFieldsService;
      _ = lodash;
      
      if(_$stateParams.settings){
        if(_$stateParams.settings.resultMapping){
          this.importData.fields = _$stateParams.settings.resultMapping.headerFields;
          this.importData.keys = _$stateParams.settings.resultMapping.keys;
          this.importData.rows = _$stateParams.settings.resultMapping.rows;
          this.list = this.importData.rows;
          this.loaded = true;
        }else{
          this.manual = true;
          this.contactFields = _$stateParams.settings.fields;
          this.initArrays();
        }

        this.sendContact.listName = _$stateParams.name;
        this.typeUpdate = (_$stateParams.settings.listUpdateSettings) ? true : false;
      }else{
        let theMsg = 'Bad params';
        this.error = true;
        this.message={ show: true, type: 'warning', text: theMsg, expires: 3000};
      }
  }

  sortColumn(columnName) {
      if (columnName !== undefined && columnName) {
          console.log('sorting:' + columnName);
          this.sortKey = columnName;
          this.list = _$filter('orderBy')(this.list, this.sortKey, this.reverse);
          this.reverse = !this.reverse;
          return true;
      } else {
          return false;
      }
  }

  shuffleList(){
    return _ConfirmAsync('Really shuffle this list?')
          .then(() => {                 
            this.selected = '';
            this.selectedOld = '';
            this.selectedArray = [];
            this.contact = {};
            this.list = _.shuffle(this.list);
            this.importData.rows = this.list;
          })
          .catch(() => {
              return false;
          });
  }

  getSort(param){
    return (param === this.sortKey) ? true: false;    
  }

  getMax(){
      let total=this.currentPage*this.numPerPage;
      return (total>this.filteredList.length)?this.filteredList.length+'':total;
  }

  selectedContact(contact, item){
    this.contact = item;
    let index = this.selectedArray.indexOf(contact);

    if(index !== -1){
      this.selectedArray.splice(index, 1);
      if(this.selectedArray.length < 1){
        this.selected = '';
        this.selectedOld = '';
        this.contact = {};
      }else{
        this.selected = this.selectedArray[0];
        this.selectedOld = this.selectedArray[0];
      }
    }else{
      if(contact !== this.selectedOld){
        this.selectedArray.push(contact);
      }
      
      this.selected = contact;
      this.selectedOld = contact;
    }

    console.log(this.selected);
    console.log(this.selectedArray);
  }

  insertContact(){
    this.selected = '';
    this.method = 'create'; 
    this.openModal();
  }

  editContact(){
    this.method = 'update';
    this.openModal();
  }

  deleteContact(){
    return _ConfirmAsync('Delete selected row(s)?')
          .then(() => {                 
            let tempList = [];
            tempList = this.list.filter((el, key)=>{
            return (this.selectedArray.indexOf(key) === -1);     
            });

            this.list = tempList;
            this.importData.rows = this.list;
            this.selected = '';
            this.selectedOld = '';
            this.selectedArray = [];
            this.contact = {};
          })
          .catch(() => {
              return false;
          });
  }

  openModal(){

    this.modalInstance = _$uibModal.open({
      animation: false,
      size: 'md',
      controllerAs: '$ctrl',
      appendTo: angular.element(document.querySelector('#edit-list')),
      template: '<al.lists.contact-modal></al.lists.contact-modal>'
    });

    this.modalInstance.result
        .then(result => {
            console.log(result);
            if(typeof result !== 'undefined' && Object.keys(result).length > 0){
              if(this.method === 'create'){
                if(this.manual){
                  let listManualCopy = angular.copy(this.listManual);
                  _.map(result, (value, key)=>{
                    listManualCopy[key] = value;
                  }, this);
                  this.list.push(listManualCopy);
                }else{
                  this.list.push(result);
                }
              }else{
                angular.merge(this.contact, result);
              }
            }
            this.selected = '';
            this.selectedOld = '';
            this.selectedArray = [];
            this.contact = {};
        }, ()=>{
          console.log('Modal dismissed at: ' + new Date());
          this.selected = '';
          this.selectedOld = '';
          this.selectedArray = [];
          this.contact = {};
        });
  }

  uploadContacts(){
    
    let list = [];
    let items = [];
    let elements = [];
    let listUpdateSettings;
    let listDeleteSettings;

    let mainList = angular.copy(this.list);

    list = _.map(mainList, value => {
        elements = _.map(value, (elem) => {
            if(elem instanceof Date){
              elem = _formatDate(elem, 'd', 'h');
            }
            return elem;
        });
        return elements;
    });

    items = _.map(list, value =>{
      return {item: value};     
    });

    this.sendContact.importData.values = items;

    if(_$stateParams.settings.listUpdateSettings){
      //UPDATE
      listUpdateSettings = _$stateParams.settings.listUpdateSettings;
      this.sendContact.listUpdateSettings = listUpdateSettings;
      if(this.manual){
        this.sendContact.listUpdateSettings.fieldsMapping = this.fieldsMapping;
      }else{
        this.sendContact.listUpdateSettings.fieldsMapping = _$stateParams.settings.fieldsMapping;
      }
      console.log(this.sendContact);
      this.sending= true;
      return _ListService.addContacts(this.sendContact)
      .then(response=>{  
        if(response.data.return.identifier){
          this.sending= false;
          _$state.go('ap.al.lists', {name: this.sendContact.listName, identifier: response.data.return.identifier, isUpdate: true});
        }
        return response;
      })
      .catch(error =>{    
        this.SubmitText='Save';
        this.message={ show: true, type: 'danger', text: error.errorMessage, expires: 5000 };
        return error;
      });

    }else{
      //DELETE
      listDeleteSettings = _$stateParams.settings.listDeleteSettings;
      this.sendContact.listDeleteSettings = listDeleteSettings;
      if(this.manual){
        this.sendContact.listDeleteSettings.fieldsMapping = this.fieldsMapping;
      }else{
        this.sendContact.listDeleteSettings.fieldsMapping = _$stateParams.settings.fieldsMapping;
      }
      console.log(this.sendContact);
      this.sending= true;
      return _ListService.deleteContacts(this.sendContact)
      .then(response=>{  
        if(response.data.return.identifier){
          this.sending= false;
          _$state.go('ap.al.lists', {name: this.sendContact.listName, identifier: response.data.return.identifier, isUpdate: false});
        }
        return response;
      })
      .catch(error =>{    
        this.SubmitText='Save';
        this.message={ show: true, type: 'danger', text: error.errorMessage, expires: 5000 };
        return error;
      });
    }
  }

  cancelList(){
      _$state.go('ap.al.lists');
  }

  initArrays() {
      let cont = 1;
      let key = false;
      let listManual = {};
      console.log('initialized arrays');
      if (this.contactFields) {
        this.loadingContacts = false;
        _.map(this.contactFields, value=>{
          if(value.name === 'number1'){
            key = true;
          }else{
            key = false;
          }
          listManual[value.name] = '';
          this.fieldsMapping.push({columnNumber: cont, fieldName: value.name, key: key});
          cont++;
        });
        this.importData.fields = this.contactFields;
        this.listManual = listManual;
        this.loaded = true;
      }
  }

  filteringBySearch(){
    this.selected = '';
    this.selectedOld = '';
    this.selectedArray = [];
    this.contact = {};

    if(this.search){
        this.beginNext=0;
        this.currentPage = 1;
        return true;
    }
    return false;
  }

  pageChanged() {
    console.log('Page changed to: ' + this.currentPage);
    this.beginNext = (this.currentPage - 1) * this.numPerPage;
    console.log('beginNext:' + this.beginNext);
  }
}
ListComponent.$inject = ['$state', '$stateParams', '$filter', '$uibModal', 'ListsService', 'ConfirmAsync', 'ContactFieldsService', 'lodash'];
angular.module('fakiyaMainApp')
  .component('al.lists.edit.list', {
    templateUrl: 'app/features/al/lists/edit/step3-list/step3-list.html',
    controller: ListComponent
  });

})();