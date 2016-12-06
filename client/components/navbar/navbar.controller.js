'use strict';

let _$location, _authService, _Base64Manager, _GetHomePage;
let _lodash;
let _appsService;
let _$filter, _$parse, _$state;
let _AlertDialog, _RefreshToken;
let $ctrl;
//const MAX_NEW_APPS_AMOUNT = 5;
class NavbarController {

  constructor($filter, $parse, $location, $state, lodash, AuthService, AppsService, Base64Manager, GetHomePage, AlertDialog, EventBus, RefreshToken) {
    this.isCollapsed = true;
    _Base64Manager = Base64Manager;
    _GetHomePage = GetHomePage;
    this.userOptionsCollapsed = true;
    _$state = $state;
    _$location=$location;
    _authService=AuthService;
    this.myAppsCollapsed = true;
    this.isFocus=false;
    this.search = {app: {appFullName: ''}};
    this.appsLoaded = false;
    _lodash = lodash;
    _$filter = $filter;
    _$parse = $parse;
    _appsService = AppsService;
    _AlertDialog=AlertDialog;
    this.fullMenu = false;
    this.minMenu = false;
    this.partners = [];
    this.getter = 'partner.partnerFullName';
    this.message = { show: false };
    this.firstName = '';
    this.reportsCollapsed = true;
    _RefreshToken = RefreshToken;
    $ctrl = this;
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
    EventBus.subscribe('apps.reload', function(){
      $ctrl.loadApps();
    });
 }
  gotoAppSection(appSelected) {
    _$state.go('ap.apps',{paramAppSelected:appSelected});
  }
  logout(){
    let encodedURL=_Base64Manager.encode(_$location.url());
    return _authService.logout()
        .then(response => {
          if (response.status === 200) {
            _RefreshToken.cancelRefresh();
            _$location.url('/login').search({url: encodedURL});
          }
          return response;
        })
        .catch(e => {
          let contentModal={ title:'Message',
                             body:`An unexpected error has ocurred. Please try again or contact us`
          };
          _AlertDialog(contentModal);

          if (e.status && e.data) {
            this.message = { show: true, text: e.data.statusText, type: 'danger' };
          }
          else {
            this.message = { show: true, text: e, type: 'danger' };
          }
          return e;
        });
  }
  loadApps(){
    this.getInstalled();
    this.getNewest();
  }
  $onInit(){
    this.loadApps();
    this.getProfile();
  }
  getProfile(){
    return _authService.getProfile()
    .then(response => {
      this.email=response.data.email;
      this.firstName = response.data.firstname;
      this.avatar = response.data.avatar;
      return response;
    })
    .catch(error => {
      if(error.statusCode !== 401){
        let contentModal={
          title:'Message',
          body:'An unexpected error has ocurred. Please try again or contact us'
        };
        _AlertDialog(contentModal);
      }
      return error;
    });
  }
  selectApp(appName){
    _$state.go('ap.page',{appName: appName});
  }
  selectInstalledApp(selected){
    _$state.go(_GetHomePage.of(selected.app.appName));
  }
  getInstalled(){
    return _appsService.getFilteredApps({installed: true, size: 100})
    .then(response => {
      this.myAppsFromService = _lodash.sortBy(response.data,(item) => {
        return item.app.appFullName;
      });
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
    return _appsService.getFilteredApps({installed: false})
    .then(response => {
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
    if(this.search.app.appFullName){
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

  changeFocus(isCollapsed){
    if(isCollapsed===false){
      this.isFocus = angular.element('input.searchbox').is(':focus');
    }

    angular.element('input').blur();
    this.myAppsCollapsed = isCollapsed;
    /** Bug 1476 when the user place the focus in an input, and perform an over action in the sub menu,the focus should not be lost. */
    if(isCollapsed&&this.isFocus===true){
      angular.element('input.searchbox').focus();
    }
    return isCollapsed;
  }

  hideSubMenuOnClick(obj,submenu){
    if(submenu==='myapps'){
      this.myAppsCollapsed=(obj.target.id!=='submenu-search');
    }
    if(submenu==='reports'){
      this.reportsCollapsed=true;
    }
}

}

NavbarController.$inject=['$filter','$parse' , '$location', '$state','lodash', 'AuthService', 'AppsService', 'Base64Manager', 'GetHomePage','AlertDialog', 'EventBus', 'RefreshToken'];

angular.module('fakiyaMainApp')
  .controller('NavbarController', NavbarController);
