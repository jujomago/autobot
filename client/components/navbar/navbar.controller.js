'use strict';

class NavbarController {

  constructor() {

    this.isCollapsed = true;
    this.userOptionsCollapsed = true;


    this.menu = [{
      'title': 'Dashboard',
      'state': 'main',
      'link': '/underconstruction'
      },
      {
        'title': 'My Apps',
        'state': 'skills.list',
        'link': '/underconstruction'
      },
      {
        'title': 'Reports',
        'state': 'users.list',
        'link': '/underconstruction'
      }
    ];
 
 }
}


angular.module('fakiyaMainApp')
  .controller('NavbarController', NavbarController);
