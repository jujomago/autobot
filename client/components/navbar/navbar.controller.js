'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  },
  {
    'title': 'Skills',
    'state': 'skills.list'
  },
    {
    'title': 'Users',
    'state': 'users.list'
  },
  {
    'title': 'Campaigns',
    'state': 'campaigns.list'
  }
  ];


  isCollapsed = true;
  //end-non-standard

  constructor() {
    }
}

angular.module('fakiyaMainApp')
  .controller('NavbarController', NavbarController);
