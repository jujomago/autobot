(function () {
  'use strict';

  class SupervisorConsoleListsController {
    constructor() {
      this.headersAgentsState = [
        'USERNAME',
        'FULL NAME',
        'STATE',
        'STATE DURATION',
        'CALL TYPE',
        'REASON',
        'REASON DURATION',
        'REASON SINCE'
      ];
      this.headersUsers = [
        'USERNAME',
        'FULL NAME',
        'ACCOUNT TYPE',
        'SESSION START'
      ];

      this.headersSkillStatus = [
        'NAME',
        'LOGGED IN',
        'ON CALL',
        'IN READY',
        'CALLS IN QUEUE',
        'QUEUE TIME',
        'LONGEST WAIT',
        'CALLS IN QUEUE TIME'
      ];

      this.dataAgentsState =[
        {
          username: 'gamification@blueruby.info',
          fullName: 'Gami Comunication',
          state: 'Ready',
          class:'ready-state ',
          stateDuration: '00:08:52',
          classDuration: 'duration-default-state',
          callType: 'Inbound',
          reason: '',
          reasonDuration: '00:00',
          reasonSince: 'Mon Nov 3 2016 12:42:40',
          info: {
            username: 'gamification@blueruby.info',
            description: [
              {
                label: 'Total Calls',
                value: '12'
              },
              {
                label: 'First Call Resolution',
                value: '1(8%)'
              },
              {
                label: 'Avg Call Time',
                value: '00:42:42'
              },
              {
                label: 'Avg Wrap Time',
                value: '00:00:36'
              },
              {
                label: 'Avg Idle Time',
                value: '00:14:42'
              },
              {
                label: 'Avg Not Ready Time',
                value: '00:45:28'
              },
              {
                label: 'Avg Idle Time',
                value: '00:42:23'
              }
            ]
          }
        },
        {
          username: 'martha92@blueruby.info',
          fullName: 'Martha Quimo',
          state: 'On Call',
          class: 'onCall-state',
          stateDuration: '00:34:12',
          classDuration: 'duration-default-state',
          callType: 'Inbound',
          reason: '',
          reasonDuration: '00:00',
          reasonSince: 'Thue Nov 12 12:42:40',
          info: {
            username: 'martha92@blueruby.info',
            description: [
              {
                label: 'Total Calls',
                value: '24'
              },
              {
                label: 'First Call Resolution',
                value: '8(10%)'
              },
              {
                label: 'Avg Call Time',
                value: '00:44:42'
              },
              {
                label: 'Avg Wrap Time',
                value: '00:56:36'
              },
              {
                label: 'Avg Idle Time',
                value: '00:28:42'
              },
              {
                label: 'Avg Not Ready Time',
                value: '00:43:28'
              },
              {
                label: 'Avg Idle Time',
                value: '00:06:23'
              }
            ]
          }
        },
        {
          username: 'jason.brown@blueruby.info',
          fullName: 'Jason Brown',
          state: 'On Call',
          class: 'onCall-state ',
          stateDuration: '00:55:26',
          classDuration: 'duration-state',
          callType: 'Inbound',
          reason: '',
          reasonDuration: '00:00',
          reasonSince: 'Thue Nov 12 12:42:40',
          info: {
            username: 'jason.brown@blueruby.info',
            description: [
              {
                label: 'Total Calls',
                value: '22'
              },
              {
                label: 'First Call Resolution',
                value: '32(50%)'
              },
              {
                label: 'Avg Call Time',
                value: '00:32:42'
              },
              {
                label: 'Avg Wrap Time',
                value: '00:50:36'
              },
              {
                label: 'Avg Idle Time',
                value: '00:44:42'
              },
              {
                label: 'Avg Not Ready Time',
                value: '00:15:28'
              },
              {
                label: 'Avg Idle Time',
                value: '00:22:23'
              }
            ]
          }
        },
        {
          username: 'daven@blueruby.info',
          fullName: 'Dave Anurag',
          state: 'On Call',
          class: 'onCall-state',
          stateDuration: '00:24:25',
          classDuration: 'duration-default-state',
          callType: 'Inbound',
          reason: '',
          reasonDuration: '00:00',
          reasonSince: 'Mon Nov 3 2016 12:42:40',
          info: {
            username: 'daven@blueruby.info',
            description: [
              {
                label: 'Total Calls',
                value: '22'
              },
              {
                label: 'First Call Resolution',
                value: '6(12%)'
              },
              {
                label: 'Avg Call Time',
                value: '00:56:42'
              },
              {
                label: 'Avg Wrap Time',
                value: '00:23:36'
              },
              {
                label: 'Avg Idle Time',
                value: '00:17:42'
              },
              {
                label: 'Avg Not Ready Time',
                value: '00:39:28'
              },
              {
                label: 'Avg Idle Time',
                value: '00:28:23'
              }
            ]
          }
        },
        {
          username: 'katherine@blueruby.info',
          fullName: 'Katherine Ferguson',
          state: 'On Call',
          class: 'onCall-state',
          stateDuration: '02:08:35',
          classDuration: 'duration-default-state',
          callType: 'Inbound',
          reason: '',
          reasonDuration: '00:00',
          reasonSince: 'Fri Oct 29 2016 12:42:40',
          info: {
            username: 'katherine@blueruby.info',
            description: [
              {
                label: 'Total Calls',
                value: '25'
              },
              {
                label: 'First Call Resolution',
                value: '12(9%)'
              },
              {
                label: 'Avg Call Time',
                value: '00:32:45'
              },
              {
                label: 'Avg Wrap Time',
                value: '00:09:36'
              },
              {
                label: 'Avg Idle Time',
                value: '00:44:02'
              },
              {
                label: 'Avg Not Ready Time',
                value: '00:02:28'
              },
              {
                label: 'Avg Idle Time',
                value: '00:01:44'
              }
            ]
          }
        },
        {
          username: 'ethan.gar@blueruby.info',
          fullName: 'Ethan Gardner',
          state: 'Not Ready',
          class: 'noReady-state',
          stateDuration: '01:36:55',
          classDuration: 'duration-state',
          callType: '',
          reason: 'Not Ready',
          reasonDuration: '00:00',
          reasonSince: 'Thue Nov 12 12:42:40',
          info: {
            username: 'ethan.gar@blueruby.info',
            description: [
              {
                label: 'Total Calls',
                value: '9'
              },
              {
                label: 'First Call Resolution',
                value: '8(7%)'
              },
              {
                label: 'Avg Call Time',
                value: '00:42:42'
              },
              {
                label: 'Avg Wrap Time',
                value: '00:07:36'
              },
              {
                label: 'Avg Idle Time',
                value: '00:02:22'
              },
              {
                label: 'Avg Not Ready Time',
                value: '00:11:28'
              },
              {
                label: 'Avg Idle Time',
                value: '00:66:23'
              }
            ]
          }
        },
        {
          username: 'olivia.pa@blueruby.info',
          fullName: 'Olivia Patterson',
          state: 'Not Ready',
          class: 'noReady-state',
          stateDuration: '00:40:22',
          classDuration: 'duration-default-state',
          callType: '',
          reason: 'Meeting',
          reasonDuration: '00:00',
          reasonSince: 'Fri Oct 29 2016 12:42:40',
          info: {
            username: 'olivia.pa@blueruby.info',
            description: [
              {
                label: 'Total Calls',
                value: '12'
              },
              {
                label: 'First Call Resolution',
                value: '1(8%)'
              },
              {
                label: 'Avg Call Time',
                value: '00:42:42'
              },
              {
                label: 'Avg Wrap Time',
                value: '00:00:36'
              },
              {
                label: 'Avg Idle Time',
                value: '00:14:42'
              },
              {
                label: 'Avg Not Ready Time',
                value: '00:45:28'
              },
              {
                label: 'Avg Idle Time',
                value: '00:42:23'
              }
            ]
          }
        },
        {
          username: 'david.ellis@blueruby.info',
          fullName: 'David Ellis',
          state: 'Not Ready',
          class: 'noReady-state',
          stateDuration: '00:11:52',
          classDuration: 'duration-default-state',
          callType: '',
          reason: 'LUNCH - 1 Hour',
          reasonDuration: '00:00',
          reasonSince: 'Thue Nov 12 12:42:40',
          info: {
            username: 'david.ellis@blueruby.info',
            description: [
              {
                label: 'Total Calls',
                value: '23'
              },
              {
                label: 'First Call Resolution',
                value: '6(2%)'
              },
              {
                label: 'Avg Call Time',
                value: '00:32:11'
              },
              {
                label: 'Avg Wrap Time',
                value: '00:05:15'
              },
              {
                label: 'Avg Idle Time',
                value: '00:45:07'
              },
              {
                label: 'Avg Not Ready Time',
                value: '00:07:33'
              },
              {
                label: 'Avg Idle Time',
                value: '00:44:02'
              }
            ]
          }
        },
        {
          username: 'phillip.newman@blueruby.info',
          fullName: 'Phillip Newman',
          state: 'Not Ready',
          class: 'noReady-state',
          stateDuration: '01:25:12',
          classDuration: 'duration-default-state',
          callType: '',
          reason: 'Not Ready',
          reasonDuration: '00:00',
          reasonSince: 'Mon Nov 3 2016 12:42:40',
          info: {
            username: 'phillip.newman@blueruby.info',
            description: [
              {
                label: 'Total Calls',
                value: '5'
              },
              {
                label: 'First Call Resolution',
                value: '3(7%)'
              },
              {
                label: 'Avg Call Time',
                value: '00:11:42'
              },
              {
                label: 'Avg Wrap Time',
                value: '00:01:07'
              },
              {
                label: 'Avg Idle Time',
                value: '00:33:55'
              },
              {
                label: 'Avg Not Ready Time',
                value: '00:02:06'
              },
              {
                label: 'Avg Idle Time',
                value: '00:09:07'
              }
            ]
          }
        },
        {
          username: 'phillip.newman@blueruby.info',
          fullName: 'Phillip Newman',
          state: 'Not Ready',
          class: 'noReady-state',
          stateDuration: '01:25:12',
          classDuration: 'duration-default-state',
          callType: '',
          reason: 'Not Ready',
          reasonDuration: '00:00',
          reasonSince: 'Mon Nov 3 2016 12:42:40',
          info: {
            username: 'phillip.newman@blueruby.info',
            description: [
              {
                label: 'Total Calls',
                value: '5'
              },
              {
                label: 'First Call Resolution',
                value: '3(7%)'
              },
              {
                label: 'Avg Call Time',
                value: '00:11:42'
              },
              {
                label: 'Avg Wrap Time',
                value: '00:01:07'
              },
              {
                label: 'Avg Idle Time',
                value: '00:33:55'
              },
              {
                label: 'Avg Not Ready Time',
                value: '00:02:06'
              },
              {
                label: 'Avg Idle Time',
                value: '00:09:07'
              }
            ]
          }
        },
        {
          username: 'david.ellis@blueruby.info',
          fullName: 'David Ellis',
          state: 'Not Ready',
          class: 'noReady-state',
          stateDuration: '00:11:52',
          classDuration: 'duration-default-state',
          callType: '',
          reason: 'LUNCH - 1 Hour',
          reasonDuration: '00:00',
          reasonSince: 'Thue Nov 12 12:42:40',
          info: {
            username: 'david.ellis@blueruby.info',
            description: [
              {
                label: 'Total Calls',
                value: '23'
              },
              {
                label: 'First Call Resolution',
                value: '6(2%)'
              },
              {
                label: 'Avg Call Time',
                value: '00:32:11'
              },
              {
                label: 'Avg Wrap Time',
                value: '00:05:15'
              },
              {
                label: 'Avg Idle Time',
                value: '00:45:07'
              },
              {
                label: 'Avg Not Ready Time',
                value: '00:07:33'
              },
              {
                label: 'Avg Idle Time',
                value: '00:44:02'
              }
            ]
          }
        }
      ];

      this.dataUsers = [
        {
          username: 'martha92@blueruby.info',
          fullName: 'Martha Quimo',
          accountType: 'Administrator',
          sessionStart: 'Mon Nov 28 2016 10:55:12'
        },
        {
          username: 'phillip.newman@blueruby.info',
          fullName: 'Phillip Newman',
          accountType: 'Supervisor',
          sessionStart: 'Thue Nov 28 2016 10:55:12'
        },
        {
          username: 'david.ellis@blueruby.info',
          fullName: 'David Ellis',
          accountType: 'Administrator',
          sessionStart: 'Fri Nov 28 2016 10:55:12'
        },
        {
          username: 'ethan.gar@blueruby.info',
          fullName: 'Ethan Gardner',
          accountType: 'Administrator',
          sessionStart: 'Mon Nov 28 2016 10:55:12'
        },
        {
          username: 'jason.brown@blueruby.info',
          fullName: 'Jason Brown',
          accountType: 'Administrator',
          sessionStart: 'Mon Nov 28 2016 10:55:12'
        }
      ];

      this.dataSkillStatus = [
        {
          name: 'Home Agent Assistant',
          loggedIn: '21',
          onCall: '6',
          inReady: '1',
          class: 'ready-status',
          callsInQueue: '1',
          classQueue:'queue-status ',
          queueTime: '00:00:00',
          longestWait: '02:36',
          callTimeQueue: '0'
        },
        {
          name: 'Skill1',
          loggedIn: '23',
          onCall: '6',
          inReady: '1',
          classQueue:'queue-status ',
          class: 'ready-status',
          callsInQueue: '1',
          queueTime: '00:00:00',
          longestWait: '03:36',
          callTimeQueue: '0'
        },
        {
          name: 'Skill2',
          loggedIn: '14',
          onCall: '4',
          inReady: '1',
          class: 'ready-status',
          callsInQueue: '1',
          classQueue:'queue-status ',
          queueTime: '00:00:00',
          longestWait: '00:36',
          callTimeQueue: '0'
        },
        {
          name: 'Skill3',
          loggedIn: '29',
          onCall: '6',
          inReady: '1',
          class: 'ready-status',
          callsInQueue: '0',
          classQueue:'queue-status ',
          queueTime: '00:00:00',
          longestWait: '01:05',
          callTimeQueue: '0'
        },
        {
          name: 'Supervisor',
          loggedIn: '0',
          onCall: '0',
          inReady: '0',
          class: 'ready-zero-status',
          callsInQueue: '0',
          classQueue:'queue-status ',
          queueTime: '00:00:00',
          longestWait: '00:00',
          callTimeQueue: '0'
        }
      ];

      this.standardItems = [
        {
          sizeX: 3,
          sizeY: 2,
          row: 0,
          col: 0 ,
          name: 'Agent State',
          template: 'app/features/sc/lists/templates/agentState.html'
        },
        {
          sizeX: 3,
          sizeY: 1,
          row: 0,
          col: 3 ,
          name: 'Users',
          template: 'app/features/sc/lists/templates/users.html'
        },
        {
          sizeX: 3,
          sizeY: 1,
          row: 1,
          col: 3 ,
          name: 'Skill Status',
          template: 'app/features/sc/lists/templates/skillStatus.html'
        }
      ];

      this.gridOptions = {
        margins: [5, 5]
      };
    }


    $onInit() {}
  }

  SupervisorConsoleListsController.$inject = [];

  angular.module('fakiyaMainApp')
    .component('supervisor.console.lists',
      {
        templateUrl: 'app/features/sc/lists/lists.html',
        controller: SupervisorConsoleListsController
      });
})();
