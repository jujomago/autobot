/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/dispositions              ->  index
 * POST    /api/dispositions              ->  create
 * GET     /api/dispositions/:id          ->  show
 * PUT     /api/dispositions/:id          ->  update
 * DELETE  /api/dispositions/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import service from '../../../infrastructure/servicecall';

// Gets a list of Dispositions
export function index(req, res) {
  console.log('SERVER test')
  var params = {}
  return service.f9CallService('getDispositions', params, '', req)
      .then(data => {
          res.status(200).json(data);
      })
      .catch(service.handleError(res));
}
// Create a Disposition from the API
export function create(req, res) {
  var params = {disposition: req.body};
  console.log(params);
  return service.f9CallService('createDisposition', params, '', req)
      .then(service.respondWithResult(res,201))
      .catch(service.handleError(res));
}
// Update a Disposition from the API
export function update(req, res) {
  var paramsRename={dispositionName: req.body.oldName, dispositionNewName: req.body.name};
  var params ={disposition: req.body};
  
  if(req.body.oldName===req.body.name){
    return service.f9CallService('modifyDisposition', params, '', req)
    .then(service.respondWithResult(res,200))
    .catch(service.handleError(res));
  }
  else{
    return service.f9CallService('renameDisposition', paramsRename, '', req)
          .then(result => {
            return service.f9CallService('modifyDisposition', params, '', req);        
          })
        .then(service.respondWithResult(res,200))
        .catch(service.handleError(res));
  }
  
}
export function show(req, res) {
  var params ={dispositionName: req.params.dispositionName};
  return service.f9CallService('getDisposition', params, '', req)
      .then(service.respondWithResult(res,200))
      .catch(service.handleError(res));
}
// Deletes a Disposition from the API
export function destroy(req, res) {
    var params = { dispositionName: req.params.dispositionName };
    return service.f9CallService('removeDisposition', params, '', req)
        .then(service.respondWithResult(res, 204))
        .catch(service.handleError(res,403));
}
/*
complete structure
{"disposition": {
      "agentMustCompleteWorksheet": false,
      "agentMustConfirm": false,
      "description": "Agent session is terminated before a call is completed. This occurs when during a call the agent is logged out from the system by a supervisor.",
      "name": "Test insert a new disposition",
      "resetAttemptsCounter": false,
      "sendEmailNotification": false,
      "sendIMNotification": false,
      "trackAsFirstCallResolution": false,
      "type": "RedialNumber",
      "typeParameters": {
        "allowChangeTimer": false,
        "attempts": "1",
        "timer": {
          "days": 0,
          "hours": 0,
          "minutes": 0,
          "seconds": 0
        },
        "useTimer": false
      }
    }}


*/