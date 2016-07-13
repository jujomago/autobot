'use strict';
(function(){
let _ConfirmAsync;
class ListComponent {
  constructor(ListsService,ConfirmAsync) {
    this.lists = [];
    this.totalItems = 0;
      this.currentPage = 1;
      this.sortKey = '';
      this.reverse = true;
      this.numPerPage = 10;
      this.beginNext = 0;
      this.quantities = [5, 10, 15, 20];
      this.toggleListRow = -1;
      this.toggleStatusRow=-1;
      this.message = { show: false }; 
      this.typeCampaignFilter = '';   
      this.search={name:''};
      this.filteredLists=[];
      _ConfirmAsync = ConfirmAsync;
    this.ListsService = ListsService;
  }
  $onInit() {
      this.getLists();
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
  getLists() {
    return this.ListsService.getLists()
      .then(response => {         
        if (response.statusCode === 200) {
            this.lists = response.data;
            this.totalItems = this.lists.length;
         } 
         return this.lists;
      })
     .catch(e =>{    
       let theMsg= (e.error)? e.error.body:e; 
       this.message={ show: true, type: 'warning', text: theMsg};
        return e;
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
  deleteList(list, indexRow) {
  return _ConfirmAsync('Are you sure to delete "' + list.name + '"?')          
    .then(() => {
      console.log ('ACCEPTED!');
      this.toggleListRow = indexRow;
      return this.ListsService.deleteList(list);
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
      console.log('response in client if errors');
      console.log(e);
     let theMsg= (e.error)? e.error.body:e; 
     this.message={ show: true, type: 'warning', text: theMsg };
     return e;
    });
  }
  pageChanged() {
    console.log('Page changed to: ' + this.currentPage);
    this.beginNext = (this.currentPage - 1) * this.numPerPage;
    console.log('beginNext:' + this.beginNext);
  }
}
ListComponent.$inject = ['ListsService','ConfirmAsync'];
angular.module('fakiyaMainApp')
  .component('al.lists.list', {
    templateUrl: 'app/features/al/lists/list/list.html',
    controller: ListComponent
  });

})();