'use strict';
let _lodash;
let _appsService;
class NavbarController {

  constructor(lodash, AppsService) {

    this.isCollapsed = true;
    this.userOptionsCollapsed = true;
    this.myAppsCollapsed = true;
    this.quantity = 4;
    this.search = {app: {appFullName: ''}};
    this.appsLoaded = false;
    _lodash = lodash;
    _appsService = AppsService;
    this.fullMenu = false;
    this.minMenu = false;
    this.partners = [];


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
      this.total = Object.keys(this.myAppsSearch).length;
      return true;
    }else{
      this.total = this.myAppsFromService.length;
      return false;
    }
  }

}

NavbarController.$inject=['lodash', 'AppsService'];
angular.module('fakiyaMainApp')
  .controller('NavbarController', NavbarController);
