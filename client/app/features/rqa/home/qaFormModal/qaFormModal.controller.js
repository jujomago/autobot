'use strict';
(function(){

class QaFormModalComponent {
  constructor() {
    this.questions = [{value: 'Follow scripting guidelines-', type: 0}, {value: 'Professional and courteous behavior extended during the call-', type: 0}, {value: 'Communication is clear, positive, conveys confidence.', type: 0}, {value: 'Use complete sentence, correct grammar and avoid slang.', type: 0}, {value: 'Keep customer informed of actions throughout the call.', type: 0}, {value: 'Demonstrate active listening and acknowledgement.', type: 0}, {value: 'Allow customer to present their need and concern', type: 0}, {value: 'Offers Additional Assistance', type: 0}, {value: 'Manage Resistance', type: 0}, {value: 'Maintain Call Control', type: 0}, {value: 'Average speed of answer', type: 0}, {value: 'Percent of Calls abandoned/tranferred', type: 1}, {value: 'Are customers happy with your employees (wrt convince capability)', type: 0}];
  }
    $onInit(){
  		this.instance = this.parent.modalInstance;
  	}
  	cancel(){
  		this.instance.dismiss('cancel');
  	}
}

angular.module('fakiyaMainApp')
  .component('qaFormModal', {
    templateUrl: 'app/features/rqa/home/qaFormModal/qaFormModal.html',
    controller: QaFormModalComponent,
    require: {
      parent: '?^rqa',
    }
  });

})();
