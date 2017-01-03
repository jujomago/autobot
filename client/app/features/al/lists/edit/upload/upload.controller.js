(function(){
  'use strict';
  let _ConfirmAsync, _ListService, _lodash, _ContactFieldsService, ctrl, _FieldFormatter, _EditListActions ,_Utils, _$state, _$stateParams,
      _$filter, _ModalManager, _PromptDialog, _AlertDialog, _phones, _registeredPhones, _DncMessages;

  const DNC_ERROR_MESSAGE = {title: 'DNC Scrub', body: 'All your records have been found valid.\nYou may continue uploading the list.'};
  function _registerPhone(contact, key){
    if(contact[key] && contact[key].substr(0,3)!=='011' && !_registeredPhones[contact[key]]){
      _registeredPhones[contact[key]] = true;
      _phones.push(contact[key]);
    }
  }
  function _loadPhones(list){
    _phones = [];
    _registeredPhones = [];
    _lodash.each(list, contact => {
      _registerPhone(contact, 'number1');
      _registerPhone(contact, 'number2');
      _registerPhone(contact, 'number3');
    });
    return _phones.join(',');
  }

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
    let result = _lodash.find(field.restrictions, e => e.type === key);

    return result?result.value:null;
  }

  function _getPresicion(field){
    let resultPrescision = _lodash.find(field.restrictions, e => e.type === 'Precision');
    let resultScale = _lodash.find(field.restrictions, e => e.type === 'Scale');
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
class UploadListController {
  constructor(
        $state,
        $stateParams,
        $filter,
        ModalManager,
        ListsService,
        ConfirmAsync,
        ContactFieldsService,
        lodash,
        FieldFormatter,
        PromptDialog,
        AlertDialog,
        Utils,
        EditListActions,
        Global,
        DncMessages
      ) {
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
      this.global = Global;
      ctrl = this;
      _lodash = lodash;
      _$state = $state;
      _$stateParams = $stateParams;
      _$filter = $filter;
      _ModalManager = ModalManager;
      _ListService = ListsService;
      _ConfirmAsync = ConfirmAsync;
      _FieldFormatter = FieldFormatter;
      _PromptDialog = PromptDialog;
      _ContactFieldsService = ContactFieldsService;
      _AlertDialog = AlertDialog;
      _DncMessages=DncMessages;
      _Utils = Utils;
      _EditListActions = EditListActions;
      this.listName = _$stateParams.name;
      this.sendContact = {listName: this.listName, importData: {values: []} };

      this.listUpdateSettings = {};
      this.listDeleteSettings = {};
    }

    $onInit() {
      let parentContactFields = this.parent.getContactField();
      this.settings = this.parent.getSettings();

      this.isUpdate = this.parent.isUpdate;
      parentContactFields = _Utils.isUndefinedOrNull(parentContactFields) ? [] : parentContactFields;
      this.mappingValidation(parentContactFields);
    }

    mappingValidation(contactFields) {
      if(this.isUpdate) {
        if(this.settings.insertOnlyKeys) {
          contactFields = _EditListActions.getFieldsKey(contactFields);
        }
      }
      else {
        contactFields = _EditListActions.getFieldsKey(contactFields);
      }

      this.contactFields = contactFields.map(_getSets).map(_extractFormats);
      this.fieldsMapping = _EditListActions.getMappingFields(this.contactFields);
      this.loaded = true;
    }

   sortColumn(columnName) {
      if (columnName !== undefined && columnName) {
          this.contact = {};
          this.selectedArray = [];
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
            this.selectedArray = [];
            this.contact = {};
            this.list = _lodash.shuffle(this.list);
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

  selectedContact(selectedIndex, item){
    let index = this.selectedArray.indexOf(selectedIndex);
    this.contact = item;
    if(index !== -1){
      this.selectedArray.splice(index, 1);
      if(this.selectedArray.length > 1){
        this.contact = {};
      }else{
        let itemIndex = this.selectedArray[0];
        this.contact = this.list[itemIndex];
      }
    }else{
      this.selectedArray.push(selectedIndex);
    }
  }

  insertContact(){
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
            let tmpSelected=this.selectedIndex;
            this.selectedArray = [];
            this.contact = {};
            if(this.method==='create'){
              this.selectedContact(0, result);
            }
            else{
              this.selectedContact(tmpSelected, result);
            }


        }, ()=>{
          this.selectedArray = [];
          this.contact = {};
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

    _lodash.each(mainList,e=>{
      this.sendContact.importData.values.push({item: _lodash.values(e)});
    });

    this.sending = true;

    if (this.isUpdate) {
      this.listUpdateSettings = _EditListActions.getSettingsUpdate(this.settings);
      this.listUpdateSettings.fieldsMapping = this.fieldsMapping;
      this.sendContact.listUpdateSettings = this.listUpdateSettings;
    }
    else {
      this.listDeleteSettings.listDeleteMode = this.settings.listDeleteMode;
      this.listDeleteSettings.fieldsMapping = this.fieldsMapping;
      this.sendContact.listDeleteSettings = this.listDeleteSettings;
    }

    promiseUpload = this.isUpdate ? _ListService.addContacts(this.sendContact) : _ListService.deleteContacts(this.sendContact);

    return promiseUpload.then(response => {
        if (response.data.return.identifier) {
          this.sending = false;
          _Utils.setDataListAction({
            name: this.sendContact.listName,
            identifier: response.data.return.identifier,
            isUpdate: true
          });
          _$state.go('ap.al.lists');
        }
        return response;
      }).catch(error =>{
        this.SubmitText='Save';
        let message={ show: true, type: 'danger', text: error.errorMessage,name: this.sendContact.listName, expires: 5000 };
        _Utils.setDataListAction({messageError: message});
        _$state.go('ap.al.lists');
        return error;
      });
  }

  cancelList(){
      _$state.go('ap.al.lists');
  }

  filteringBySearch(){
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
  removeDnc(list){

    let invalids=list;
    let rows = [];
    let numInvalidContacts=0;
    let messageBody='';
   _lodash.each(this.list, (contact, index) => {
      let item = [];
      let reason=[];
      let indexNumber1=_lodash.findIndex(invalids,{'phone':contact.number1});
      let indexNumber2=_lodash.findIndex(invalids,{'phone':contact.number2});
      let indexNumber3=_lodash.findIndex(invalids,{'phone':contact.number3});


      if(indexNumber1>=0){
          item.push('Number1');
          reason.push(_DncMessages.getMessage(invalids[indexNumber1].status));
      }

      if(indexNumber2>=0){
          item.push('Number2');
          reason.push(_DncMessages.getMessage(invalids[indexNumber2].status));
      }

      if(indexNumber3>=0){
          item.push('Number3');
          reason.push(_DncMessages.getMessage(invalids[indexNumber3].status));
      }

      if(item.length===0){
          this.valids.push(contact);
      }else{
          numInvalidContacts++;
          let curIndex=index+1;
          _lodash.each(item,(el,i)=>{
               rows.push([curIndex, el, reason[i]]);
          });
      }
    });

    if(numInvalidContacts>1){

      messageBody=`${numInvalidContacts} of ${this.list.length} ${(this.list.length>1)?'records':'record'} have`;
    }else{
      messageBody=`${numInvalidContacts} of ${this.list.length} ${(this.list.length>1)?'records':'record'} has`;
    }
    return _PromptDialog.open({
            title: 'DNC Scrub',
            body: `${messageBody} been found invalid.\nYou may remove the invalid records before updating the list.`,
            listDetail: {
                headerList: 'Invalid records',
                cols: ['Line', 'Field','Reason'],
                rows: rows
            }
        },
        {
            okText: 'Remove records',
            cancelText:'Keep records',
            imageTitle: {
              class: 'dnclogo text-center fixed-margin-bottom-17',
              src: 'assets/default/images/dncscrublogo.gif',
              alt: 'dnc scrub logo'
            }
        });
  }
  generatePhones(){
    this.phones = _loadPhones(this.list);
    if(this.phones.length>0){
      this.openDNCModal();
    }
    else{
      _AlertDialog(DNC_ERROR_MESSAGE, {center: true});
    }
  }
  openDNCModal(){
    this.dncModalInstance = _ModalManager.open({
      animation: false,
      size: 'abx-sm',
      controllerAs: '$ctrl',
      windowTopClass: 'modal-summary',
      appendTo: angular.element('#dnc-modal-container'),
      template: '<check-dnc-modal></check-dnc-modal>'
    });
    this.valids = [];
    return this.dncModalInstance.result
    .then(response => {
      let list = response.filter(item => (item.status!=='C' && item.status!=='X' && item.status!=='O' && item.status!=='E' && item.status!=='R'));
      if(list.length>0){
        return this.removeDnc(list);
      }
      else{
        _AlertDialog(DNC_ERROR_MESSAGE, {center: true});
      }
      return false;
     })
    .then(response =>{
      if(response){
        this.list = this.valids;
        this.selectedArray = [];
        this.contact = {};
      }
      return response;
    });
  }
}
  UploadListController.$inject = [
  '$state',
  '$stateParams',
  '$filter',
  'ModalManager',
  'ListsService',
  'ConfirmAsync',
  'ContactFieldsService',
  'lodash',
  'FieldFormatter',
  'PromptDialog',
  'AlertDialog',
  'Utils',
  'EditListActions',
  'Global',
  'DncMessages'
];
angular.module('fakiyaMainApp')
  .component('alUploadList', {
    require: {
      parent: '^al.lists.edit'
    },
    templateUrl: 'app/features/al/lists/edit/upload/upload.html',
    controller: UploadListController
  });
})();
