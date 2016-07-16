'use strict';


let _$location,_auth;
class NavbarController {

  constructor($location,AuthService) {


    this.isCollapsed = true;
 
  
    this.userOptionsCollapsed = true;
   
    _$location=$location;
    _auth=AuthService;
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
  logout(){
    _auth.logout();
    _$location.path('/login');  
  }
}

NavbarController.$inject=['$location','AuthService'];
angular.module('fakiyaMainApp')
  .controller('NavbarController', NavbarController);
