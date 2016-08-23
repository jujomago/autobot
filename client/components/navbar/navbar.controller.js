'use strict';


let _$location,_authService, _Base64Manager;
class NavbarController {

  constructor($location,AuthService, Base64Manager) {


    this.isCollapsed = true;
    _Base64Manager = Base64Manager;
  
    this.userOptionsCollapsed = true;
   
    _$location=$location;
    _authService=AuthService;
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
   let encodedURL=_Base64Manager.encode(_$location.url());
    return _authService.logout()
    .then(response => {
      if (response.status === 200) {
        _$location.url('/login').search({url: encodedURL}); 
      }
      return response;
    });
  }
}

NavbarController.$inject=['$location','AuthService', 'Base64Manager'];
angular.module('fakiyaMainApp')
  .controller('NavbarController', NavbarController);
