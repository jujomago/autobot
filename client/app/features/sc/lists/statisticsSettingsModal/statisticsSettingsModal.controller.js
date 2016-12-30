(function(){
  'use strict';

  let _lodash;

  class StatisticsSettingsModalComponent {
    constructor(
      lodash
      ) {
      this.validating = false;
      _lodash = lodash;
    }

    $onInit() {
      this.widget = this.parent.widgetSettings;
      this.instance = this.parent.settingsModalInstance;
    }

    cancel() {
      this.instance.dismiss();
    }

    save() {
      this.instance.close({
        isRemoved: false,
        widget: this.widget
      });
    }

    remove() {
      this.instance.close({
        isRemoved: true
      });
    }
  }

  StatisticsSettingsModalComponent.$inject = [
    'lodash'
  ];

  angular.module('fakiyaMainApp')
    .component('statisticsSettingsModal', {
      templateUrl: 'app/features/sc/lists/statisticsSettingsModal/statisticsSettingsModal.html',
      controller: StatisticsSettingsModalComponent,
      require: {
        parent: '?^supervisor.console.lists',
      }
    });

})();
