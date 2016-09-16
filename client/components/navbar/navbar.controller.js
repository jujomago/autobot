'use strict';
let _lodash;
let _appsService;
let _$filter, _$parse;
class NavbarController {

  constructor($filter, $parse, lodash, AppsService) {

    this.isCollapsed = true;
    this.userOptionsCollapsed = true;
    this.myAppsCollapsed = true;
    this.isFocus=false;
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
      console.log('focus '+angular.element('input.searchbox').is(':focus'));
    }
    
    angular.element('input').blur();
    this.myAppsCollapsed = isCollapsed;

    /** Bug 1476 when the user place the focus in an input, and perform an over action in the sub menu,the focus should not be lost. */
    if(isCollapsed&&this.isFocus===true){
      angular.element('input.searchbox').focus();
      console.log('focus return');
    }
    return isCollapsed;
  }

}

NavbarController.$inject=['$filter', '$parse' ,'lodash', 'AppsService'];
angular.module('fakiyaMainApp')
  .controller('NavbarController', NavbarController);
