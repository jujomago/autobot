'use strict';
describe('#SupervisorConsoleConfigurationsService', () => {
  let _ConfigurationsService,
      _endPointUrl,
      _httpBackend;

  beforeEach(module('fakiyaMainApp'));

  beforeEach(inject(function (
    _$httpBackend_,
    _ConfigurationsService_,
    _appConfig_
  ) {
    _ConfigurationsService = _ConfigurationsService_;
    _httpBackend = _$httpBackend_;
    if(_appConfig_.apiUri){
      _endPointUrl = _appConfig_.apiUri+'/sc/statistics/configurations';
    }
    /*
     * ADD UNIT TEST WHEN EXIST API DEFINED
     */
  }));
});
