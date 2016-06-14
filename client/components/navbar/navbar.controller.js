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

  constructor($sessionStorage) {
console.log($sessionStorage);


    this.hideNavBar=false;
    
    if(!$sessionStorage.logged){
      this.hideNavBar=true;
    }
  }
}

NavbarController.$inject=['$sessionStorage'];

angular.module('fakiyaMainApp')
  .controller('NavbarController', NavbarController);
