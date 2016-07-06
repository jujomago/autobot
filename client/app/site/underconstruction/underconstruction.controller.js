'use strict';
(function(){

class UnderConstructionComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('fakiyaMainApp')

  .component('underconstruction', {

    templateUrl: 'app/site/underconstruction/underconstruction.html',
    controller: UnderConstructionComponent
  });

})();
