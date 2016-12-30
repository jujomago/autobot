(function () {
  'use strict';

  function SupervisorConsoleActionsService(
    $interval,
    $rootScope,
    DateTime,
    Utils,
    lodash) {

    const PANELS_HEADERS = {
      AGENT_STATE: {
        key: 'AGENT_STATE',
        ui: [
          'USERNAME',
          'FULL NAME',
          'STATE',
          'STATE DURATION',
          'CALL TYPE',
          'REASON DURATION',
          'REASON SINCE'
        ],
        api: [
          'Username',
          'Full Name',
          'State',
          'State Duration',
          'Call Type',
          'Reason Duration',
          'Reason Since'
        ]
      },
      INFO_AGENT_STATE: {
        api: [
          'Username',
          'Total Calls',
          'First Call Resolution',
          'Avg Call Time',
          'Avg Wrap Time',
          'Avg Idle Time',
          'Avg Not Ready Time',
          'Avg Handle Time'
        ]
      },
      USERS: {
        key: 'USERS',
        ui: [
          'USERNAME',
         // 'FULL NAME',
          'ACCOUNT TYPE'
         // 'SESSION START',
         // 'STATION'
        ],
        api: ''//UsersAPI has not headers, is a Object.
      },
      SKILL_STATUS: {
        key: 'SKILL_STATUS',
        ui: [
          'NAME',
          'LOGGED IN',
          'ON CALL',
          'IN READY',
          'CALLS IN QUEUE',
          'QUEUE TIME',
          'LONGEST WAIT'
        ],
        api: [
          'Skill Name',
          'Agents Logged In',
          'Agents On Call',
          'Agents Ready For Calls',
          'Calls In Queue',
          'Current Longest Queue Time',
          'Longest Queue Time'
        ]
      }
    };

    const WIDGETS = [
      {
        key: 'AGENT_STATE',
        label: 'Agent State',
        index: 1,
        configurations: {
          id: null,
          sizeX: 30,
          sizeY: 24,
          row: 0,
          col: 0 ,
          name: 'Agent State',
          template: 'app/features/sc/lists/templates/agentState.html',
          isLoading: true,
          type: 'AGENT_STATE'
        }
      },
      {
        key: 'USERS',
        label: 'Users',
        index: 2,
        configurations: {
          id: null,
          sizeX: 30,
          sizeY: 12,
          row: 0,
          col: 30 ,
          name: 'Users',
          template: 'app/features/sc/lists/templates/users.html',
          isLoading: true,
          type: 'USERS'
        }
      },
      {
        key: 'SKILL_STATUS',
        label: 'Skill Status',
        index: 3,
        configurations: {
          id: null,
          sizeX: 30,
          sizeY: 12,
          row: 10,
          col: 30 ,
          name: 'Skill Status',
          template: 'app/features/sc/lists/templates/skillStatus.html',
          isLoading: true,
          type: 'SKILL_STATUS'
        }
      }
    ];

    const classAgentState = [
      {
        key: 'READY',
        class: 'ready-state'
      },
      {
        key: 'ON CALL',
        class: 'onCall-state'
      },
      {
        key: 'NOT READY',
        class: 'noReady-state'
      },
      {
        key: 'LOGGED OUT',
        class: 'loggedOut-state'
      },
      {
        key: 'AFTER CALL WORK',
        class: 'afterCallWork-state'
      },
      {
        key: 'ON PREVIEW',
        class: 'onPreview-state'
      },
      {
        key: 'ON VOICEMAIL',
        class: 'onVoicemail-state'
      }
      {
        key: 'UNKNOWN',
        class: 'unknown-state'
      }
      {
        key: 'RINGING',
        class: 'ringing-state'
      }
    ],
      classSkillsStatus = [
        {
          type: 'IN_READY',
          options: {
            ready: 'ready-status',
            notReady: 'ready-zero-status'
          }
        },
        {
          type: 'CALLS_QUEUE',
          options: {
            ready: 'queue-status',
            notReady: 'queue-zero-status'
          }
        }
      ];

    const ACCOUNT_TYPE = [
      {
        key: 'DomainSupervisor',
        label:'Supervisor'
      },
      {
        key: 'DomainAdmin',
        label:'Administrator'
      }
    ];

    let promisesInterval = {
      AGENTS_STATE: {
        promise: null,
        timestamp: '',
        summaryTimestamp: ''
      },
      INFO_AGENTS_STATE: {
        promise: null,
        timestamp: ''
      },
      USERS: {
        promise: null,
        timestamp: ''
      },
      SKILLS: {
        promise: null,
        timestamp: ''
      }
    };

    /*
    * Cancel refresh
    * */
    $rootScope.$on('$locationChangeStart' ,function (event, destinyPath) {

      let address = '/ap/sc',
          destiny = destinyPath.substring(destinyPath.length-6,destinyPath.length);

      if(address !== destiny) {
        lodash.forEach(promisesInterval,(value) => {
          if(!Utils.isUndefinedOrNull(value.promise)) {
            $interval.cancel(value.promise);
            value.promise = null;
          }
        });
      }
    });

    function getPromisesInterval() {
      return promisesInterval;
    }

    function getUsersAccountType(key) {
      let accountType = lodash.find(ACCOUNT_TYPE, item => item.key === key);

      return Utils.isUndefinedOrNull(accountType) ? key : accountType.label;
    }

    function getClassAgentState(key) {
      let classSelect = lodash.find(classAgentState, item => item.key === key.toUpperCase());

      return Utils.isUndefinedOrNull(classSelect) ? '' : classSelect.class;
    }

    function getClassSkills(value, type){
      let classSelect,
          classType = lodash.find(classSkillsStatus, item => item.type === type);

      classSelect = parseInt(value) === 0 || value === '' ? classType.options.notReady : classType.options.ready ;

      return classSelect;
    }

    function getDefaultWidgets() {
      return lodash.cloneDeep(lodash.map(WIDGETS, 'configurations'));
    }

    function getOptionsDropDown() {
      let widgetOptions = [];
      lodash.forEach(WIDGETS, (item) => {
        widgetOptions.push({
          key: item.key,
          label: item.label
        });
      });

      return widgetOptions;
    }

    function getWidget(key) {
      let widget = lodash.find(WIDGETS, item => item.key === key),
          newWidget = {};

      newWidget.id = widget.configurations.id;
      newWidget.sizeX = widget.configurations.sizeX;
      newWidget.sizeY = widget.configurations.sizeY;
      newWidget.name = widget.configurations.name;
      newWidget.template = widget.configurations.template;
      newWidget.isLoading = false;
      newWidget.type = widget.configurations.type;

      return  newWidget;
    }

    function updateWidgetsLoading(widgets, type, status) {
      lodash.forEach(lodash.filter(widgets, (value) =>
        value.type === type), (value) => {
            value.isLoading = status;
      });
    }

    function getPanelsHeaders() {
      return lodash.clone(PANELS_HEADERS);
    }

    /*
    * Mapping
    * */
    function mapUsers(row) {
      return {
        username: row.name,
        fullName: '',
        accountType: getUsersAccountType(row.roledId.role),
        sessionStart: '',
        station: ''
      };
    }

    function mapSkills(row) {
      return {
        name: row[0],
        loggedIn: row[1],
        onCall: row[2],
        inReady: row[3],
        classInReady: getClassSkills(row[3], 'IN_READY'),
        callsInQueue: row[4],
        classCallsQueue: getClassSkills(row[4], 'CALLS_QUEUE'),
        queueTime: row[5],
        longestWait: row[6]
      };
    }

    function mapAgentState(row) {
      return {
        username: row[0],
        fullName: row[1],
        state: row[2],
        classState: getClassAgentState(row[2]),
        stateDuration: DateTime.convertMillisecondsToTime(row[3]),
        callType: row[4],
        reasonDuration: DateTime.convertMillisecondsToTime(row[5]),
        reasonSince: DateTime.getDateTimeFormat(row[6])
      };
    }

    function mapInfoAgentState(fields){
      let description = [],
        username = fields[0],
        headers = PANELS_HEADERS.INFO_AGENT_STATE.api;

      lodash.forEach(fields,function(item, index) {
        let value;

        if(index > 0){
          value = item;
          if(index >= 3){
            value = DateTime.convertMillisecondsToTime(item);
          }
          description.push({
            label: headers[index],
            value: value
          });
        }
      });

      return {
        username: username,
        description : description
      };
    }

    /*
    * Format rows
    * */
    function formatRowsAgentState(rows) {
      return lodash.orderBy(lodash.map(rows, mapAgentState), 'username');
    }

    function formatRowsInfoAgentState(rows) {
      return lodash.groupBy(lodash.map(rows, mapInfoAgentState), 'username');
    }

    function formatRowsSkills(rows) {
      return lodash.map(rows, mapSkills);
    }

    function formatDataUsers(data) {
      return lodash.map(data, mapUsers);
    }

    return {
      formatRowsAgentState: formatRowsAgentState,
      formatRowsInfoAgentState: formatRowsInfoAgentState,
      formatRowsSkills: formatRowsSkills,
      formatDataUsers: formatDataUsers,
      getDefaultWidgets: getDefaultWidgets,
      getOptionsDropDown: getOptionsDropDown,
      getPanelsHeaders: getPanelsHeaders,
      getPromisesInterval: getPromisesInterval,
      getWidget: getWidget,
      updateWidgetsLoading: updateWidgetsLoading
    };
  }

  SupervisorConsoleActionsService.$inject = [
    '$interval',
    '$rootScope',
    'DateTime',
    'Utils',
    'lodash'
  ];

  angular.module('fakiyaMainApp').
  factory('SupervisorConsoleActions',SupervisorConsoleActionsService);

})();
