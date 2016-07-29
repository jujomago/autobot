'use strict';

describe('Component: al.lists.mapping', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var MappingComponent, scope, _$httpBackend;
  var contactFieldService, window, endPointUrl,lodash;

  var mockCSV = `llave,first_name,last_name,company
                6643342368,Ken,Osborn,Five9
                7777777777,Josue, Mancilla, Sinapsysit
                3333333333,Boris,Bachas, ninguna
                011555555555452,Brandon,Peto, none
                6666666666,Jackie,Banda, none 
                7777777777,Toto,Sullue, none`;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope, $httpBackend, $stateParams, $window, _ContactFieldsService_, appConfig,_lodash_) {
    scope = $rootScope.$new();
    _$httpBackend = $httpBackend;
    contactFieldService = _ContactFieldsService_;
    window = $window;
    lodash=_lodash_; 

    if (appConfig.apiUri) {
      endPointUrl = appConfig.apiUri + '/f9/contactfields';
    }
    


    MappingComponent = $componentController('al.lists.mapping', {    
      $stateParams: { settings: { csvData: mockCSV } },
      $window: window,
      ContactFieldsService: contactFieldService,
      lodash:lodash
    });

    _$httpBackend.whenGET(url => (url.indexOf('.html') !== -1)).respond(200);


  }));

  afterEach(function () {
    _$httpBackend.verifyNoOutstandingRequest();
  });

  describe('#getContactFields', () => {

    it('should return all contact fields', () => {
      _$httpBackend.whenGET(endPointUrl).respond(200, {
        return: [{
          'displayAs': 'Long',
          'mapTo': 'None',
          'name': 'number3',
          'system': true,
          'type': 'PHONE'
        },
          {
            'displayAs': 'Short',
            'mapTo': 'None',
            'name': 'first_name',
            'system': true,
            'type': 'STRING'
          }]
      });

      expect(MappingComponent.loadingContacts).to.equal(true);

      MappingComponent.getContactFiels()
        .then(response => {
          expect(response.statusCode).to.equal(200);
          expect(response.errorMessage).to.equal(null);
          expect(response.data).to.have.lengthOf(2);
          expect(MappingComponent.loadingContacts).to.equal(false);
          expect(MappingComponent.contactFields).to.have.lengthOf(2);
        });

      _$httpBackend.flush();

    });

    it('should show error message when error', () => {
      _$httpBackend.whenGET(endPointUrl).respond(500, {
        data: null, statusCode: 500, errorMessage: 'Some Error front Endpoint'
      });

      expect(MappingComponent.loadingContacts).to.equal(true);

      MappingComponent.getContactFiels()
        .then(response => {
          expect(response.statusCode).to.equal(500);
          expect(response.errorMessage).to.not.equal(null);
          expect(response.data).to.equal(null);
          expect(MappingComponent.message).to.eql({ show: true, type: 'warning', text: response.errorMessage });
          expect(MappingComponent.loadingContacts).to.equal(true);
          expect(MappingComponent.contactFields).to.have.lengthOf(0);
        });

      _$httpBackend.flush();

    });

  });

  describe('#changeDelimiter', () => {

    it('Custom delimiter Unserscore', () => {

      MappingComponent.selectedDelimiter.title = 'Custom';
      MappingComponent.selectedSymbolDelimiter = '_';

      MappingComponent.changeDelimiter();

      expect(MappingComponent.customDelimiterEnabled).to.equal(true);
      expect(MappingComponent.jsonCSV).to.not.equal(null);
      expect(MappingComponent.jsonCSV).to.be.instanceof(Array);
      expect(MappingComponent.jsonCSV[0]).to.eql(['llave,first', 'name,last', 'name,company']);

      expect(MappingComponent.jsonCSV).to.have.lengthOf(7);

    });

    it('Default delimiter Comma', () => {

      MappingComponent.selectedDelimiter.title = 'Comma';
      expect(MappingComponent.selectedDelimiter.title).to.not.equal('Custom');

      MappingComponent.changeDelimiter();

      expect(MappingComponent.customDelimiterEnabled).to.equal(false);
      expect(MappingComponent.jsonCSV).to.not.equal(null);
      expect(MappingComponent.jsonCSV).to.be.instanceof(Array);
      expect(MappingComponent.jsonCSV).to.have.lengthOf(7);
      expect(MappingComponent.jsonCSV[0]).to.eql(['llave', 'first_name', 'last_name', 'company']);


    });

  });

  describe('#matchSmart', () => {

    it('Fields should match exact names in the cvs file header', () => {
      
      MappingComponent.hasHeader=true;

      expect(MappingComponent.hasHeader).to.equal(true);

      MappingComponent.contactFields = [
        {'name': 'number1' },
        {'name': 'number2' },
        {'name': 'number3' },
        {'name': 'first_name'},
        {'name': 'last_name'},
        {'name': 'company'}
      ];

      let matchedFiedls=MappingComponent.matchSmart();
      expect(matchedFiedls).to.be.an.instanceof(Array);
      console.log('mached fields');
      console.log(matchedFiedls);
      expect(matchedFiedls).to.eql([{name:'first_name'},{name:'last_name'},{name:'company'}]);

    });

    it('matchSmart but header not enabled', () => {
      
      MappingComponent.hasHeader=false;

      expect(MappingComponent.hasHeader).to.equal(false);

      let matchedFiedls=MappingComponent.matchSmart();
      expect(matchedFiedls).to.equal(null);

    });

  });

 describe('#clearMapping', () => {

    it('all sourceFields values should be null', () => {
      
      MappingComponent.contactFields = [
        {'name': 'number1' },
        {'name': 'number2' },
        {'name': 'number3' },
        {'name': 'first_name'},
        {'name': 'last_name'},
        {'name': 'company'}
      ];

      MappingComponent.clearMapping();
      let checkNullSources=MappingComponent.sourceFields.every(el=>(el===null));
      expect(checkNullSources).to.equal(true);      
   });


  });

  describe('#validateMappingKeyFields', () => {

    it('2 keys selected but not mapped to source field', () => {

      MappingComponent.contactFields = [
        {'name': 'number1' },
        {'name': 'number2' },
        {'name': 'number3' },
        {'name': 'first_name'},
        {'name': 'last_name'},
        {'name': 'company'}
      ];
      
      let testKeyFiedls=['number2','last_name'];

       MappingComponent.sourceFields = [
        {'name': 'number1' },
        null,
        {'name': 'number3' },
        {'name': 'first_name'},
        null,
        {'name': 'company'}
      ];
 

      MappingComponent.hasHeader=true;

      let resultV=MappingComponent.validateMappingKeyFields(testKeyFiedls);

      expect(resultV).to.equal(false);
  
   });


   it('3 keys selected but and mapped to source fields', () => {

      MappingComponent.contactFields = [
        {'name': 'number1' },
        {'name': 'number2' },
        {'name': 'number3' },
        {'name': 'first_name'},
        {'name': 'last_name'},
        {'name': 'company'}
      ];
      
      let testKeyFiedls=['number2','last_name','company'];

       MappingComponent.sourceFields = [
        null,
        {'name': 'number2' },
        {'name': 'number3' },
        {'name': 'first_name'},
        {'name': 'last_name'},
        {'name': 'company'}
      ];
 

      MappingComponent.hasHeader=true;

      let resultV=MappingComponent.validateMappingKeyFields(testKeyFiedls);

      expect(resultV).to.equal(true);
  
   });


  });

 describe('#finishMap', () => {

  it('contacts fields key valids and send delete settings', () => {

      MappingComponent.contactFields = [       
        {name: 'number2',mappedName: 'number2',isKey:true},
        {name: 'number3',mappedName: null },
        {name: 'first_name',mappedName: 'first_name'},
        {name: 'last_name',mappedName: 'last_name'},
        {name: 'company',mappedName: 'company'}
      ];     
      MappingComponent.finishMap();
      expect(MappingComponent.dataToSend.listDeleteSettings).to.not.equal(null);
      expect(undefined).to.equal(MappingComponent.dataToSend.listUpdateSettings); 
      expect(MappingComponent.dataToSend.listDeleteSettings).to.not.eql(mockDeleteSettigs);     
   });


  it('contacts fields key invalid, return false', () => {

      MappingComponent.contactFields = [       
        {name: 'number2',mappedIndex:0,isKey:true},
        {name: 'number3',mappedIndex: 0},
        {name: 'first_name',mappedIndex:0, isKey:true},
        {name: 'last_name',mappedIndex: 2},
        {name: 'company',mappedIndex: 1}
      ];     
      expect(MappingComponent.finishMap()).to.equal(false);
      
   });

  });



});
