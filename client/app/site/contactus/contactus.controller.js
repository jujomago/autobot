'use strict';

(function(){
 let _ConctactService;
class ContactusComponent {
  constructor(ContactService) {
    this.message = 'Hello';
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

ContactusComponent.$inject=['ContactService'];
angular.module('fakiyaMainApp')
  .component('contactus', {
    templateUrl: 'app/site/contactus/contactus.html',
    controller: ContactusComponent
  });

})();
