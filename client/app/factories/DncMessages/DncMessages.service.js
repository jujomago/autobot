'use strict';


function DncMessagesService() {

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
    return {
        getMessage(code){
            return ErrorMessages[code.toUpperCase()];
        }
    };
}

angular.module('fakiyaMainApp')
    .factory('DncMessages', DncMessagesService);