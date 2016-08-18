'use strict';
let _lodash;
let _appsService;
class NavbarController {

  constructor(lodash, AppsService) {

    this.isCollapsed = true;
    this.userOptionsCollapsed = true;
    this.myAppsCollapsed = true;
    this.quantity = 4;
    this.search = {'app': {appFullName: ''}};
    this.appsLoaded = false;
    _lodash = lodash;
    _appsService = AppsService;
    this.fullMenu = false;
    this.minMenu = false;


    this.menu = [{
      'title': 'Dashboard',
      'state': 'main',
      'link': '/underconstruction'
      },
      {
        'title': 'My Apps',
        'state': 'skills.list',
        'link': '/underconstruction',
        'menu': 'abxSubmenu'
      },
      {
        'title': 'Reports',
        'state': 'users.list',
        'link': '/underconstruction'
      }
    ];

    this.myAppsFromService = [];

    this.newApps = [];

    this.myAppsSearch = [];

    this.myApps = [];
 }

 $onInit(){
  this.getInstalled();
  this.getNews();
 }
 
  getInstalled(){
    return _appsService.getInstalled().then(response => {
      let cont = 0;
      let myApps = [];
      this.myAppsFromService = response.data;
      
      myApps = _lodash.groupBy(this.myAppsFromService, (value)=>{
        return value.partner.partnerFullName;
      });

      Object.keys(myApps).map((value)=>{
        myApps[value].map((val)=>{
          if(cont === 0){
            val.index = true;
          }else{
            val.index = false;
          }
          this.myAppsSearch.push(val);
          cont++;
        });
        cont = 0;
      });

      this.fullMenu = (this.myAppsFromService.length > 4) ? true : false;
      this.minMenu = (this.myAppsFromService.length <= 4) ? true : false;
      console.log(this.myApps);
      console.log(this.myAppsSearch);
      return response;
    })
    .catch(error => {
      let theMsg= error.errorMessage; 
      this.message={ show: true, type: 'danger', text: theMsg };
      return error;
    });
  }

  getNews(){
    return _appsService.getNews().then(response => {
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
      return true;
    }
    return false;
  }
}

NavbarController.$inject=['lodash', 'AppsService'];
angular.module('fakiyaMainApp')
  .controller('NavbarController', NavbarController);
