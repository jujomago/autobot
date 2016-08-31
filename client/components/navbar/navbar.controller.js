'use strict';

let _$location, _authService, _Base64Manager;
let _lodash;
let _appsService;
let _$filter, _$parse;
class NavbarController {

  constructor($filter, $parse, $location, lodash, AuthService, AppsService, Base64Manager) {

    this.isCollapsed = true;
    _Base64Manager = Base64Manager;
  
    this.userOptionsCollapsed = true;
   
    _$location=$location;
    _authService=AuthService;
    this.myAppsCollapsed = true;
    this.quantity = 4;
    this.search = {app: {appFullName: ''}};
    this.appsLoaded = false;
    _lodash = lodash;
    _$filter = $filter;
    _$parse = $parse;
    _appsService = AppsService;
    this.fullMenu = false;
    this.minMenu = false;
    this.partners = [];
    this.getter = 'partner.partnerFullName';
    this.message = { show: false };

    this.menu = [{
      'title': 'Dashboard',
      'state': 'main',
      'link': '/underconstruction'
    },
      {
        'title': 'My Apps',
        'state': 'skills.list',
        'link': '/underconstruction',
      },
      {
        'title': 'Reports',
        'state': 'users.list',
        'link': '/underconstruction'
      }
    ];

    this.myAppsFromService = [];

    this.myAppsSearch = {};

    this.total = 0;

    this.myApps = [];

    this.newApps = [];
 }

  logout(){
    let encodedURL=_Base64Manager.encode(_$location.url());
    return _authService.logout()
        .then(response => {
          if (response.status === 200) {
            _$location.url('/login').search({url: encodedURL});
          }
          return response;
        })
        .catch(e => {
          if (e.status && e.data) {
            this.message = { show: true, text: e.data.statusText, type: 'danger' };
          } else {
            this.message = { show: true, text: e, type: 'danger' };
          }
          return e;
        }); 
  }
  
  $onInit(){
    this.getInstalled();
    this.getNewest();
  }
 
  getInstalled(){
    return _appsService.getInstalled().then(response => {
      this.myAppsFromService = response.data;
      this.myAppsSearch = this.myAppsFromService;
      this.myAppsSearch = this.groupBy(this.myAppsSearch);
      this.fullMenu = (this.myAppsFromService.length > 4) ? true : false;
      this.total = this.myAppsFromService.length;
      return response;
    })
    .catch(error => {
      let theMsg= error.errorMessage; 
      this.message={ show: true, type: 'danger', text: theMsg };
      return error;
    });
  }

  getNewest(){
    return _appsService.getNewest().then(response => {
      this.newApps = response.data;
      return response;
    })
    .catch(error => {
      let theMsg= error.errorMessage; 
      this.message={ show: true, type: 'danger', text: theMsg };
      return error;
    });
  }

  filteringBySearch(){
    let regex = angular.element('#submenu-search').attr('abx-pattern-filter');
    let filter = new RegExp(regex.substr(1, regex.length -2));
    if(this.search.app.appFullName && filter.test(this.search.app.appFullName)){
      this.myAppsSearch = _$filter('filter')(this.myAppsFromService, this.search.app.appFullName);
      this.myAppsSearch = this.groupBy(this.myAppsSearch);
      this.total = Object.keys(this.myAppsSearch).length;
      return true;
    }else{
      this.myAppsSearch = _$filter('filter')(this.myAppsFromService, '');
      this.myAppsSearch = this.groupBy(this.myAppsSearch);
      this.total = this.myAppsFromService.length;
      return false;
    }
  }

  groupBy(list){
    let getter = _$parse(this.getter);
    return _lodash.groupBy(list, function(item) {
        return getter(item);
    });  
  }

}

NavbarController.$inject=['$filter', '$parse' , '$location', 'lodash', 'AuthService', 'AppsService', 'Base64Manager'];

angular.module('fakiyaMainApp')
  .controller('NavbarController', NavbarController);
