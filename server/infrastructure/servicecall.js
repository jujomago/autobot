'use strict';

import _ from 'lodash';
import soap from 'soap';
import bluebird from 'bluebird';
/* test-code */
import util from 'util';
/* end-test-code */

var defaultSoapCallSettings = {
    //serviceType: 'SOAP', //REST
    soapUrl: '',
    soapOptions: {},
    soapCredentials: null,
    soapMethod: '',
    soapParams: {}
};

var callService = function (options) {
    let settings = _.merge({}, defaultSoapCallSettings, options);

    return soap.createClientAsync(settings.soapUrl, settings.soapOptions)
        .then(client => {
            if (settings.soapCredentials)
                client.setSecurity(settings.soapCredentials);
            else throw new Error('It is required the soap credentials');

            if (settings.soapMethod && settings.soapMethod.length > 0)
                if (typeof client[settings.soapMethod] === "function") {
                    return new Promise(function (resolve, reject) {
                        client[settings.soapMethod](settings.soapParams, (err, result) => {
                            if (err !== null) {
                                console.log(settings.soapMethod + ' with error' + err);
                                reject(err)
                            } else {
                                console.log(settings.soapMethod + ' without error');
                                resolve(result);
                            }
                        });
                    });
                }
                else throw new Error('There is no ' + settings.soapMethod + ' method in the proxy');
            else throw new Error('There is no method name specified');
        });
};

var f9CallService = function (methodName, params, direction, req) {
    var options = {
        soapUrl: req.partnerCretentials.soap.wsdlUri + req.partnerCretentials.username,
        soapOptions: req.partnerCretentials.soap.options,
        soapCredentials: new soap.BasicAuthSecurity(req.partnerCretentials.username, req.partnerCretentials.passwd),
        soapMethod: methodName,
        soapParams: params
    }
    /* test-code */
    console.log('Calling method =' + methodName + ' with params =' + util.inspect(params, { showHidden: false, depth: null }));
    console.log('Calling with options =' +util.inspect(req.partnerCretentials.soap.options, { showHidden: false, depth: null }));
    /* end-test-code */
    
    return callService(options);
};

var respondWithResult = function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
        res.status(statusCode).json(entity);
    };
}

var handleError = function handleError(res, statusCode, errTitle) {
    statusCode = statusCode || 500;
    return function (err) {
        if (err.statusCode) {
            statusCode = err.statusCode;
        }
        res.status(statusCode).send({
            from: errTitle? errTitle: 'Generic Handling Error ',
            body: err.body || err + "",
            statusCode: statusCode
        });
    };
}

exports.callService = callService;
exports.f9CallService = f9CallService;
exports.respondWithResult = respondWithResult;
exports.handleError = handleError;
