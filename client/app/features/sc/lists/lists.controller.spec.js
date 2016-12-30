'use strict';
describe('Component: SupervisorConsoleDashboard', () => {

  let _$scope,
    _$q,
    EXPECTED_WIDGET_TYPES,
    SCComponent,
    agentStatePromise,
    agentStateRefreshPromise,
    infoAgentStatePromise,
    infoAgentStateRefreshPromise,
    usersPromise,
    mockModal,
    endPointUrl,
    statisticsService,
    skillStatePromise,
    skillStateRefreshPromise,
    intervalTEST;

  beforeEach(module('fakiyaMainApp'));

  beforeEach(inject((
    $componentController,
    $interval,
    $q,
    $rootScope,
    _SupervisorConsoleActions_,
    _StatisticsService_,
    _Utils_,
    _appConfig_,
    _lodash_
  ) => {

    EXPECTED_WIDGET_TYPES = [
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

    if (_appConfig_.apiUri) {
      endPointUrl = _appConfig_.apiUri + '/sc/';
    }

    _$scope = $rootScope.$new();

    mockModal ={
      open: function(){
        return {result: $q.defer().promise};
      }
    };

    intervalTEST ={
      $interval : () => {}
    };

    sinon.spy(intervalTEST, '$interval');

    statisticsService =_StatisticsService_;

    _$q = $q;
    agentStatePromise = $q.defer();
    agentStateRefreshPromise = $q.defer();
    sinon.stub(statisticsService, 'getStatisticsAgentState').returns(agentStatePromise.promise);
    sinon.stub(statisticsService, 'refreshStatisticsAgentState').returns(agentStateRefreshPromise.promise);

    infoAgentStatePromise = $q.defer();
    infoAgentStateRefreshPromise = $q.defer();
    sinon.stub(statisticsService, 'getStatisticsSummary').returns(infoAgentStatePromise.promise);
    sinon.stub(statisticsService, 'refreshStatisticsSummary').returns(infoAgentStateRefreshPromise.promise);

    usersPromise = $q.defer();
    sinon.stub(statisticsService, 'getStatisticsUsers').returns(usersPromise.promise);

    skillStatePromise = $q.defer();
    skillStateRefreshPromise = $q.defer();
    sinon.stub(statisticsService, 'getStatisticsSkillStatus').returns(skillStatePromise.promise);
    sinon.stub(statisticsService, 'refreshStatisticsSkillStatus').returns(skillStateRefreshPromise.promise);

    SCComponent = $componentController('supervisor.console.lists', {
      $interval: intervalTEST.$interval,
      $q: $q,
      $scope: _$scope,
      ModalManager: mockModal,
      StatisticsService: statisticsService,
      SupervisorConsoleActions: _SupervisorConsoleActions_,
      Utils: _Utils_,
      lodash: _lodash_
    });
  }));

  describe('#InitSupervisorConsoleDashboard', () => {
    let EXPECTED_WIDGET_CONFIGURATIONS = [
      {
        id:null,
        sizeX:30,
        sizeY:24,
        row:0,
        col:0,
        name:'Agent State',
        template:'app/features/sc/lists/templates/agentState.html',
        isLoading:true,
        type:'AGENT_STATE'
      },
      {
        id:null,
        sizeX:30,
        sizeY:12,
        row:0,
        col:30,
        name:'Users',
        template:'app/features/sc/lists/templates/users.html',
        isLoading:true,
        type:'USERS'
      },
      {
        id:null,
        sizeX:30,
        sizeY:12,
        row:10,
        col:30,
        name:'Skill Status',
        template:'app/features/sc/lists/templates/skillStatus.html',
        isLoading: true,
        type:'SKILL_STATUS'
      }
    ],
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
          'FULL NAME',
          'ACCOUNT TYPE',
          'SESSION START',
          'STATION'
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
    },
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
      },
      DATA_REQUEST = {
        AGENT_STATE: {
            timestamp:'1482519430093',
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
            timestamp:'1482519810761',
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
            timestamp:'1482519810830',
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
              name:'saul@autoboxcorp.com',
              roledId:{
                role:'DomainSupervisor',
                userId:'2535354'
              }
            },
            {
              name:'agustin@autoboxcorp.com',
              roledId:{
                role:'DomainAdmin',
                userId:'2531470'
              }
            },
            {
              name:'michelle@autoboxcorp.com',
              roledId:{
                role:'Agent',
                userId:'2531471'
              }
            }
          ]
        }
      },
      DATA_REQUEST_REFRESH = {
        AGENT_STATE: {
        timestamp:'1482519878625',
        rows: [
          [
            'bruedi@enterprise9.com',
            'Britt Ruedi',
            'Logged Out',
            '817255000',
            '',
            '0',
            ''
          ]
        ]
      },
        INFO_AGENTS_STATE: {
        timestamp:'1482519878675',
        rows: [
          [
            'bruedi@enterprise9.com',
            '2',
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
        timestamp:'1482519877972',
        rows: [
          [
            'Speed-refresh',
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
            name:'agustin@autoboxcorp.com',
            roledId:{
              role:'DomainAdmin',
              userId:'2531470'
            }
          },
          {
            name:'michelle@autoboxcorp.com',
            roledId:{
              role:'Agent',
              userId:'2531471'
            }
          }
        ]
      }
    };

    it('should load default types and widgets configurations', () => {
      SCComponent.$onInit();
      expect(SCComponent.widgetTypes).to.deep.equal(EXPECTED_WIDGET_TYPES);
      expect(SCComponent.dashboard.widgets).to.deep.equal(EXPECTED_WIDGET_CONFIGURATIONS);
      expect(SCComponent.promisesInterval).to.deep.equal(PROMISES_INTERVAL);
    });

    it('should load headers of tables', () => {
      SCComponent.$onInit();
      expect(SCComponent.headersAgentsState).to.deep.equal(PANELS_HEADERS.AGENT_STATE.ui);
      expect(SCComponent.headersUsers).to.deep.equal(PANELS_HEADERS.USERS.ui);
      expect(SCComponent.headersSkillStatus).to.deep.equal(PANELS_HEADERS.SKILL_STATUS.ui);
    });

    it('should load headers to call EndPoints', () => {
      SCComponent.$onInit();
      expect(SCComponent.headersApiAgentsState).to.deep.equal(PANELS_HEADERS.AGENT_STATE.api.join());
      expect(SCComponent.headersApiInfoAgentsState).to.deep.equal(PANELS_HEADERS.INFO_AGENT_STATE.api.join());
      expect(SCComponent.headersApiSkillStatus).to.deep.equal(PANELS_HEADERS.SKILL_STATUS.api.join());
    });

    it('should load keys to refresh status loading of Widgets', () => {
      SCComponent.$onInit();
      expect(SCComponent.keyAgentState).to.deep.equal(PANELS_HEADERS.AGENT_STATE.key);
      expect(SCComponent.keyUsers).to.deep.equal(PANELS_HEADERS.USERS.key);
      expect(SCComponent.keySkillStatus).to.deep.equal(PANELS_HEADERS.SKILL_STATUS.key);
    });

    it('should load data to Agent State Table', () => {
      let EXPECTED_AGENT_STATE= [
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
      ],
        EXPECTED_INFO_AGENT_STATE = {
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
                'value':'0'
              },
              {
                'label':'Avg Wrap Time',
                'value':'0'
              },
              {
                'label':'Avg Idle Time',
                'value':'0'
              },
              {
                'label':'Avg Not Ready Time',
                'value':'0'
              },
              {
                'label':'Avg Handle Time',
                'value':'0'
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
                'value':'0'
              },
              {
                'label':'Avg Wrap Time',
                'value':'0'
              },
              {
                'label':'Avg Idle Time',
                'value':'0'
              },
              {
                'label':'Avg Not Ready Time',
                'value':'0'
              },
              {
                'label':'Avg Handle Time',
                'value':'0'
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
                value:'0'
              },
              {
                label:'Avg Wrap Time',
                value:'0'
              },
              {
                label:'Avg Idle Time',
                value:'0'
              },
              {
                label:'Avg Not Ready Time',
                value:'0'
              },
              {
                label:'Avg Handle Time',
                value:'0'
              }
            ]
          }
        ]
      };
      agentStatePromise.resolve({data: DATA_REQUEST.AGENT_STATE});
      infoAgentStatePromise.resolve({data: DATA_REQUEST.INFO_AGENTS_STATE});
      SCComponent.$onInit();
      _$scope.$apply();
      expect(SCComponent.dataAgentsState).to.deep.equal(EXPECTED_AGENT_STATE);
      expect(SCComponent.infoAgentState).to.deep.equal(EXPECTED_INFO_AGENT_STATE);
      expect(SCComponent.promisesInterval.AGENTS_STATE.timestamp).to.equal('1482519430093');
      expect(SCComponent.promisesInterval.INFO_AGENTS_STATE.timestamp).to.equal('1482519810761');
      expect(intervalTEST.$interval.calledOnce).to.equal(true);
    });

    it('should load data to Users Table', () => {
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

      usersPromise.resolve(DATA_REQUEST.USERS);
      SCComponent.$onInit();
      _$scope.$apply();
      expect(SCComponent.dataUsers).to.deep.equal(EXPECTED);
      expect(intervalTEST.$interval.calledOnce).to.equal(true);
    });

    it('should load data to Skill Status Table', () => {
      let EXPECTED = [
        {
          name:'Speed',
          loggedIn:'0 (0)',
          onCall:'0',
          inReady:'0',
          classInReady:'ready-zero-status',
          callsInQueue:'0',
          classCallsQueue:'queue-zero-status',
          queueTime:'0',
          longestWait:'0'
        },
        {
          name:'Excellent interpersonal skills',
          loggedIn:'0 (0)',
          onCall:'0',
          inReady:'0',
          classInReady:'ready-zero-status',
          callsInQueue:'0',
          classCallsQueue:'queue-zero-status',
          queueTime:'0',
          longestWait:'0'
        },
        {
          name:'Effective Communication Skills',
          loggedIn:'0 (0)',
          onCall:'0',
          inReady:'0',
          classInReady:'ready-zero-status',
          callsInQueue:'0',
          classCallsQueue:'queue-zero-status',
          queueTime:'0',
          longestWait:'0'
        }
      ];

      skillStatePromise.resolve({data: DATA_REQUEST.SKILLS});
      SCComponent.$onInit();
      _$scope.$apply();
      expect(SCComponent.dataSkillStatus).to.deep.equal(EXPECTED);
      expect(SCComponent.promisesInterval.SKILLS.timestamp).to.equal('1482519810830');
      expect(intervalTEST.$interval.calledOnce).to.equal(true);
    });

    it('Should load summary info of Agent State Table', () => {
      let ExpectedInfoSummary = [
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
              'value':'0'
            },
            {
              'label':'Avg Wrap Time',
              'value':'0'
            },
            {
              'label':'Avg Idle Time',
              'value':'0'
            },
            {
              'label':'Avg Not Ready Time',
              'value':'0'
            },
            {
              'label':'Avg Handle Time',
              'value':'0'
            }
          ]
        },
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
              value:'0'
            },
            {
              label:'Avg Wrap Time',
              value:'0'
            },
            {
              label:'Avg Idle Time',
              value:'0'
            },
            {
              label:'Avg Not Ready Time',
              value:'0'
            },
            {
              label:'Avg Handle Time',
              value:'0'
            }
          ]
        },
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
              'value':'0'
            },
            {
              'label':'Avg Wrap Time',
              'value':'0'
            },
            {
              'label':'Avg Idle Time',
              'value':'0'
            },
            {
              'label':'Avg Not Ready Time',
              'value':'0'
            },
            {
              'label':'Avg Handle Time',
              'value':'0'
            }
          ]
        }
      ];

      agentStatePromise.resolve({data: DATA_REQUEST.AGENT_STATE});
      infoAgentStatePromise.resolve({data: DATA_REQUEST.INFO_AGENTS_STATE});
      SCComponent.$onInit();
      _$scope.$apply();
      expect(SCComponent.getInfoAgentState(SCComponent.dataAgentsState[0].username)).to.deep.equal(ExpectedInfoSummary[0]);
      expect(SCComponent.getInfoAgentState(SCComponent.dataAgentsState[1].username)).to.deep.equal(ExpectedInfoSummary[1]);
      expect(SCComponent.getInfoAgentState(SCComponent.dataAgentsState[2].username)).to.deep.equal(ExpectedInfoSummary[2]);
    });

    describe('#RefreshWidgetsSupervisorConsole', () => {
      it('Should refresh Agent State', () => {
        let EXPECTED_AGENT_STATE = [
            {
              username:'bruedi@enterprise9.com',
              fullName:'Britt Ruedi',
              state:'Logged Out',
              classState:'loggedOut-state',
              stateDuration:'227:00:55',
              callType:'',
              reasonDuration:'00:00:00',
              reasonSince:'N/A'
            }
          ],
            EXPECTED_INFO_AGENT_STATE = {
              'bruedi@enterprise9.com':[
                {
                  'username':'bruedi@enterprise9.com',
                  'description':[
                    {
                      'label':'Total Calls',
                      'value':'2'
                    },
                    {
                      'label':'First Call Resolution',
                      'value':'0'
                    },
                    {
                      'label':'Avg Call Time',
                      'value':'0'
                    },
                    {
                      'label':'Avg Wrap Time',
                      'value':'0'
                    },
                    {
                      'label':'Avg Idle Time',
                      'value':'0'
                    },
                    {
                      'label':'Avg Not Ready Time',
                      'value':'0'
                    },
                    {
                      'label':'Avg Handle Time',
                      'value':'0'
                    }
                  ]
                }
              ]
            };

        agentStatePromise.resolve({data: DATA_REQUEST.AGENT_STATE});
        infoAgentStatePromise.resolve({data: DATA_REQUEST.INFO_AGENTS_STATE});
        SCComponent.$onInit();
        _$scope.$apply();
        expect(SCComponent.dataAgentsState).to.have.lengthOf(3);
        expect(SCComponent.infoAgentState).to.be.a('Object');
        expect(SCComponent.promisesInterval.AGENTS_STATE.timestamp).to.equal('1482519430093');
        expect(SCComponent.promisesInterval.INFO_AGENTS_STATE.timestamp).to.equal('1482519810761');

        agentStateRefreshPromise.resolve({data: DATA_REQUEST_REFRESH.AGENT_STATE});
        infoAgentStateRefreshPromise.resolve({data: DATA_REQUEST_REFRESH.INFO_AGENTS_STATE});
        SCComponent.refreshWidgets();
        _$scope.$apply();

        expect(SCComponent.dataAgentsState).to.deep.equal(EXPECTED_AGENT_STATE);
        expect(SCComponent.infoAgentState).to.deep.equal(EXPECTED_INFO_AGENT_STATE);
        expect(SCComponent.promisesInterval.AGENTS_STATE.timestamp).to.equal('1482519878625');
        expect(SCComponent.promisesInterval.INFO_AGENTS_STATE.timestamp).to.equal('1482519878675');
      });

      it('Should refresh Users', () => {
        let EXPECTED = [
          {
            'username':'agustin@autoboxcorp.com',
            'fullName':'',
            'accountType':'Administrator',
            'sessionStart':'',
            'station':''
          },
          {
            'username':'michelle@autoboxcorp.com',
            'fullName':'',
            'accountType':'Agent',
            'sessionStart':'',
            'station':''
          }
        ];

        usersPromise.resolve(DATA_REQUEST_REFRESH.USERS);
        SCComponent.$onInit();
        SCComponent.refreshWidgets();
        _$scope.$apply();
        expect(SCComponent.dataUsers).to.have.lengthOf(2);
        expect(SCComponent.dataUsers).to.deep.equal(EXPECTED);
      });

      it('Should refresh Skills Status', () => {
        let EXPECTED = [
          {
            name:'Speed-refresh',
            loggedIn:'0 (0)',
            onCall:'0',
            inReady:'0',
            classInReady:'ready-zero-status',
            callsInQueue:'0',
            classCallsQueue:'queue-zero-status',
            queueTime:'0',
            longestWait:'0'
          }
        ];

        skillStatePromise.resolve({data: DATA_REQUEST.SKILLS});
        SCComponent.$onInit();
        _$scope.$apply();
        expect(SCComponent.dataSkillStatus).to.have.lengthOf(3);
        expect(SCComponent.promisesInterval.SKILLS.timestamp).to.equal('1482519810830');

        skillStateRefreshPromise.resolve({data: DATA_REQUEST_REFRESH.SKILLS});
        SCComponent.refreshWidgets();
        _$scope.$apply();
        expect(SCComponent.dataSkillStatus).to.deep.equal(EXPECTED);
        expect(SCComponent.promisesInterval.SKILLS.timestamp).to.equal('1482519877972');
      });

    });

  });

  describe('#SupervisorConsole-Remove-Widget', () => {
    it('should removed a widget', () => {
      SCComponent.$onInit();
      expect(SCComponent.dashboard.widgets).to.have.lengthOf(3);
      SCComponent.removeWidget(SCComponent.dashboard.widgets[0]);
      expect(SCComponent.dashboard.widgets).to.have.lengthOf(2);
    });

    it('should not removed a widget with empty object', () => {
      SCComponent.$onInit();
      expect(SCComponent.dashboard.widgets).to.have.lengthOf(3);
      SCComponent.removeWidget({});
      expect(SCComponent.dashboard.widgets).to.have.lengthOf(3);
    });
  });

  describe('#SupervisorConsole-Add-Widget', () => {
    it('should add a widget', () => {
      expect(SCComponent.dashboard.widgets).to.have.lengthOf(0);
      SCComponent.addWidget(EXPECTED_WIDGET_TYPES[0].key);
      expect(SCComponent.dashboard.widgets).to.have.lengthOf(1);
      SCComponent.dashboard.widgets[0].row = 0;
      SCComponent.dashboard.widgets[0].col = 0;
    });

    it('should disable button refresh-add', () => {
      expect(SCComponent.enableRefreshAdd()).to.equal(false);
      SCComponent.addWidget(EXPECTED_WIDGET_TYPES[0].key);
      SCComponent.dashboard.widgets[0].isLoading = true;
      expect(SCComponent.enableRefreshAdd()).to.equal(true);
    });

    it('should disable item Widgets to can added dashboard', () => {
      expect(SCComponent.enableItemsAdd(EXPECTED_WIDGET_TYPES[0].key)).to.equal(false);
      SCComponent.addWidget(EXPECTED_WIDGET_TYPES[0].key);
      expect(SCComponent.enableItemsAdd(EXPECTED_WIDGET_TYPES[0].key)).to.equal(true);
    });
  });



});
