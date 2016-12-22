'use strict';

describe('Service: DncMessages', function() {
    // load the service's module
    beforeEach(module('fakiyaMainApp'));

    // instantiate service
    let DncMessages;
    const ErrorMessages = {
        W: 'US Wireless number – number is not in any DNC database',
        H: 'US Wireless Number or VoIP Number that is also a Valid EBR - overriding an otherwise DNC number',
        L: 'Wireless number in a US state that does not allow telemarketing to wireless numbers, even if manually dialed',
        F: 'Valid EBR and Wireless number in a US state that does not allow telemarketing to wireless numbers, even if manually dialed',
        V: 'Valid EBR, overriding otherwise DNC number that is also a Wireless number in a US state that does not allow telemarketing to wireless numbers, even if manually dialed (States: WY, NJ, TX, LA, and AZ)',
        I: 'Invalid - area code not active, or reserved, or special use phone number pattern',
        M: 'Malformed (number is not 10 digits, etc.)',
        B: 'Blocked',
        P: 'Project DNC or DNF database match',
        D: 'Do not call database match',
        S: 'Disconnected – number matched a disconnected numbers database',
        T: 'Tier C phone company',
        Y: 'VoIP number not in any DNC databases'

    };

    beforeEach(inject(function(_DncMessages_) {
        DncMessages = _DncMessages_;
    }));

    it('getMessage should return the correct message for the status Code', () =>{
        expect(DncMessages.getMessage('w')).to.equal(ErrorMessages.W);
        expect(DncMessages.getMessage('H')).to.equal(ErrorMessages.H);
        expect(DncMessages.getMessage('L')).to.equal(ErrorMessages.L);
        expect(DncMessages.getMessage('f')).to.equal(ErrorMessages.F);
        expect(DncMessages.getMessage('v')).to.equal(ErrorMessages.V);
        expect(DncMessages.getMessage('I')).to.equal(ErrorMessages.I);
        expect(DncMessages.getMessage('M')).to.equal(ErrorMessages.M);
        expect(DncMessages.getMessage('b')).to.equal(ErrorMessages.B);
        expect(DncMessages.getMessage('p')).to.equal(ErrorMessages.P);
        expect(DncMessages.getMessage('d')).to.equal(ErrorMessages.D);
        expect(DncMessages.getMessage('S')).to.equal(ErrorMessages.S);
        expect(DncMessages.getMessage('T')).to.equal(ErrorMessages.T);
        expect(DncMessages.getMessage('Y')).to.equal(ErrorMessages.Y);
    });

    it('getMessage should return a different message for the status Code that is not the same', () =>{
        expect(DncMessages.getMessage('w')).to.not.equal(ErrorMessages.M);
        expect(DncMessages.getMessage('f')).to.not.equal(ErrorMessages.H);

    });

    it('getMessage should return undefined when status code does not exists ', () =>{
        expect(DncMessages.getMessage('Z')).to.equal(undefined);
        expect(DncMessages.getMessage('DDA')).to.equal(undefined);
    });
});
