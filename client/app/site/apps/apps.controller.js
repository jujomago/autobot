'use strict';
(function(){

class AppsComponent {
  constructor() {
    this.message = 'Hello';
    this.partners = [{partnerName: 'Five9', partnerId: 'f9', apps: [{appName: 'al', appFullName: 'Admin Lite', description: 'This is the description', isInstalled: true}]},{partnerName: 'SalesForce', partnerId: 'sf', apps: [{appName: 'xy', appFullName: 'XYZ App', description: 'This is the description', isInstalled: false},{appName: 'ab', appFullName: 'ABC admin', description: 'This is the description', isInstalled: false}]}]
  }
}

angular.module('fakiyaMainApp')
  .component('apps', {
    templateUrl: 'app/site/apps/apps.html',
    controller: AppsComponent
  });

})();
