(function () {
  'use strict';
  let _$interval,
      _$q,
      _$scope,
      _ModalManager,
      _StatisticsService,
      _SCActions,
      _Utils,
      _lodash,
      $ctrl;

  class SupervisorConsoleListsController {
    constructor(
      $interval,
      $q,
      $scope,
      ModalManager,
      StatisticsService,
      SupervisorConsoleActions,
      Utils,
      lodash
    ) {
      _$interval = $interval;
      _$q = $q;
      _$scope = $scope;
      _ModalManager = ModalManager;
      _StatisticsService = StatisticsService;
      _SCActions = SupervisorConsoleActions;
      _Utils = Utils;
      _lodash = lodash;

      $ctrl = this;

      this.PANELS_HEADERS = _SCActions.getPanelsHeaders();

      this.dataAgentsState = [];
      this.infoAgentState =[];
      this.dataUsers = [];
      this.dataSkillStatus = [];

      this.dashboard = {};
      this.dashboard.widgets = [];


      this.dashboardOptions = {
        columns: 60,
        colWidth: 'auto',
        margins: [5, 5],
        resizable: {
            enabled: true,
            start: function (){
              // optional callback fired when resize is started, event, uiWidget, $element
            },
          resize: function (){
            // optional callback fired when item is resized, event, uiWidget, $element
          },
          stop: function (){
            // optional callback fired when item is finished resizing event, uiWidget, $element
          }
        },
        draggable: {
            enabled: true,
            handle: '.sc-box-header',
            start: function () {
              // optional callback fired when drag is started, event, uiWidget, $element
            },
            drag: function () {
              // optional callback fired when item is moved, event, uiWidget, $element
            },
            stop: function () {
              // optional callback fired when item is finished dragging event, uiWidget, $element
            }
        }
      };

      //$interval promises
      this.promisesInterval = {};
      this.refreshTime = 30000; //30 Seconds

      //Is 2000ms as the recommended value for longPollingTimeout.
      //Statistics Web Services API Reference Guide
      this.longpollingtimeout = 2000;

    }

    $onInit() {
      this.headersAgentsState = this.PANELS_HEADERS.AGENT_STATE.ui;
      this.headersUsers = this.PANELS_HEADERS.USERS.ui;
      this.headersSkillStatus = this.PANELS_HEADERS.SKILL_STATUS.ui;

      this.headersApiAgentsState = this.PANELS_HEADERS.AGENT_STATE.api.join();
      this.headersApiInfoAgentsState = this.PANELS_HEADERS.INFO_AGENT_STATE.api.join();
      this.headersApiSkillStatus = this.PANELS_HEADERS.SKILL_STATUS.api.join();

      this.keyAgentState = this.PANELS_HEADERS.AGENT_STATE.key;
      this.keyUsers = this.PANELS_HEADERS.USERS.key;
      this.keySkillStatus = this.PANELS_HEADERS.SKILL_STATUS.key;

      this.widgetTypes = _SCActions.getOptionsDropDown();
      this.dashboard.widgets = _SCActions.getDefaultWidgets();
      this.promisesInterval = _SCActions.getPromisesInterval();

      this.getWidgetAgentState();
      this.getWidgetSkill();
      this.getWidgetUsers();
    }

    getWidgetAgentState() {
      _$q.all([
        _StatisticsService.getStatisticsAgentState(this.headersApiAgentsState),
        _StatisticsService.getStatisticsSummary(this.headersApiInfoAgentsState)
      ]).then((promises) => {

        this.dataAgentsState = _SCActions.formatRowsAgentState(promises[0].data.rows);
        this.infoAgentState = _SCActions.formatRowsInfoAgentState(promises[1].data.rows);

        this.promisesInterval.AGENTS_STATE.timestamp = promises[0].data.timestamp;
        this.promisesInterval.INFO_AGENTS_STATE.timestamp = promises[1].data.timestamp;

        _SCActions.updateWidgetsLoading($ctrl.dashboard.widgets,this.keyAgentState, false);
        this.promisesInterval.INFO_AGENTS_STATE.promise = _$interval(this.refreshAgentState, this.refreshTime);

      }).catch(error =>{
        _SCActions.updateWidgetsLoading($ctrl.dashboard.widgets,this.keyAgentState, false);
        return error;
      });
    }

    getWidgetSkill() {
      _StatisticsService.getStatisticsSkillStatus(this.headersApiSkillStatus).then((result) => {

        this.dataSkillStatus = _SCActions.formatRowsSkills(result.data.rows);
        this.promisesInterval.SKILLS.timestamp = result.data.timestamp;
        _SCActions.updateWidgetsLoading($ctrl.dashboard.widgets,this.keySkillStatus , false);
        this.promisesInterval.SKILLS.promise = _$interval(this.refreshSkills, this.refreshTime);

      }).catch(error =>{
        _SCActions.updateWidgetsLoading($ctrl.dashboard.widgets,this.keySkillStatus , false);
        return error;
      });

    }

    getWidgetUsers() {
      _StatisticsService.getStatisticsUsers().then((result) => {

        this.dataUsers = _SCActions.formatDataUsers(result.data);
        _SCActions.updateWidgetsLoading($ctrl.dashboard.widgets, this.keyUsers, false);
        this.promisesInterval.USERS.promise = _$interval(this.refreshUsers, this.refreshTime);

      }).catch(error =>{
        _SCActions.updateWidgetsLoading($ctrl.dashboard.widgets, this.keyUsers, false);
        return error;
      });

    }

    /*
    * Action Button refresh
    * */
    refreshWidgets() {
      this.refreshAgentState();
      this.refreshSkills();
      this.refreshUsers();
    }

    /*
     * REFRESH ENDPOINTS
     */
    refreshAgentState () {
      let canRefresh = _lodash.find($ctrl.dashboard.widgets,(value) => value.type === $ctrl.keyAgentState);

      if(!_Utils.isUndefinedOrNull(canRefresh)) {
        //$ctrl.dataAgentsState = [];
        //$ctrl.infoAgentState = [];
        //_SCActions.updateWidgetsLoading($ctrl.dashboard.widgets,$ctrl.keyAgentState, true);

        _$q.all([
          _StatisticsService.refreshStatisticsAgentState($ctrl.headersApiAgentsState,
            parseInt($ctrl.promisesInterval.AGENTS_STATE.timestamp),$ctrl.longpollingtimeout),
          _StatisticsService.refreshStatisticsSummary($ctrl.headersApiInfoAgentsState,
            parseInt($ctrl.promisesInterval.INFO_AGENTS_STATE.timestamp),$ctrl.longpollingtimeout)
        ]).then((promises) => {
          $ctrl.dataAgentsState = _SCActions.formatRowsAgentState(promises[0].data.rows);
          $ctrl.infoAgentState = _SCActions.formatRowsInfoAgentState(promises[1].data.rows);

          $ctrl.promisesInterval.AGENTS_STATE.timestamp = promises[0].data.timestamp;
          $ctrl.promisesInterval.INFO_AGENTS_STATE.timestamp = promises[1].data.timestamp;

          _SCActions.updateWidgetsLoading($ctrl.dashboard.widgets,$ctrl.keyAgentState, false);
        }).catch(error =>{
          _SCActions.updateWidgetsLoading($ctrl.dashboard.widgets,$ctrl.keyAgentState, false);
          return error;
        });
      }
    }

    refreshSkills () {
      let canRefresh = _lodash.find($ctrl.dashboard.widgets,(value) => value.type === $ctrl.keySkillStatus);

      if(!_Utils.isUndefinedOrNull(canRefresh)) {
        //$ctrl.dataSkillStatus = [];
        //_SCActions.updateWidgetsLoading($ctrl.dashboard.widgets,$ctrl.keySkillStatus, true);

        _StatisticsService.refreshStatisticsSkillStatus($ctrl.headersApiSkillStatus,
          parseInt($ctrl.promisesInterval.SKILLS.timestamp), $ctrl.longpollingtimeout).then((result) => {
          $ctrl.dataSkillStatus = _SCActions.formatRowsSkills(result.data.rows);
          $ctrl.promisesInterval.SKILLS.timestamp = result.data.timestamp;
          _SCActions.updateWidgetsLoading($ctrl.dashboard.widgets,$ctrl.keySkillStatus, false);
        }).catch(error =>{
          _SCActions.updateWidgetsLoading($ctrl.dashboard.widgets,$ctrl.keySkillStatus, false);
          return error;
        });
      }
    }

    refreshUsers() {
      let canRefresh = _lodash.find($ctrl.dashboard.widgets,(value) => value.type === $ctrl.keyUsers);

      if(!_Utils.isUndefinedOrNull(canRefresh)) {
        //$ctrl.dataUsers = [];
        //_SCActions.updateWidgetsLoading($ctrl.dashboard.widgets,$ctrl.keyUsers, true);

        _StatisticsService.getStatisticsUsers().then((result) => {

          $ctrl.dataUsers = _SCActions.formatDataUsers(result.data);
          _SCActions.updateWidgetsLoading($ctrl.dashboard.widgets,$ctrl.keyUsers, false);

        }).catch(error =>{
          _SCActions.updateWidgetsLoading($ctrl.dashboard.widgets,$ctrl.keyUsers, false);
          return error;
        });
      }
    }

    /*
    * Get Info Summary(PopUp) Agents State*/
    getInfoAgentState(username) {
      return this.infoAgentState[username][0];
    }

    /*
    * Watching by each widget
    * */
    watchWidgetXY(widget, saveDefer) {
      let unregister = _$scope.$watch(function() {
        return widget;
      },function (newValue) {
        if(!_Utils.isUndefinedOrNull(newValue.row) && !_Utils.isUndefinedOrNull(newValue.col)) {
          saveDefer.resolve(newValue);
          unregister();
        }
      });
    }

    addWidget(key) {
      let widget = _SCActions.getWidget(key),
          saveDefer = _$q.defer();

      this.watchWidgetXY(widget, saveDefer);
      this.dashboard.widgets.push(widget);

      saveDefer.promise.then(() => {
        //Send API --Save Widgets when col, row are defined .
      });
    }

    removeWidget(widget) {
      let position = this.dashboard.widgets.indexOf(widget);

      if(position >= 0) {
        this.dashboard.widgets.splice(position, 1);
      }
    }

    configWidget(widget) {
      this.widgetSettings = _lodash.cloneDeep(widget);

      this.settingsModalInstance = _ModalManager.open({
        animation: false,
        size: 'md',
        backdrop: 'static',
        controllerAs: '$ctrl',
        appendTo: angular.element('#statistics-settings-modal-container'),
        template: '<statistics-settings-modal></statistics-settings-modal>'
      });

      this.settingsModalInstance.result
        .then(result => {
            if (result.isRemoved) {
              this.removeWidget(widget);
            }
            else {
              //send to update widget ((result.widget)
              widget.name = result.widget.name;
              widget.row = result.widget.row;
              widget.col = result.widget.col;
              widget.sizeX = result.widget.sizeX;
              widget.sizeY = result.widget.sizeY;
            }
          },
          () => {
          });
    }

    enableRefreshAdd() {
      let isLoading = false;
      _lodash.forEach(this.dashboard.widgets, (value) => {
        isLoading = isLoading || value.isLoading ;
      });

      return isLoading;
    }

    enableItemsAdd(key) {
      return !_Utils.isUndefinedOrNull(_lodash.find(this.dashboard.widgets,(value) => value.type === key));
    }
  }

  SupervisorConsoleListsController.$inject = [
    '$interval',
    '$q',
    '$scope',
    'ModalManager',
    'StatisticsService',
    'SupervisorConsoleActions',
    'Utils',
    'lodash'
  ];

  angular.module('fakiyaMainApp')
    .component('supervisor.console.lists',
      {
        templateUrl: 'app/features/sc/lists/lists.html',
        controller: SupervisorConsoleListsController
      });
})();
