'use strict';

(function(){
 let _ConctactService, _$filter;
class ContactusComponent {
  constructor(ContactService,$filter) {
    this.message = 'Hello';
    this.submitText='Submit';
    this.message={'show':false};    
    _ConctactService=ContactService;
    _$filter=$filter;
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

ContactusComponent.$inject=['ContactService','$filter'];
angular.module('fakiyaMainApp')
  .component('contactus', {
    templateUrl: 'app/site/contactus/contactus.html',
    controller: ContactusComponent
  });

})();
