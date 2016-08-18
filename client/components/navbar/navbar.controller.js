'use strict';


let _$location,_auth, _Base64Manager;
class NavbarController {

  constructor($location,AuthService, Base64Manager) {


    this.isCollapsed = true;
    _Base64Manager = Base64Manager;
  
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
   let encodedURL=_Base64Manager.encode(_$location.path());
    _auth.logout()
    .then(response => {
      if (response.status === 200) {
        _$location.path('/login').search({url: encodedURL}); 
      }
      return response;
    });
  }
}

NavbarController.$inject=['$location','AuthService', 'Base64Manager'];
angular.module('fakiyaMainApp')
  .controller('NavbarController', NavbarController);
