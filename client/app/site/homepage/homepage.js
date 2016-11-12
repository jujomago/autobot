'use strict';
(function () {

  let _ConctactService;
  class HomePageController {
  
    constructor(ContactService) {
      this.submitText='Submit';
       this.message={'show':false};
     _ConctactService=ContactService;
    }
    sendmail(){
        this.submitText='Submitting..';
        return _ConctactService.sendmail(this.cform)
        .then(response=>{
           this.submitText='Submit';
           //this.cform={'firstName':'','lastName':'another'}; 

           this.message = { show: true, type:'success',text:'Email Sent Successfully', expires:4000 };   
          return response;
        })
        .catch(err=>{     
           this.submitText='Submit';
           this.message = { show: true, type:'danger', text: err.errorMessage || err , expires:4000 };   
           return err;
        });
    }
  }
  HomePageController.$inject=['ContactService'];

  angular.module('fakiyaMainApp')
    .config(function ($stateProvider) {
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'app/site/homepage/homepage.html',
          controller: HomePageController,
          controllerAs: '$ctrl'
        });
    });

})();
