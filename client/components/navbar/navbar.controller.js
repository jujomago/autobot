'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Dashboard',
    'state': 'main',
     'link':'#'
  },
  {
    'title': 'My Apps',
    'state': 'skills.list',
     'link':'#'
  },
    {
    'title': 'Reports',
    'state': 'users.list',
     'link':'#'
    
  }
  ];


  isCollapsed = true;
  //end-non-standard

  constructor() {
    }
}

angular.module('fakiyaMainApp')
  .controller('NavbarController', NavbarController);
