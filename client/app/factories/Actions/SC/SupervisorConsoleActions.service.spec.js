'use strict';

describe('Service:SupervisorConsoleActions', () => {
  let _SCActions,
    DATA_REQUEST,
    OPTIONS_DROPDOWN,
    PANELS_HEADERS,
    PROMISES_INTERVAL,
    WIDGET_CONFIGURATIONS,
    WIDGET_KEYS;

  beforeEach(module('fakiyaMainApp'));

  beforeEach(inject(function(
    _SupervisorConsoleActions_
  ) {
    _SCActions = _SupervisorConsoleActions_;

    WIDGET_CONFIGURATIONS = [
      {
        id: null,
        sizeX: 30,
        sizeY: 24,
        row: 0,
        col: 0 ,
        name: 'Agent State',
        template: 'app/features/sc/lists/templates/agentState.html',
        isLoading: true,
        type: 'AGENT_STATE'
      },
      {
        id: null,
        sizeX: 30,
        sizeY: 12,
        row: 0,
        col: 30 ,
        name: 'Users',
        template: 'app/features/sc/lists/templates/users.html',
        isLoading: true,
        type: 'USERS'
      },
      {
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
    ];

    OPTIONS_DROPDOWN = [
      {
        key: 'AGENT_STATE',
        label: 'Agent State'
      },
      {
        key: 'USERS',
        label: 'Users'
      },
      {
        key: 'SKILL_STATUS',
        label: 'Skill Status'
      }
    ];

    WIDGET_KEYS = {
      AGENT_STATE: {
        key: 'AGENT_STATE'
      },
      USERS: {
        key: 'USERS'
      },
      SKILL_STATUS: {
        key: 'SKILL_STATUS'
      }
    };

    PANELS_HEADERS = {
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

    PROMISES_INTERVAL = {
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

    DATA_REQUEST = {
      AGENT_STATE: {
        rows: [
          [
            'bruedi@enterprise9.com',
            'Britt Ruedi',
            'Logged Out',
            '817255000',
            '',
            '0',
            ''
          ],
          [
            'siamak@autoboxcorp1',
            'siamak Marjouei',
            'Logged Out',
            '270965000',
            '',
            '0',
            ''
          ],
          [
            'salesforce@user.com',
            'salesforce-User salesforce-User',
            'Logged Out',
            '796410000',
            '',
            '0',
            ''
          ]
        ]
      },
      INFO_AGENTS_STATE: {
        rows: [
          [
            'bruedi@enterprise9.com',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0'
          ],
          [
            'siamak@autoboxcorp1',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0'
          ],
          [
            'salesforce@user.com',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0',
            '0'
          ]
        ]
      },
      SKILLS: {
        rows: [
          [
            'Speed',
            '0 (0)',
            '0',
            '0',
            '0',
            '0',
            '0'
          ],
          [
            'Excellent interpersonal skills',
            '0 (0)',
            '0',
            '0',
            '0',
            '0',
            '0'
          ],
          [
            'Effective Communication Skills',
            '0 (0)',
            '0',
            '0',
            '0',
            '0',
            '0'
          ]
        ]
      },
      USERS: {
        data: [
          {
            'name':'saul@autoboxcorp.com',
            'roledId':{
              'role':'DomainSupervisor',
              'userId':'2535354'
            }
          },
          {
            'name':'agustin@autoboxcorp.com',
            'roledId':{
              'role':'DomainAdmin',
              'userId':'2531470'
            }
          },
          {
            'name':'michelle@autoboxcorp.com',
            'roledId':{
              'role':'Agent',
              'userId':'2531471'
            }
          }
        ]
      }
    };
  }));

  describe('#Actions', () => {
    describe('#GetDefaultValues', () => {
      it('=>Get default widgets configurations', () => {
        expect(_SCActions.getDefaultWidgets()).to.deep.equal(WIDGET_CONFIGURATIONS);
      });

      it('=>get default options dropdown', () => {
        expect(_SCActions.getOptionsDropDown()).to.deep.equal(OPTIONS_DROPDOWN);
      });

      it('=>get default Headers of Widgets', () => {
        expect(_SCActions.getPanelsHeaders()).to.deep.equal(PANELS_HEADERS);
      });

      it('=>get promises of $interval functions', () => {
        expect(_SCActions.getPromisesInterval()).to.deep.equal(PROMISES_INTERVAL);
      });
    });

    describe('#GetWidgetConfigurationByKey', () => {
      it('=>Get widget configuration Agent State', () => {
        let EXPECTED = {
          id: null,
          sizeX: 30,
          sizeY: 24,
          name: 'Agent State',
          template: 'app/features/sc/lists/templates/agentState.html',
          isLoading:false,
          type:'AGENT_STATE'
        };

        expect(_SCActions.getWidget(WIDGET_KEYS.AGENT_STATE.key)).to.deep.equal(EXPECTED);
      });

      it('=>Get widget configuration Users', () => {
        let EXPECTED = {
          id: null,
          sizeX: 30,
          sizeY: 12,
          name: 'Users',
          template: 'app/features/sc/lists/templates/users.html',
          isLoading: false,
          type: 'USERS'
        };

        expect(_SCActions.getWidget(WIDGET_KEYS.USERS.key)).to.deep.equal(EXPECTED);
      });

      it('=>Get widget configuration Skill Status', () => {
        let EXPECTED = {
          id: null,
          sizeX: 30,
          sizeY: 12,
          name: 'Skill Status',
          template: 'app/features/sc/lists/templates/skillStatus.html',
          isLoading: false,
          type: 'SKILL_STATUS'
        };

        expect(_SCActions.getWidget(WIDGET_KEYS.SKILL_STATUS.key)).to.deep.equal(EXPECTED);
      });
    });

    describe('#UpdateWidgetsStatusLoading', () => {
      it('=>Agent State Widget',() => {
        expect(WIDGET_CONFIGURATIONS[0].type).to.equal(WIDGET_KEYS.AGENT_STATE.key);
        expect(WIDGET_CONFIGURATIONS[0].isLoading).to.equal(true);
        _SCActions.updateWidgetsLoading(WIDGET_CONFIGURATIONS, WIDGET_KEYS.AGENT_STATE.key, false);
        expect(WIDGET_CONFIGURATIONS[0].isLoading).to.equal(false);
      });

      it('=>Users Widget',() => {
        expect(WIDGET_CONFIGURATIONS[1].type).to.equal(WIDGET_KEYS.USERS.key);
        expect(WIDGET_CONFIGURATIONS[1].isLoading).to.equal(true);
        _SCActions.updateWidgetsLoading(WIDGET_CONFIGURATIONS, WIDGET_KEYS.USERS.key, false);
        expect(WIDGET_CONFIGURATIONS[1].isLoading).to.equal(false);
      });

      it('=>Skills Widget',() => {
        expect(WIDGET_CONFIGURATIONS[2].type).to.equal(WIDGET_KEYS.SKILL_STATUS.key);
        expect(WIDGET_CONFIGURATIONS[2].isLoading).to.equal(true);
        _SCActions.updateWidgetsLoading(WIDGET_CONFIGURATIONS, WIDGET_KEYS.SKILL_STATUS.key, false);
        expect(WIDGET_CONFIGURATIONS[2].isLoading).to.equal(false);
      });
    });

    describe('#FormatDataTables', () => {
      it('=>Agent State', () => {
        let EXPECTED = [
          {
            username: 'bruedi@enterprise9.com',
            fullName: 'Britt Ruedi',
            state: 'Logged Out',
            classState: 'loggedOut-state',
            stateDuration: '227:00:55',
            callType: '',
            reasonDuration: '00:00:00',
            reasonSince: 'N/A'
          },
          {
            username: 'salesforce@user.com',
            fullName: 'salesforce-User salesforce-User',
            state: 'Logged Out',
            classState: 'loggedOut-state',
            stateDuration: '221:13:30',
            callType: '',
            reasonDuration: '00:00:00',
            reasonSince: 'N/A'
          },
          {
            username: 'siamak@autoboxcorp1',
            fullName: 'siamak Marjouei',
            state: 'Logged Out',
            classState: 'loggedOut-state',
            stateDuration: '75:16:05',
            callType: '',
            reasonDuration: '00:00:00',
            reasonSince: 'N/A'
          }
        ];

        expect(_SCActions.formatRowsAgentState(DATA_REQUEST.AGENT_STATE.rows)).to.deep.equal(EXPECTED);
      });

      it('=>Info Agent State', () => {
        let EXPECTED = {
          'bruedi@enterprise9.com':[
            {
              'username':'bruedi@enterprise9.com',
              'description':[
                {
                  'label':'Total Calls',
                  'value':'0'
                },
                {
                  'label':'First Call Resolution',
                  'value':'0'
                },
                {
                  'label':'Avg Call Time',
                  'value':'00:00:00'
                },
                {
                  'label':'Avg Wrap Time',
                  'value':'00:00:00'
                },
                {
                  'label':'Avg Idle Time',
                  'value':'00:00:00'
                },
                {
                  'label':'Avg Not Ready Time',
                  'value':'00:00:00'
                },
                {
                  'label':'Avg Handle Time',
                  'value':'00:00:00'
                }
              ]
            }
          ],
          'siamak@autoboxcorp1':[
            {
              'username':'siamak@autoboxcorp1',
              'description':[
                {
                  'label':'Total Calls',
                  'value':'0'
                },
                {
                  'label':'First Call Resolution',
                  'value':'0'
                },
                {
                  'label':'Avg Call Time',
                  'value':'00:00:00'
                },
                {
                  'label':'Avg Wrap Time',
                  'value':'00:00:00'
                },
                {
                  'label':'Avg Idle Time',
                  'value':'00:00:00'
                },
                {
                  'label':'Avg Not Ready Time',
                  'value':'00:00:00'
                },
                {
                  'label':'Avg Handle Time',
                  'value':'00:00:00'
                }
              ]
            }
          ],
          'salesforce@user.com':[
            {
              username:'salesforce@user.com',
              description:[
                {
                  label:'Total Calls',
                  value:'0'
                },
                {
                  label:'First Call Resolution',
                  value:'0'
                },
                {
                  label:'Avg Call Time',
                  value:'00:00:00'
                },
                {
                  label:'Avg Wrap Time',
                  value:'00:00:00'
                },
                {
                  label:'Avg Idle Time',
                  value:'00:00:00'
                },
                {
                  label:'Avg Not Ready Time',
                  value:'00:00:00'
                },
                {
                  label:'Avg Handle Time',
                  value:'00:00:00'
                }
              ]
            }
          ]
        };
        expect(_SCActions.formatRowsInfoAgentState(DATA_REQUEST.INFO_AGENTS_STATE.rows)).to.deep.equal(EXPECTED);
      });

      it('=>Skill status', () => {
        let EXPECTED = [
          {
            name: 'Speed',
            loggedIn: '0 (0)',
            onCall: '0',
            inReady: '0',
            classInReady: 'ready-zero-status',
            callsInQueue: '0',
            classCallsQueue: 'queue-zero-status',
            queueTime: '0',
            longestWait: '0'
          },
          {
            name: 'Excellent interpersonal skills',
            loggedIn: '0 (0)',
            onCall: '0',
            inReady: '0',
            classInReady: 'ready-zero-status',
            callsInQueue: '0',
            classCallsQueue: 'queue-zero-status',
            queueTime: '0',
            longestWait: '0'
          },
          {
            name: 'Effective Communication Skills',
            loggedIn: '0 (0)',
            onCall: '0',
            inReady: '0',
            classInReady: 'ready-zero-status',
            callsInQueue: '0',
            classCallsQueue: 'queue-zero-status',
            queueTime: '0',
            longestWait: '0'
          }
        ];

        expect(_SCActions.formatRowsSkills(DATA_REQUEST.SKILLS.rows)).to.deep.equal(EXPECTED);
      });

      it('=>Users', () => {
        let EXPECTED = [
          {
            username:'saul@autoboxcorp.com',
            fullName:'',
            accountType:'Supervisor',
            sessionStart:'',
            station:''
          },
          {
            username:'agustin@autoboxcorp.com',
            fullName:'',
            accountType:'Administrator',
            sessionStart:'',
            station:''
          },
          {
            username:'michelle@autoboxcorp.com',
            fullName:'',
            accountType:'Agent',
            sessionStart:'',
            station:''
          }
        ];

        expect(_SCActions.formatDataUsers(DATA_REQUEST.USERS.data)).to.deep.equal(EXPECTED);
      });

    });
  });
});
