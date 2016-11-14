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
  clearForm(form){
    Object.keys(this.cform).forEach(value => {
      this.cform[value] = '';
    });
    form.$setPristine();
  }
  sendmail(form){
        this.submitText='Submitting..';
        if(!this.cform.company){
          this.cform.company = 'None';
        }
        if(!this.cform.phone){
          this.cform.phone = 'None';
        }
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

ContactusComponent.$inject=['ContactService'];
angular.module('fakiyaMainApp')
  .component('contactus', {
    templateUrl: 'app/site/contactus/contactus.html',
    controller: ContactusComponent
  });

})();
