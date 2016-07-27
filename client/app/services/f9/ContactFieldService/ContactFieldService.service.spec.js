'use strict';

describe('Service: ContactFieldsService', function () {

    // load the service's module
    beforeEach(module('fakiyaMainApp'));

    // instantiate service
    var ContactFieldsService, httpBackend;
    var endPointUrl;

    beforeEach(inject(function (_ContactFieldsService_, $httpBackend, appConfig) {
        ContactFieldsService = _ContactFieldsService_;
        httpBackend = $httpBackend;
        if (appConfig.apiUri) {
            endPointUrl = appConfig.apiUri + '/f9/contactfields';
        }
    }));

    afterEach(function () {
        //httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('#getContactFields', () => {
        it('should return conactact fields', function () {
            httpBackend.whenGET(endPointUrl).respond({
                return: [{
                        'displayAs': 'Long',
                        'mapTo': 'None',
                        'name': 'number1',
                        'system': true,
                        'type': 'PHONE'
                    },
                    {
                        'displayAs': 'Long',
                        'mapTo': 'None',
                        'name': 'number2',
                        'system': true,
                        'type': 'PHONE'
                    }]
            });

            ContactFieldsService.getContactFields().then(cfields => {    
                expect(cfields.data.length).to.equal(2);
                expect(cfields.statusCode).to.equal(200);
                expect(cfields.errorMessage).to.equal(null);
            });
            httpBackend.flush();
        });
    });


});