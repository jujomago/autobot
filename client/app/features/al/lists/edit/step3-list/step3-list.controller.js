'use strict';
(function(){
let _ConfirmAsync, _ListService, _, _ContactFieldsService;
let _$state, _$stateParams, _$filter, _$uibModal;
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
          this.getContactFiels();
        }

        this.sendContact.listName = _$stateParams.name;
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
    this.selected = '';
    this.list = _.shuffle(this.list);
    this.importData.rows = this.list;

  }

  getSort(param){
    return (param === this.sortKey) ? true: false;    
  }

  getMax(){
      let total=this.currentPage*this.numPerPage;
      return (total>this.filteredList.length)?this.filteredList.length+'':total;
  }

  selectedContact(contact){
    
    let index = this.selectedArray.indexOf(contact);

    if(index !== -1){
      this.selectedArray.splice(index, 1);
      if(this.selectedArray.length < 1){
        this.selected = '';
        this.selectedOld = '';
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

  editContact(contact){
    this.method = 'update';
    this.contact = this.list[contact];
    this.openModal();
  }

  deleteContact(){
    let tempList = [];
    tempList = this.list.filter((el, key)=>{
      return (this.selectedArray.indexOf(key) === -1);     
    });

    this.list = tempList;
    this.importData.rows = this.list;
    this.selected = '';
    this.selectedOld = '';
    this.selectedArray = [];
  }

  openModal(){
    let ctrl = this;
    ctrl.contact = (ctrl.method === 'create') ? {}: ctrl.contact;
    this.modalInstance = _$uibModal.open({
      animation: false,
      templateUrl: 'app/features/al/lists/edit/step3-list/contactModal/contactModal.html',
      size: 'md',
      controller: 'ContactModalCtrl',
      controllerAs: '$ctrl',
      appendTo: angular.element(document.querySelector('#edit-list')),
      resolve: {
        contactModal: function () {
          return ctrl.contact;
        },
        fields: function(){
          return ctrl.importData.fields;
        }
      }
    });

    this.modalInstance.result.then(function (result) {
      if(typeof result !== 'undefined' && Object.keys(result).length > 0){
        if(ctrl.method === 'create'){
          if(ctrl.manual){
            let listManualCopy = angular.copy(ctrl.listManual);
            _.map(result, (value, key)=>{
              listManualCopy[key] = value;
            }, ctrl);
            ctrl.list.push(listManualCopy);
          }else{
            ctrl.list.push(result);
          }
        }else{
          if(ctrl.manual){
            let listManualCopy = angular.copy(ctrl.listManual);
            _.map(result, (value, key)=>{
              listManualCopy[key] = value;
            }, ctrl);
            ctrl.list[ctrl.selected] = listManualCopy;
          }else{
            ctrl.list[ctrl.selected] = result;
          }
        }
      }
      ctrl.selected = '';
      ctrl.selectedOld = '';
      ctrl.selectedArray = [];
    }, function () {
        console.log('Modal dismissed at: ' + new Date());
        ctrl.selected = '';
        ctrl.selectedOld = '';
        ctrl.selectedArray = [];
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
              if(response.statusCode === 201){
                  if(response.data.return.identifier){
                    this.sending= false;
                    _$state.go('ap.al.listsEdit', {name: this.sendContact.listName, identifier: response.data.return.identifier});     
                  }
              }
              else{
                this.SubmitText='Save';
                let theMsg= response.errorMessage; 
                this.message={ show: true, type: 'danger', text: theMsg, expires: 5000 };
              }
              return response;
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
              if(response.statusCode === 200){
                  if(response.data.return.identifier){
                    this.sending= false;
                    _$state.go('ap.al.listsEdit', {name: this.sendContact.listName, identifier: response.data.return.identifier});     
                  }
              }
              else{
                this.SubmitText='Save';
                let theMsg= response.errorMessage; 
                this.message={ show: true, type: 'danger', text: theMsg, expires: 5000 };
              }
              return response;
      });
    }
  }

  cancelList(){
    if(_$stateParams.name){
      _$state.go('ap.al.listsEdit', {name: _$stateParams.name});
    }else{
      _$state.go('ap.al.lists', {});
    }
  }

  initArrays() {
      let cont = 1;
      let key = false;
      let listManual = {};
      console.log('initialized arrays');
      if (this.contactFields) {
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

  getContactFiels(){
      return _ContactFieldsService.getContactFields()
          .then(response => {
              if (response.statusCode === 200) {
                this.contactFields = response.data;
                this.initArrays();
                this.loadingContacts = false;
              } else {
                  this.message = { show: true, type: 'warning', text: response.errorMessage };
              }
              return response;
          })
          .catch(e => {
              this.message = { show: true, type: 'warning', text: e };
              return e;
          });
  }

  filteringBySearch(){
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