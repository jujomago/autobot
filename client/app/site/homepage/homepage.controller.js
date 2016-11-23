'use strict';
(function () {
  let _$anchorScroll,_$filter;
  let _ConctactService;
  
  class HomePageController {
  
    constructor($anchorScroll, ContactService,$filter) {
      this.submitText='Submit';
      this.message={'show':false};
     _ConctactService=ContactService;
     _$anchorScroll= $anchorScroll;   
     _$filter=$filter; 
    }
    scrollTo(id){
      _$anchorScroll(id);
    }
    changeToLowerCase(){     
      this.cform.businessEmail=_$filter('lowercase')(this.cform.businessEmail);      
    } 
    clearForm(form){
      Object.keys(this.cform).forEach(value => {
        this.cform[value] = '';
      });
      form.$setPristine();
    }
    sendmail(form){
        this.submitText='Submitting..';
        return _ConctactService.sendmail(this.cform)
        .then(response=>{
           this.submitText='Submit';
           this.message = { show: true, type:'success',text:'Email Sent Successfully', expires:4000 };
           this.clearForm(form);
          return response;
        })
        .catch(err=>{     
           this.submitText='Submit';
           this.message = { show: true, type:'danger', text: err.errorMessage || err , expires:4000 };   
           return err;
        });
    }
  }
  HomePageController.$inject=['$anchorScroll','ContactService','$filter'];

  angular.module('fakiyaMainApp')
    .component('home', {          
          templateUrl: 'app/site/homepage/homepage.html',
          controller: HomePageController,
          controllerAs: '$ctrl'
        });  
})();
