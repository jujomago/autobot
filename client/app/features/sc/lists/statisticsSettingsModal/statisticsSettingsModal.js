'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('statisticsSettingsModal', {
        url: '/statisticsSettingsModal',
        views: {
          'crud': {
            template: '<statistics-settings-modal></statistics-settings-modal>'
          }
        }
      });
  });
