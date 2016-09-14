'use strict';

describe('Component: al.lists.mapping', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var MappingComponent, scope, _$httpBackend;
  var contactFieldService, window, endPointUrl,lodash;

  var mockCSV = `
    llave,llave2,first_name,last_name,company
    7777777777,,Josue, Mancilla, Sinapsysit
    3333333333,53,Boris,Bachas, ninguna
    664334368,5535632212,Ken,Osborn,Five9
    011555555555452,,Brandon,Peto, none
    6666666666,,Jackie,Banda, none 
    777777777798,,Toto,Sullue, non
    6643342368,,Ken,Osborn,Five9
    6666666,33,Jackie,Banda, other
    3222323233,,Jackie,Banda, other  
`;
  var mockDeleteSettigs={
            fieldsMapping: [{columnNumber: 1, fieldName: 'number1', key: true}], 
            listDeleteMode: 'DELETE_ALL'} ;


  // Initialize the controller and a mock scope
  beforeEach(
    inject(function ($componentController, $rootScope, $httpBackend, $stateParams, $window, _ContactFieldsService_, appConfig,_lodash_) {

    scope = $rootScope.$new();
    _$httpBackend = $httpBackend;
    contactFieldService = _ContactFieldsService_;
    window = $window;
    lodash=_lodash_; 

    if (appConfig.apiUri) {
      endPointUrl = appConfig.apiUri + '/f9/contactfields';
    } 


    MappingComponent = $componentController('al.lists.mapping', {    
      $stateParams: {
        settings: 
        { 
          csvData: mockCSV, 
          listDeleteSettings:mockDeleteSettigs 
        } 
      },
      $window: window,
      ContactFieldsService: contactFieldService,
      lodash:lodash
    });

    _$httpBackend.whenGET(url => (url.indexOf('.html') !== -1)).respond(200);
  }));

  afterEach(function () {
    _$httpBackend.verifyNoOutstandingRequest();
  });

 
 

  describe('#setStateParams',()=>{

       describe('When mode is manual in stateParams',()=>{
            beforeEach(
                inject(function ($componentController, $rootScope, $httpBackend, $stateParams, $window, _ContactFieldsService_, appConfig,_lodash_) {

                scope = $rootScope.$new();
                _$httpBackend = $httpBackend;
                contactFieldService = _ContactFieldsService_;
                window = $window;
                lodash=_lodash_; 

                if (appConfig.apiUri) {
                  endPointUrl = appConfig.apiUri + '/f9/contactfields';
                } 

                MappingComponent = $componentController('al.lists.mapping', {    
                  $stateParams: {
                    manual:true,
                    name:'testListName'              
                  },
                  $window: window,
                  ContactFieldsService: contactFieldService,
                  lodash:lodash
                });
                _$httpBackend.whenGET(url => (url.indexOf('.html') !== -1)).respond(200);
            }));

            it('should cant mapping', () => {
                MappingComponent.setStateParams({
                    manual:true,
                    name:'testListName'              
                });                
                expect(MappingComponent.listName).to.equal('testListName');
                expect(MappingComponent.canMapping).to.equal(false);
            });
       });
       describe('When mode is not manual in stateParams',()=>{
            beforeEach(
                inject(function ($componentController, $rootScope, $httpBackend, $stateParams, $window, _ContactFieldsService_, appConfig,_lodash_) {

                scope = $rootScope.$new();
                _$httpBackend = $httpBackend;
                contactFieldService = _ContactFieldsService_;
                window = $window;
                lodash=_lodash_; 

                if (appConfig.apiUri) {
                  endPointUrl = appConfig.apiUri + '/f9/contactfields';
                } 

                MappingComponent = $componentController('al.lists.mapping', {    
                  $stateParams: { 
                    name:'testListName',     
                    settings:{ 
                        csvData: mockCSV, 
                        listDeleteSettings:mockDeleteSettigs 
                    }              
                  },
                  $window: window,
                  ContactFieldsService: contactFieldService,
                  lodash:lodash
                });
                _$httpBackend.whenGET(url => (url.indexOf('.html') !== -1)).respond(200);
            }));

            it('should can mapping', () => {
                MappingComponent.setStateParams({  
                    name:'testListName',   
                    settings:{ 
                        csvData: mockCSV, 
                        listDeleteSettings:mockDeleteSettigs 
                    }                
                });                
                expect(MappingComponent.listName).to.equal('testListName');
                expect(MappingComponent.canMapping).to.equal(true);
                expect(MappingComponent.rawCSV).to.equal(mockCSV);
            });
       });


  });

// TODO: Solve problem with lodash(_.forEach)
/*
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
          },
          {
            'displayAs': 'Short',
            'mapTo': 'Something',
            'name': 'last_name',
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
  */

 describe('#changeDelimiter', () => {

    it('Custom delimiter Unserscore', () => {

      MappingComponent.setStateParams({settings: {
          csvData: mockCSV, 
          listDeleteSettings:mockDeleteSettigs 
      }});


      MappingComponent.selectedDelimiter.title = 'Custom';
      MappingComponent.customDelimiterDefaultSymbol = '_';
      //MappingComponent.customDelimiterEnabled=true;

    MappingComponent.changeDelimiter();
   
     expect(MappingComponent.customDelimiterEnabled).to.equal(true);
      expect(MappingComponent.jsonCSV).to.not.equal(null);
      expect(MappingComponent.jsonCSV).to.be.instanceof(Array);  
      expect(MappingComponent.jsonCSV).to.have.lengthOf(9);

    });

    it('Default delimiter Comma', () => {
      
      MappingComponent.setStateParams({settings: {
          csvData: mockCSV, 
          listDeleteSettings:mockDeleteSettigs 
      }});

      MappingComponent.selectedDelimiter.title = 'Comma';
      expect(MappingComponent.selectedDelimiter.title).to.not.equal('Custom');

      MappingComponent.changeDelimiter();

      expect(MappingComponent.customDelimiterEnabled).to.equal(false);
      expect(MappingComponent.jsonCSV).to.not.equal(null);
      expect(MappingComponent.jsonCSV).to.be.instanceof(Array);
      expect(MappingComponent.jsonCSV).to.have.lengthOf(9);

    });

  });


  describe('#matchSmart', () => {
    it('Fields should match exact names in the cvs file header', () => {

    MappingComponent.setStateParams({
        name:'testListName',
        settings:{ 
              csvData: mockCSV, 
              listDeleteSettings:mockDeleteSettigs 
        }      
    });

      MappingComponent.hasHeader=true;

      expect(MappingComponent.hasHeader).to.equal(true);

      MappingComponent.contactFields = [
        {'name':'number1',mappedName:null,isKey:true},
        {'name':'number2',mappedName:null,isKey:false},
        {'name':'number3' ,mappedName:null,isKey:true },
        {'name':'first_name',mappedName:null,isKey:false },
        {'name':'last_name',mappedName:null,isKey:true},
        {'name':'company',mappedName:null,isKey:false }
      ];

      let matchedFiedls=MappingComponent.matchSmart();
      expect(matchedFiedls).to.be.an.instanceof(Array);
 
      expect(matchedFiedls[0].mappedName).to.eql(null);
      expect(matchedFiedls[1].mappedName).to.eql(null);
      expect(matchedFiedls[2].mappedName).to.eql(null);
      expect(matchedFiedls[3].mappedName).to.eql('first_name');
      expect(matchedFiedls[4].mappedName).to.eql('last_name');
      expect(matchedFiedls[5].mappedName).to.eql('company');

    });

     it('matchSmart but header not enabled', () => {
      
      MappingComponent.hasHeader=false;

      expect(MappingComponent.hasHeader).to.equal(false);

      let matchedFiedls=MappingComponent.matchSmart();
      expect(matchedFiedls).to.equal(null);

    });

    it('matchSmart just must apply to contact fields that have a checkbox (isKey property)', () => {

      MappingComponent.setStateParams({
        name:'testListName',
        settings:{ 
              csvData: mockCSV, 
              listDeleteSettings:mockDeleteSettigs 
        }      
      });
      
      MappingComponent.hasHeader=true;

      expect(MappingComponent.hasHeader).to.equal(true);

      MappingComponent.contactFields = [
        {'name': 'number1' ,mappedName:null, isKey:false},      
        {'name': 'number2' ,mappedName:null , isKey:true },      
        {'name': 'number3',mappedName:null , isKey:true  },
        {'name': 'first_name',mappedName:null , isKey:false },
        {'name': 'first_name',mappedName:null },
        {'name': 'first_name',mappedName:null },
        {'name': 'last_name' ,mappedName:null, isKey:true },
        {'name': 'last_name' ,mappedName:null },
        {'name': 'company' ,mappedName:null ,isKey:false }
      ];

      let matchedFiedls=MappingComponent.matchSmart();
      expect(matchedFiedls[3].name).to.eql('first_name');
      expect(matchedFiedls[3].mappedName).to.eql('first_name');
      expect(matchedFiedls[4].name).to.eql('first_name');
      expect(matchedFiedls[4].mappedName).to.equal(null);
      expect(matchedFiedls[6].name).to.eql('last_name');
      expect(matchedFiedls[6].mappedName).to.eql('last_name');
      expect(matchedFiedls[8].mappedName).to.eql('company');    

    });


  });
  
 // TODO: Solve problem with lodash(_.filter)
/*describe('#nextStep', () => {

    it('Show message if no have key fields', () => {
      
      MappingComponent.contactFields = [
        {'name': 'number1', 'isKey': false },
        {'name': 'number2', 'isKey': false },
        {'name': 'number3', 'isKey': false },
        {'name': 'first_name', 'isKey': false},
        {'name': 'last_name', 'isKey': false},
        {'name': 'company', 'isKey': false}
      ];

      MappingComponent.nextStep();
      expect(MappingComponent.message.type).to.equal('warning');
      expect(MappingComponent.message.show).to.equal(true);
      expect(MappingComponent.message.text).to.equal('At least one field must be marked as key');
    });

    it('Show message if have more than 12 key fields', () => {
      
      MappingComponent.contactFields = [
        {'name': 'number1', 'isKey': false },
        {'name': 'number2', 'isKey': false },
        {'name': 'number3', 'isKey': false },
        {'name': 'first_name', 'isKey': false },
        {'name': 'last_name', 'isKey': false },
        {'name': 'company', 'isKey': false },
        {'name': 'last_sms', 'isKey': false },
        {'name': 'url', 'isKey': false },
        {'name': 'test1', 'isKey': false },
        {'name': 'test2', 'isKey': false },
        {'name': 'test3', 'isKey': false },
        {'name': 'test4', 'isKey': false },
        {'name': 'test5', 'isKey': true }
      ];

      MappingComponent.nextStep();
      expect(MappingComponent.message.type).to.equal('warning');
      expect(MappingComponent.message.show).to.equal(true);
      expect(MappingComponent.message.text).to.equal('No more than 12 fields can be marked as key');

    });

    it('Return data to send to next step when is updating', () => {
      
      MappingComponent.contactFields = [
        {'name': 'number1', 'isKey': true },
        {'name': 'number2', 'isKey': false },
        {'name': 'number3', 'isKey': false },
        {'name': 'first_name', 'isKey': true},
        {'name': 'last_name', 'isKey': true},
        {'name': 'company', 'isKey': false},
        {'name': 'street', 'isKey': false },
        {'name': 'city', 'isKey': false },
        {'name': 'state', 'isKey': false },
        {'name': 'Zip', 'isKey': false},
        {'name': 'Balance', 'isKey': false},
        {'name': 'Product', 'isKey': false},
        {'name': 'salesforce_id', 'isKey': true },
        {'name': 'thread_url', 'isKey': false },
        {'name': 'Dial Status', 'isKey': false },
        {'name': 'email', 'isKey': false},
        {'name': 'Widgets', 'isKey': false},
        {'name': 'sms_body', 'isKey': false},
        {'name': 'short_code', 'isKey': false },
        {'name': 'date_received', 'isKey': false },
        {'name': 'last_disposition', 'isKey': false },
        {'name': 'last_agent', 'isKey': false},
        {'name': 'last_campaign', 'isKey': false },
        {'name': 'last_sms', 'isKey': false}        
      ];

      MappingComponent.nextStep();

      let dataToSendTest = MappingComponent.nextStep();    
      expect(dataToSendTest.fields.length).to.have.lengthOf(24);
      expect(dataToSendTest.fields[0]).to.eql({'name': 'number1', 'isKey': true });    
      expect(dataToSendTest.fields[1]).to.eql({'name': 'number2', 'isKey': false });
      expect(dataToSendTest.fields[2]).to.eql({'name': 'number3', 'isKey': false });
      expect(dataToSendTest.fields[3]).to.eql({'name': 'first_name', 'isKey': true});
      expect(dataToSendTest.fields[4]).to.eql({'name': 'last_name', 'isKey': true});  
      expect(dataToSendTest.fields[5]).to.eql({'name': 'company', 'isKey': false});
      expect(dataToSendTest.fields[6]).to.eql({'name': 'street', 'isKey': false });    
      expect(dataToSendTest.fields[7]).to.eql({'name': 'city', 'isKey': false });
      expect(dataToSendTest.fields[8]).to.eql({'name': 'state', 'isKey': false });
      expect(dataToSendTest.fields[9]).to.eql({'name': 'Balance', 'isKey': false});
      expect(dataToSendTest.fields[10]).to.eql({'name': 'Product', 'isKey': false});  
      expect(dataToSendTest.fields[11]).to.eql({'name': 'salesforce_id', 'isKey': false});
      expect(dataToSendTest.fields[12]).to.eql({'name': 'thread_url', 'isKey': false });    
      expect(dataToSendTest.fields[13]).to.eql({'name': 'Dial Status', 'isKey': false });
      expect(dataToSendTest.fields[14]).to.eql({'name': 'email', 'isKey': false });
      expect(dataToSendTest.fields[15]).to.eql({'name': 'Widgets', 'isKey': false});
      expect(dataToSendTest.fields[16]).to.eql({'name': 'sms_body', 'isKey': false});  
      expect(dataToSendTest.fields[17]).to.eql({'name': 'short_code', 'isKey': false});
      expect(dataToSendTest.fields[18]).to.eql({'name': 'date_received', 'isKey': false });    
      expect(dataToSendTest.fields[19]).to.eql({'name': 'last_disposition', 'isKey': false });
      expect(dataToSendTest.fields[20]).to.eql({'name': 'last_agent', 'isKey': false });
      expect(dataToSendTest.fields[21]).to.eql({'name': 'last_campaign', 'isKey': false});
      expect(dataToSendTest.fields[22]).to.eql({'name': 'last_sms', 'isKey': false});  
      expect(dataToSendTest.fields[23]).to.eql({'name': 'company', 'isKey': false});
    }); 

    it('Return data to send to next step when is deleting', () => {
      
      MappingComponent.contactFields = [
        {'name': 'number1', 'isKey': true },
        {'name': 'number2', 'isKey': false },
        {'name': 'number3', 'isKey': false },
        {'name': 'first_name', 'isKey': true},
        {'name': 'last_name', 'isKey': true},
        {'name': 'company', 'isKey': false},
        {'name': 'street', 'isKey': false },
        {'name': 'city', 'isKey': false },
        {'name': 'state', 'isKey': false },
        {'name': 'Zip', 'isKey': false},
        {'name': 'Balance', 'isKey': false},
        {'name': 'Product', 'isKey': false},
        {'name': 'salesforce_id', 'isKey': true },
        {'name': 'thread_url', 'isKey': false },
        {'name': 'Dial Status', 'isKey': false },
        {'name': 'email', 'isKey': false},
        {'name': 'Widgets', 'isKey': false},
        {'name': 'sms_body', 'isKey': false},
        {'name': 'short_code', 'isKey': false },
        {'name': 'date_received', 'isKey': false },
        {'name': 'last_disposition', 'isKey': false },
        {'name': 'last_agent', 'isKey': false},
        {'name': 'last_campaign', 'isKey': false },
        {'name': 'last_sms', 'isKey': false}        
      ];

      MappingComponent.nextStep();

      let dataToSendTest = MappingComponent.nextStep();    
      expect(dataToSendTest.fields.length).to.have.lengthOf(4);
      expect(dataToSendTest.fields[0]).to.eql({'name': 'number1', 'isKey': true });    
      expect(dataToSendTest.fields[1]).to.eql({'name': 'first_name', 'isKey': true});
      expect(dataToSendTest.fields[2]).to.eql({'name': 'last_name', 'isKey': true});
      expect(dataToSendTest.fields[3]).to.eql({'name': 'salesforce_id', 'isKey': true});
    });

  });*/

 describe('#clearMapping', () => {

    it('all sourceFields values should be null', () => {
      
      MappingComponent.contactFields = [
        {'name': 'number1' , mappedName:null , mappedIndex:0 },
        {'name': 'number2' , mappedName:null , mappedIndex:0 },
        {'name': 'number3' , mappedName:null , mappedIndex:0 },
        {'name': 'first_name' , mappedName:null , mappedIndex:0 },
        {'name': 'last_name' , mappedName:null , mappedIndex:0 },
        {'name': 'company' , mappedName:null , mappedIndex:0 }
      ];

      MappingComponent.clearMapping();
      let checkNullSources=MappingComponent.contactFields.every(el=>(el.mappedName===null && el.mappedIndex===0));
      expect(checkNullSources).to.equal(true);      
   });


  });


// TODO: Solve problem with lodash(_.filter)
/*
 describe('#finishMap', () => {

  it('contacts fields key valids and send delete settings', () => {

      MappingComponent.contactFields = [       
        {name: 'number2',mappedName: 'llave2',isKey:true},
        {name: 'number3',mappedName: null },
        {name: 'first_name',mappedName: 'first_name'},
        {name: 'last_name',mappedName: 'last_name',isKey:true},
        {name: 'company',mappedName: 'company'}
      ];     
      
      let resultFinish=MappingComponent.finishMap();

      let headerFields=resultFinish.resultMapping.headerFields;
      let rows=resultFinish.resultMapping.rows;
      let fieldsMapping=resultFinish.fieldsMapping;


      expect(resultFinish.listDeleteSettings).to.not.equal(null);
      expect(undefined).to.equal(resultFinish.listUpdateSettings); 
      expect(resultFinish.listDeleteSettings).to.eql(mockDeleteSettigs);  

      expect(headerFields).to.have.lengthOf(2);
      expect(resultFinish.resultMapping.keys).to.eql(['number2','company']);
     

      expect(headerFields).to.have.lengthOf(4);
      
      expect(headerFields[0].name).to.equal('number2');
      expect(headerFields[1].name).to.equal('first_name');
      expect(headerFields[2].name).to.equal('last_name');
      expect(headerFields[3].name).to.equal('company');

      expect(fieldsMapping).to.have.lengthOf(4);
      expect(fieldsMapping[0]).to.eql({columnNumber:2,fieldName:'number2',key:true});
      expect(fieldsMapping[1]).to.eql({columnNumber:3,fieldName:'first_name',key:false});
      expect(fieldsMapping[2]).to.eql({columnNumber:4,fieldName:'last_name',key:true});
      expect(fieldsMapping[3]).to.eql({columnNumber:5,fieldName:'company',key:false});
      
      expect(rows).to.have.lengthOf(7);
      expect(rows[0]).to.eql({number2:'','first_name':'Josue','last_name':'Mancilla','company':'Sinapsysit'});
      expect(rows[1]).to.eql({number2:'5535632212','first_name':'Ken','last_name':'Osborn','company':'Five9'});
      expect(rows[2]).to.eql({number2:'','first_name':'Brandon','last_name':'Peto','company':'none'});

   });


  it('contacts fields key invalid, return false', () => {

      MappingComponent.contactFields = [       
        {name: 'number2',mappedIndex:0,isKey:true},
        {name: 'number3',mappedIndex: 0},
        {name: 'first_name',mappedIndex:0, isKey:true},
        {name: 'last_name',mappedIndex: 2},
        {name: 'company',mappedIndex: 1}
      ];     
      expect(MappingComponent.finishMap()).to.equal(null);
      expect(this.message.show).to.equal(true);
      expect(this.message.text).to.equal('Contact Fields "number2 ,  first_name" are marked as keys but has no mapped source field/index');
      expect(this.message.expires).to.equal(8000);
   });

  });

  it('all multiple mapped fields from a key number must be mapped to Soruce Index', () => {
      MappingComponent.contactFields = [       
        {name: 'number2',mappedIndex:2,isKey:true},
        {name: 'number2',mappedIndex:4},
        {name: 'number2',mappedIndex:0},
        {name: 'number3',mappedIndex: 0},
        {name: 'first_name',mappedIndex:2, isKey:true},
        {name: 'last_name',mappedIndex: 2},
        {name: 'company',mappedIndex: 0, isKey:true}

      ];     
      expect(MappingComponent.finishMap()).to.equal(null);
      expect(this.message.show).to.equal(true);
      expect(this.message.text).to.equal('Contact Fields "number2 ,  company" are marked as keys but has no mapped source field/index');
      expect(this.message.expires).to.equal(8000);
  });

  it('all multiple mapped fields from a key number must be mapped to Source Field', () => {
      MappingComponent.contactFields = [       
        {name: 'number2',mappedName: null,isKey:true},
        {name: 'number3',mappedName: null },
        {name: 'first_name',mappedName: 'first_name'},
        {name: 'last_name',mappedName: 'last_name',isKey:true},
        {name: 'last_name',mappedName: null},
        {name: 'last_name',mappedName: null},
        {name: 'company',mappedName: 'company'}

      ];     
      expect(MappingComponent.finishMap()).to.equal(null);
      expect(this.message.show).to.equal(true);
      expect(this.message.text).to.equal('Contact Fields "number2 ,  last_name" are marked as keys but has no mapped source field/index');
      expect(this.message.expires).to.equal(8000);
  });


  it('multiple fields should be unique in headersFields', () => {
      MappingComponent.contactFields = [       
        {name: 'number2',mappedName: 'llave',isKey:true},
        {name: 'number2',mappedName: 'llave2'},
        {name: 'number3',mappedName: null },
        {name: 'first_name',mappedName: 'first_name'},
        {name: 'last_name',mappedName: 'last_name'},
        {name: 'last_name',mappedName: 'company'},
        {name: 'last_name',mappedName: 'first_name'},
        {name: 'company',mappedName: 'company'}
      ];     
     
      let resultFinish=MappingComponent.finishMap();
      
      expect(resultFinish.resultMapping.headerFields).to.equal([       
        {name: 'number2',mappedName: 'llave',isKey:true},       
        {name: 'first_name',mappedName: 'first_name'},
        {name: 'last_name',mappedName: 'last_name'},      
        {name: 'company',mappedName: 'company'}
      ]);

      expect(this.message.expires).to.equal(8000);
  });



  it('When there is no keys selected in mapping, should show a message warning', () => {
     
      MappingComponent.contactFields = [       
        {name: 'number2',mappedName: 'llave',isKey:false},
        {name: 'number2',mappedName: 'llave2',isKey:false},
        {name: 'number3',mappedName: null ,isKey:false},
        {name: 'first_name',mappedName: 'first_name',isKey:false},
        {name: 'last_name',mappedName: 'last_name',isKey:false},
        {name: 'last_name',mappedName: 'company'},
        {name: 'last_name',mappedName: 'first_name'},
        {name: 'company',mappedName: 'company',isKey:false}
      ];     
     
      let resultFinish=MappingComponent.finishMap();
      
      expect(resultFinish).to.equal(null);

      expect(this.message.expires).to.equal(8000);
      expect(this.message.text).to.equal('At least one field must be marked as key');
      expect(this.message.type).to.equal('warning');

  });



  it('When there is is a mapped field but none key is selected ', () => {
     
      MappingComponent.contactFields = [       
        {name: 'number2',mappedName: null,isKey:false},
        {name: 'number2',mappedName: 'llave2',isKey:false},
        {name: 'number3',mappedName: null ,isKey:false},
        {name: 'first_name',mappedName: null,isKey:false},
        {name: 'last_name',mappedName: null,isKey:false},
        {name: 'last_name',mappedName: null},
        {name: 'last_name',mappedName:null},
        {name: 'company',mappedName:null,isKey:false}
      ];     
     
      let resultFinish=MappingComponent.finishMap();
      
      expect(resultFinish).to.equal(null);

      expect(this.message.expires).to.equal(8000);
      expect(this.message.text).to.equal('At least one source fields should be mapped to Contact Field');
      expect(this.message.type).to.equal('warning');

  });

 describe('#addMappingItem',()=>{
    it('A contact field that exists should be added to list',()=>{
        MappingComponent.contactFields = [
          {'name': 'number1' , mappedName:null , mappedIndex:0 },
          {'name': 'number2' , mappedName:null , mappedIndex:0 },
          {'name': 'number3' , mappedName:null , mappedIndex:0 },
          {'name': 'first_name' , mappedName:null , mappedIndex:0 },
          {'name': 'last_name' , mappedName:null , mappedIndex:0 },
          {'name': 'company' , mappedName:null , mappedIndex:0 }
        ];

        MappingComponent.contactFieldSelectedName='first_name';
        expect(MappingComponent.contactFields).to.have.lengthOf(6);
        expect(MappingComponent.addMappingItem()).to.equal(3);
        expect(MappingComponent.contactFields).to.have.lengthOf(7);
    });

    it('A contact field that does not exists should be added to list at first position',()=>{
        MappingComponent.contactFields = [
          {'name': 'number1' , mappedName:null , mappedIndex:0 },
          {'name': 'number2' , mappedName:null , mappedIndex:0 },
          {'name': 'number3' , mappedName:null , mappedIndex:0 },        
          {'name': 'last_name' , mappedName:null , mappedIndex:0 },
          {'name': 'company' , mappedName:null , mappedIndex:0 }
        ];

        MappingComponent.contactFieldSelectedName='first_name';
        expect(MappingComponent.contactFields).to.have.lengthOf(5);
        expect(MappingComponent.addMappingItem()).to.equal(-1);
        expect(MappingComponent.contactFields).to.have.lengthOf(6);
        expect(MappingComponent.contactFields[0].name).to.equal('first_name');
    });


  describe('Support more formats in phone numbers',function(){

      beforeEach(
        inject(function ($componentController, $rootScope, $httpBackend, $stateParams, $window, _ContactFieldsService_, appConfig,_lodash_) {

        scope = $rootScope.$new();
        _$httpBackend = $httpBackend;
        contactFieldService = _ContactFieldsService_;
        window = $window;
        lodash=_lodash_; 

        if (appConfig.apiUri) {
          endPointUrl = appConfig.apiUri + '/f9/contactfields';
        } 
        
        let mockCSV=`
        number1
        202-555-0128
        (978)8874514
        +1-541-754-3010
        (011)663342346742
        011-87859302098742
        555.322.4432
        933----643---------889348232
        some name 3384023456
        582-4285829 asdaf23
        764----643….8893
        33----643 -s.4124
        011---233-5532245223
        332SDE3953-563
        `;

        MappingComponent = $componentController('al.lists.mapping', {    
          $stateParams: {
            settings: 
            { 
              csvData: mockCSV, 
              listDeleteSettings:mockDeleteSettigs 
            } 
          },
          $window: window,
          ContactFieldsService: contactFieldService,
          lodash:lodash
        });

        _$httpBackend.whenGET(url => (url.indexOf('.html') !== -1)).respond(200);
      }));

      it('Number Phones with non numeric characters should be cleaned and validated',()=>{      
          MappingComponent.contactFields = [          
            {'name': 'number1' , mappedName:number1 , mappedIndex:0 },
            {'name': 'number2' , mappedName:null , mappedIndex:0 },
            {'name': 'number3' , mappedName:null , mappedIndex:0 },        
            {'name': 'last_name' , mappedName:null , mappedIndex:0 },
            {'name': 'company' , mappedName:null , mappedIndex:0 }
          ];       


        let resultFinish=MappingComponent.finishMap();
        let rows=resultFinish.resultMapping.rows;
        expect(rows).to.have.lengthOf(7);
        expect(rows[0]).to.eql({number1:'2025550128'});
        expect(rows[1]).to.eql({number1:'9788874514'});
        expect(rows[2]).to.eql({number1:'011663342346742'});
        expect(rows[3]).to.eql({number1:'01187859302098742'});
        expect(rows[4]).to.eql({number1:'3384023456'});
        expect(rows[5]).to.eql({number1:'7646438893'});
        expect(rows[6]).to.eql({number1:'0112335532245223'});      
      });
  });
  describe('Support more formats in phone numbers in 2 columns of CSV',function(){

      beforeEach(
        inject(function ($componentController, $rootScope, $httpBackend, $stateParams, $window, _ContactFieldsService_, appConfig,_lodash_) {

        scope = $rootScope.$new();
        _$httpBackend = $httpBackend;
        contactFieldService = _ContactFieldsService_;
        window = $window;
        lodash=_lodash_; 

        if (appConfig.apiUri) {
          endPointUrl = appConfig.apiUri + '/f9/contactfields';
        } 
        
        let mockCSV=`
          number1,number2
          202-555-0128,978-8874950
          (978)8874514,(978)80874514
          +1-541-754-3010,842167239
          (011)663342346742,9632587410
          011-87859302098742,
          555.322.4432,978-8874987
          764----643….8893,01196325874102
          33----6343 -s.4124,011963258741024
        `;

        MappingComponent = $componentController('al.lists.mapping', {    
          $stateParams: {
            settings: 
            { 
              csvData: mockCSV, 
              listDeleteSettings:mockDeleteSettigs 
            } 
          },
          $window: window,
          ContactFieldsService: contactFieldService,
          lodash:lodash
        });

        _$httpBackend.whenGET(url => (url.indexOf('.html') !== -1)).respond(200);
      }));

      it('Number Phones with non numeric characters should be cleaned and validated',()=>{      
          MappingComponent.contactFields = [          
            {'name': 'number1' , mappedName:'number1' , mappedIndex:0 },
            {'name': 'number2' , mappedName:'number2' , mappedIndex:0 }        
          ];       

          let resultFinish=MappingComponent.finishMap();
          let rows=resultFinish.resultMapping.rows;
          expect(rows).to.have.lengthOf(7);
          
          expect(rows[0]).to.eql({'number1':'2025550128','number2':'9788874950'});
          expect(rows[1]).to.eql({'number1':'9788874514','number2':'97880874514'});
          expect(rows[2]).to.eql({'number1':'011663342346742','number2':'9632587410'});
          expect(rows[3]).to.eql({'number1':'01187859302098742','number2':''});
          expect(rows[4]).to.eql({'number1':'5553224432','number2':'9788874987'});
          expect(rows[5]).to.eql({'number1':'7646438893','number2':'01196325874102'});
          expect(rows[6]).to.eql({'number1':'3363434124','number2':'011963258741024'});      

      });
  });

});
*/
 describe('#removeSelectedItem', () => {
    it('remove selected item from table', () => {
      MappingComponent.selectedRow=3;
      MappingComponent.contactFields = [
        {'name': 'number1' , mappedName:null , mappedIndex:0 },
        {'name': 'number2' , mappedName:null , mappedIndex:0 },
        {'name': 'number3' , mappedName:null , mappedIndex:0 },
        {'name': 'first_name' , mappedName:null , mappedIndex:0 },
        {'name': 'last_name' , mappedName:null , mappedIndex:0 },
        {'name': 'company' , mappedName:null , mappedIndex:0 }
      ];

      expect(MappingComponent.contactFields).to.have.lengthOf(6);    
      expect(MappingComponent.removeSelectedItem()).to.equal(true);
      expect(MappingComponent.selectedRow).to.equal(-1);
      expect(MappingComponent.contactFields).to.have.lengthOf(5);  

 
   });


    it('remove selected item, that is repeated', () => {
      MappingComponent.selectedRow=0;
      MappingComponent.contactFields = [
        {'name': 'number1' , mappedName:null , mappedIndex:0 , isKey:false},
        {'name': 'number1' , mappedName:null , mappedIndex:0},
        {'name': 'number1' , mappedName:null , mappedIndex:0},
        {'name': 'number1' , mappedName:null , mappedIndex:0},
        {'name': 'number1' , mappedName:null , mappedIndex:0}
      ];

      expect(MappingComponent.contactFields).to.have.lengthOf(5);    
      expect(MappingComponent.removeSelectedItem()).to.equal(true);
      expect(MappingComponent.selectedRow).to.equal(-1);
      expect(MappingComponent.contactFields).to.have.lengthOf(4);  
      expect(MappingComponent.contactFields).to.eql([
        {'name': 'number1' , mappedName:null , mappedIndex:0, isKey:false},
        {'name': 'number1' , mappedName:null , mappedIndex:0},
        {'name': 'number1' , mappedName:null , mappedIndex:0},
        {'name': 'number1' , mappedName:null , mappedIndex:0}
      ]); 


      MappingComponent.selectedRow=2;
      expect(MappingComponent.removeSelectedItem()).to.equal(true);
        expect(MappingComponent.contactFields).to.eql([
        {'name': 'number1' , mappedName:null , mappedIndex:0, isKey:false},
        {'name': 'number1' , mappedName:null , mappedIndex:0},
        {'name': 'number1' , mappedName:null , mappedIndex:0}
      ]); 
      expect(MappingComponent.contactFields).to.have.lengthOf(3);  

   });


   it('cat remove selected item from table', () => {

      MappingComponent.selectedRow=10;
      
      MappingComponent.contactFields = [
        {'name': 'number1' , mappedName:null , mappedIndex:0 },
        {'name': 'number2' , mappedName:null , mappedIndex:0 },
        {'name': 'number3' , mappedName:null , mappedIndex:0 },
        {'name': 'first_name' , mappedName:null , mappedIndex:0 },
        {'name': 'last_name' , mappedName:null , mappedIndex:0 },
        {'name': 'company' , mappedName:null , mappedIndex:0 }
      ];

      expect(MappingComponent.contactFields).to.have.lengthOf(6);    
      expect(MappingComponent.removeSelectedItem()).to.equal(false);      
      expect(MappingComponent.contactFields).to.have.lengthOf(6);    
 
   });

  });


});
