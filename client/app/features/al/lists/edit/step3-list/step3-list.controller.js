'use strict';
(function(){
let _ConfirmAsync, _ListsService, _;
let _$state, _$stateParams, _$filter, _$uibModal;
class ListComponent {
  constructor($state, $stateParams, $filter, $uibModal, ListsService, ConfirmAsync , lodash) {
      
      this.importData = 
      {
        fields:
        [
          {
            name:'number1',
            type:'PHONE',
            restrictions:
            [
              {type:'minlength',value:10},
              {type:'maxlength',value:20}
            ]
          },
          {name:'firstName',type:'STRING'},
          {name:'lastName',type:'STRING'},
          {name:'email',type:'EMAIL'}
        ],
        keys: [
          'number1'
        ],
        rows:
        [
          {
            number1: 1,
            firstName: 'autobox1',
            lastName: 'lastName1',
            email: 'autobox1@f.com'
          },
          {
            number1: 2,
            firstName: 'autobox2',
            lastName: 'lastName2',
            email: 'autobox2@f.com'
          },
          {
            number1: 3,
            firstName: 'autobox3',
            lastName: 'lastName3',
            email: 'autobox3@f.com'
          },
          {
            number1: '4',
            firstName: 'autobox4',
            lastName: 'lastName4',
            email: 'autobox4@f.com'
          },
          {
            number1: '5',
            firstName: 'autobox5',
            lastName: 'lastName5',
            email: 'autobox5@f.com'
          }
        ]
      };
      
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
      this.hasMapping = false;
      this.selected = '';
      this.selectedOld = '';
      this.selectedArray = [];
      this.method = 'create';
      this.manual = false;
      _$state = $state;
      _$stateParams = $stateParams;
      _$filter = $filter;
      _$uibModal = $uibModal;
      _ListsService = ListsService;
      _ConfirmAsync = ConfirmAsync;
      _ = lodash;
      
  }
  $onInit() {
      this.getList();
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

  getList() {
    //if(_$stateParams.settings && _$stateParams.settings.csvData){
    if(this.importData){
      //this.importData = _$stateParams.settings.csvData;

      //this.formData = this.importData.fields;
      //this.list = this.importData.rows;
      this.formData = this.importData.fields;
      this.list = this.importData.rows;
    }else{
      let theMsg = 'Bad params'; 
      this.message={ show: true, type: 'warning', text: theMsg, expires: 3000};
    }
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

    console.log(this.selectedArray);
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
      size: 'sm',
      controller: 'ContactModalCtrl',
      controllerAs: '$ctrl',
      resolve: {
        contactModal: function () {
          return ctrl.contact;
        },
        fields: function(){
          return ctrl.importData.fields;
        },
        keys: function(){
          return ctrl.importData.keys;
        }
      }
    });

    this.modalInstance.result.then(function (result) {
      if(typeof result !== 'undefined' && Object.keys(result).length > 0){
        if(ctrl.method === 'create'){
          ctrl.importData.rows.push(result);
        }else{
          ctrl.importData.rows[ctrl.selected] = result;
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
ListComponent.$inject = ['$state', '$stateParams', '$filter', '$uibModal', 'ListsService', 'ConfirmAsync', 'lodash'];
angular.module('fakiyaMainApp')
  .component('al.lists.edit.list', {
    templateUrl: 'app/features/al/lists/edit/step3-list/step3-list.html',
    controller: ListComponent
  });

})();
