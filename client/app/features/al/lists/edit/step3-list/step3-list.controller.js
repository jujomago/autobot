'use strict';
(function(){
let _ConfirmAsync, _ListService, _, _ContactFieldsService, ctrl, _FieldFormatter, _Utils;
let _$state, _$stateParams, _$filter, _ModalManager;


function _getSets(field) {
    if(field.restrictions){
      let set = field.restrictions.filter(r => (r.type === 'Set' || r.type === 'Multiset'));
      if(set.length>0){
        field.dataSet = set;
        field.realType = field.type;
        field.type = set[0].type.toUpperCase();
        field.restrictions = field.restrictions.filter(r => (r.type !== 'Set' && r.type !== 'Multiset'));
      }
    }
    return field;
}
function _formatExist(field, key){
  if(!field.restrictions){
      return null;
    }
  let result = _.find(field.restrictions, e => e.type === key);

  return result?result.value:null;
}
function _getPresicion(field){
  let resultPrescision = _.find(field.restrictions, e => e.type === 'Precision');
  let resultScale = _.find(field.restrictions, e => e.type === 'Scale');
  if(resultScale){
    return resultPrescision.value*1-resultScale.value*1;
  }
  return resultPrescision;
}
function _extractFormats(field) {
    if(_formatExist(field, 'Required') !== null){
      field.required = true;
    }
    let result=_formatExist(field, 'CurrencyType');
    if(result !== null){
      field.currencyType = result;
    }
    result=_formatExist(field, 'DateFormat');
    if(result !== null){
      field.dateFormat = result;
    }
    result=_formatExist(field, 'TimeFormat');
    if(result !== null){
      field.timeFormat = result;
    }
    result=_formatExist(field, 'TimePeriodFormat');
    if(result !== null){
      field.timeFormat = result;
    }
    result=_formatExist(field, 'MinValue');
    if(result !== null){
      field.minValue = result;
    }
    result=_formatExist(field, 'MaxValue');
    if(result !== null){
      field.maxValue = result;
    }
    result=_formatExist(field, 'Regexp');
    if(result !== null){
      field.regex = result;
    }
    result=_formatExist(field, 'Precision');
    if(result !== null){
      let resultPrescision = field.restrictions.findIndex(e => e.type === 'Precision');
      let precision = _getPresicion(field);
      field.restrictions[resultPrescision].value = precision;
      field.precision = precision;
    }
    result=_formatExist(field, 'Scale');
    if(result !== null){
      field.scale = result;
    }
    return field;
}
class ListComponent {
  constructor($state, $stateParams, $filter, ModalManager, ListsService, ConfirmAsync, ContactFieldsService, lodash, FieldFormatter, Utils) {

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
      this.contactFields = [];
      this.fieldsMapping = [];
      this.loadingContacts = true;
      this.listManual = {};
      this.sending = false;
      this.error = false;
      this.loaded = false;
      this.isUpdate = true;
      ctrl = this;
      _ = lodash;
      _$state = $state;
      _$stateParams = $stateParams;
      _$filter = $filter;
      _ModalManager = ModalManager;
      _ListService = ListsService;
      _ConfirmAsync = ConfirmAsync;
      _FieldFormatter = FieldFormatter;
      _ContactFieldsService = ContactFieldsService;
      _Utils = Utils;
      this.listName = _$stateParams.name;
      this.sendContact = {listName: this.listName, importData: {values: []} }
      this.listUpdateSettings = {
        cleanListBeforeUpdate: false,
        crmAddMode: 'ADD_NEW',
        crmUpdateMode: 'UPDATE_FIRST',
        listAddMode: 'ADD_FIRST'
      };
      this.listDeleteSettings = {
        listDeleteMode: 'DELETE_ALL'
      };
  }

  $onInit(){
    this.isUpdate = JSON.parse(_$stateParams.update);
    this.getContactFields();
  }

  generateMapping(){
    for (let i = 0; i < this.contactFields.length; i++) {
      let key = false;

      if (this.contactFields[i].name === 'number1') {
        key=true;
        this.contactFields[i].isKey = true;
      }

      this.fieldsMapping.push({
                                columnNumber: i+1,
                                fieldName: this.contactFields[i].name,
                                key: key
                              });
    }
  }

  getContactFields() {
    return _ContactFieldsService.getContactFields()
    .then(response => {
        this.contactFields = response.data.filter(e => (e.mapTo === 'None'));

        this.contactFields  = this.isUpdate ?
                                    this.contactFields.map(_getSets).map(_extractFormats) :
                                    [this.contactFields[0]].map(_getSets).map(_extractFormats);

        this.generateMapping();
        this.loaded = true;
        return response;
    })
    .catch(error => {
        this.message = { show: true, type: 'danger', text: error.errorMessage };
        return error;
    });
  }

  sortColumn(columnName) {
      if (columnName !== undefined && columnName) {
          this.sortKey = columnName;
          let reverse = this.reverse;
          this.list = this.list.sort((itemA,itemB)=>{
            if(reverse){
              return itemA[columnName] > itemB[columnName];
            }
            else{
              return itemA[columnName] < itemB[columnName];
            }
          });
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
  }

  insertContact(){
    this.selected = '';
    this.method = 'create';
    this.openModal();
  }

  editContact(item){
    if(item){
      this.contact = item;
    }
    this.selectedIndex = this.list.indexOf(this.contact);
    this.method = 'update';
    this.openModal();
  }

  deleteContact(){
    return _ConfirmAsync('Delete selected row(s)?')
          .then(() => {
            let tempList = this.list.filter((el, key)=>{
            return (this.selectedArray.indexOf(key) === -1);
            });

            this.list = tempList;
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

    this.modalInstance = _ModalManager.open({
      animation: false,
      size: 'md',
      controllerAs: '$ctrl',
      appendTo: angular.element('#modal-container'),
      template: '<al.lists.contact-modal></al.lists.contact-modal>'
    });

    this.modalInstance.result
        .then(result => {
            if(typeof result !== 'undefined' && Object.keys(result).length > 0){
                  if(this.method==='create'){
                    this.list.unshift(result);
                    this.currentPage = 1;
                    this.pageChanged();
                  }
                  else{
                    this.list[this.selectedIndex] = result;
                  }
            }
            this.selected = '';
            this.selectedOld = '';
            this.selectedArray = [];
            this.contact = {};
            this.selectedIndex = -1;
            this.selectedContact(0, result);
        }, ()=>{
          this.selected = '';
          this.selectedOld = '';
          this.selectedArray = [];
          this.contact = {};
          this.selectedIndex = -1;
        });
  }

  uploadContacts(){

    let list = angular.copy(this.list),
        promiseUpload,
        mainList;

    mainList =  list.map(item => {
        let keys = Object.keys(item);

        for(let i=0;i<keys.length;i++){
          let key = keys[i];

          item[key] =  _FieldFormatter.formatField(ctrl.contactFields[i], item[key]);
        }
        return item;
    });

    _.each(mainList,e=>{
      this.sendContact.importData.values.push({item: _.values(e)});
    });

    this.sending = true;

    if (this.isUpdate) {
      this.listUpdateSettings.fieldsMapping = this.fieldsMapping;
      this.sendContact.listUpdateSettings = this.listUpdateSettings;
    }
    else {
      this.listDeleteSettings.fieldsMapping = this.fieldsMapping;
      this.sendContact.listDeleteSettings = this.listDeleteSettings;
    }

    promiseUpload = this.isUpdate ? _ListService.addContacts(this.sendContact) : _ListService.deleteContacts(this.sendContact);

    return promiseUpload.then(response => {
        if (response.data.return.identifier) {
          this.sending = false;
          _$state.go('ap.al.lists', {name: this.sendContact.listName, identifier: response.data.return.identifier, isUpdate: this.isUpdate});
        }
        return response;
      }).catch(error =>{
        this.SubmitText='Save';
        let message={ show: true, type: 'danger', text: error.errorMessage, expires: 5000 };
        _$state.go('ap.al.lists',{message: message});
        return error;
      });
  }

  cancelList(){
      _$state.go('ap.al.lists');
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
    this.beginNext = (this.currentPage - 1) * this.numPerPage;
  }
  formatField(field, value){
    return _FieldFormatter.formatField(field, value);
  }
}
ListComponent.$inject = ['$state', '$stateParams', '$filter', 'ModalManager', 'ListsService', 'ConfirmAsync', 'ContactFieldsService', 'lodash', 'FieldFormatter', 'Utils'];
angular.module('fakiyaMainApp')
  .component('al.lists.edit.list', {
    templateUrl: 'app/features/al/lists/edit/step3-list/step3-list.html',
    controller: ListComponent
  });

})();
