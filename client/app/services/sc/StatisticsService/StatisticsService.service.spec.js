'use strict';
describe('#SupervisorConsoleStatisticsServiceAPI', () => {
  beforeEach(module('fakiyaMainApp'));

  var _StatisticsService,
    _endPointUrl,
    _httpBackend;



  beforeEach(inject(function (
    $q,
    $httpBackend,
    _StatisticsService_,
    _appConfig_
  ) {
    _StatisticsService = _StatisticsService_;
    _httpBackend = $httpBackend;
    if(_appConfig_.apiUri){
      _endPointUrl = _appConfig_.apiUri+'/f9/supervisor';
    }
  }));

  afterEach(function () {
    _httpBackend.verifyNoOutstandingExpectation();
    _httpBackend.verifyNoOutstandingRequest();
  });

  describe('#API-SCAgentStatus',() => {
    let columns = 'Username,Full Name,State,State Duration,Call Type,Reason Duration,Reason Since',
        response = {
          data: {
            'timestamp': '1482519430093',
            'type': 'AgentState',
            'headers': [
              'Username',
              'Full Name',
              'State',
              'State Duration',
              'Call Type',
              'Reason Duration',
              'Reason Since'
            ],
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
          status:200,
          config: {
            method: 'GET',
            transformRequest: [
              null
            ],
            transformResponse: [
              null
            ]
          }
        };


    it('should GET Agent Status', () => {
      let promise;
      _httpBackend.whenGET(_endPointUrl+'/statistics/agents/state?columnnames='+columns).respond(response.data);
      promise = _StatisticsService.getStatisticsAgentState(columns);
      _httpBackend.flush();

      promise.then(result=> {
        expect(result.data).to.deep.equal(response.data);
      });
    });

    it('should return error when GET Agent Status', () => {
      _httpBackend.whenGET(_endPointUrl+'/statistics/agents/state?columnnames='+columns).respond(500,'Some error message from the server');
      _StatisticsService.getStatisticsAgentState(columns).catch(response =>{
        expect(response.errorMessage).to.equal('Some error message from the server');
        expect(response.data).to.equal(undefined);
        expect(response.statusCode).to.equal(500);
      });

      _httpBackend.flush();
    });

    it('should refresh GET Agent Status', () => {
      _httpBackend.whenGET(_endPointUrl+'/statistics/agents/state/livereload?columnnames='+columns+'&previoustimestamp=545454121&longpollingtimeout=2000').respond(response.data);
      _StatisticsService.refreshStatisticsAgentState(columns,545454121,2000).then(result=> {
        expect(result.data).to.deep.equal(response.data);
      });
      _httpBackend.flush();
    });

    it('should return error when refresh GET Agent Status', () => {
      _httpBackend.whenGET(_endPointUrl+'/statistics/agents/state/livereload?columnnames='+columns+'&previoustimestamp=545454121&longpollingtimeout=2000').respond(500,'Some error message from the server');
      _StatisticsService.refreshStatisticsAgentState(columns,545454121,2000).catch(response =>{
        expect(response.errorMessage).to.equal('Some error message from the server');
        expect(response.data).to.equal(undefined);
        expect(response.statusCode).to.equal(500);
      });

      _httpBackend.flush();
    });
  });

  describe('#API-SCUsers',() => {
    let response = {
      data :{
        return: [
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
      } ,
      status:200,
      config: {
        method: 'GET',
        transformRequest: [
          null
        ],
        transformResponse: [
          null
        ]
      }
    };

    it('should GET Users', () => {
      _httpBackend.whenGET(_endPointUrl+'/users/logged').respond(response.data);
      _StatisticsService.getStatisticsUsers().then(result=> {
        expect(result.data).to.deep.equal(response.data.return);
      });
      _httpBackend.flush();
    });

    it('should return error when GET User', () => {
      _httpBackend.whenGET(_endPointUrl+'/users/logged').respond(500,'Some error message from the server');
      _StatisticsService.getStatisticsUsers().catch(response =>{
        expect(response.errorMessage).to.equal('Some error message from the server');
        expect(response.data).to.equal(undefined);
        expect(response.statusCode).to.equal(500);
      });

      _httpBackend.flush();
    });
  });

  describe('#API-SCSkillStatus',() => {
    let columns = 'NAME,LOGGED IN,ON CALL,IN READY,CALLS IN QUEUE,QUEUE TIME,LONGEST WAIT',
      response = {
        data: {
          'timestamp': '1482519877972',
          'type': 'ACDStatus',
          'headers': [
            'Skill Name',
            'Agents Logged In',
            'Agents On Call',
            'Agents Ready For Calls',
            'Calls In Queue',
            'Current Longest Queue Time',
            'Longest Queue Time'
          ],
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
            ]
          ]
        },
        status:200,
        config: {
          method: 'GET',
          transformRequest: [
            null
          ],
          transformResponse: [
            null
          ]
        }
      };

    it('should GET Skill Status', () => {
      _httpBackend.whenGET(_endPointUrl+'/statistics/acd/status?columnnames='+columns).respond(response.data);
      _StatisticsService.getStatisticsSkillStatus(columns).then(result=> {
        expect(result.data).to.deep.equal(response.data);
      });
      _httpBackend.flush();
    });

    it('should return error when GET Skill Status failed', () => {
      _httpBackend.whenGET(_endPointUrl+'/statistics/acd/status?columnnames='+columns).respond(500,'Some error message from the server');
      _StatisticsService.getStatisticsSkillStatus(columns).catch(response =>{
        expect(response.errorMessage).to.equal('Some error message from the server');
        expect(response.data).to.equal(undefined);
        expect(response.statusCode).to.equal(500);
      });

      _httpBackend.flush();
    });

    it('should refresh GET Skill Status', () => {
      _httpBackend.whenGET(_endPointUrl+'/statistics/acd/status/livereload?columnnames='+columns+'&previoustimestamp=545454121&longpollingtimeout=2000').respond(response.data);
      _StatisticsService.refreshStatisticsSkillStatus(columns,545454121,2000).then(result=> {
        expect(result.data).to.deep.equal(response.data);
      });
      _httpBackend.flush();
    });

    it('should return error when refresh GET Skill Status failed', () => {
      _httpBackend.whenGET(_endPointUrl+'/statistics/acd/status/livereload?columnnames='+columns+'&previoustimestamp=545454121&longpollingtimeout=2000').respond(500,'Some error message from the server');
      _StatisticsService.refreshStatisticsSkillStatus(columns,545454121,2000).catch(response =>{
        expect(response.errorMessage).to.equal('Some error message from the server');
        expect(response.data).to.equal(undefined);
        expect(response.statusCode).to.equal(500);
      });

      _httpBackend.flush();
    });

  });


  describe('#API-SCSummary',() => {
    let columns = 'Username,Total Calls,First Call Resolution,Avg Call Time,Avg Wrap Time,Avg Idle Time,Avg Not Ready Time,Avg Handle Time',
      response = {
        data: {
          'timestamp': '1482519810761',
          'type': 'AgentStatistics',
          'headers': [
            'Username',
            'Total Calls',
            'First Call Resolution',
            'Avg Call Time',
            'Avg Wrap Time',
            'Avg Idle Time',
            'Avg Not Ready Time',
            'Avg Handle Time'
          ],
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
            ]
          ]
        },
        status:200,
        config: {
          method: 'GET',
          transformRequest: [
            null
          ],
          transformResponse: [
            null
          ]
        }
      };

    it('should GET Summary', () => {
      _httpBackend.whenGET(_endPointUrl+'/statistics/agents?columnnames='+columns).respond(response.data);
      _StatisticsService.getStatisticsSummary(columns).then(result=> {
        expect(result.data).to.deep.equal(response.data);
      });
      _httpBackend.flush();
    });

    it('should return error when GET Summary failed', () => {
      _httpBackend.whenGET(_endPointUrl+'/statistics/agents?columnnames='+columns).respond(500,'Some error message from the server');
      _StatisticsService.getStatisticsSummary(columns).catch(response =>{
        expect(response.errorMessage).to.equal('Some error message from the server');
        expect(response.data).to.equal(undefined);
        expect(response.statusCode).to.equal(500);
      });

      _httpBackend.flush();
    });

    it('should refresh Summary Status', () => {
      _httpBackend.whenGET(_endPointUrl+'/statistics/agents/livereload?columnnames='+columns+'&previoustimestamp=545454121&longpollingtimeout=2000').respond(response.data);
      _StatisticsService.refreshStatisticsSummary(columns,545454121,2000).then(result=> {
        expect(result.data).to.deep.equal(response.data);
      });
      _httpBackend.flush();
    });

    it('should return error when refresh Summary Status failed', () => {
      _httpBackend.whenGET(_endPointUrl+'/statistics/agents/livereload?columnnames='+columns+'&previoustimestamp=545454121&longpollingtimeout=2000').respond(500,'Some error message from the server');
      _StatisticsService.refreshStatisticsSummary(columns,545454121,2000).catch(response =>{
        expect(response.errorMessage).to.equal('Some error message from the server');
        expect(response.data).to.equal(undefined);
        expect(response.statusCode).to.equal(500);
      });

      _httpBackend.flush();
    });

  });

});
