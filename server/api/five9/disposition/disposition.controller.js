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

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
        res.status(statusCode).json(entity);
    };
}

function handleError(res, statusCode) {
    console.log('handleError');
    statusCode = statusCode || 500;
    return function (err) {
    
        if (err.statusCode) {
           statusCode = err.statusCode;
        }
       

        res.status(statusCode).send({
            from: 'Error from Disposition Controller EndPoint',
            body: err.body || err+"",
            statusCode: statusCode
        });
    };
}
// Gets a list of Dispositions
export function index(req, res) {
  console.log('SERVER test')
  var params = {}
  return service.f9CallService('getDispositions', params, '', req)
      .then(data => {
          res.status(200).json(data);
      })
      .catch(handleError(res));
}
// Create a Disposition from the API
export function create(req, res) {
  var params = {disposition: req.body};
  console.log(params);
  return service.f9CallService('createDisposition', params, '', req)
      .then(respondWithResult(res,201))
      .catch(handleError(res));
}
// Update a Disposition from the API
export function update(req, res) {
  var paramsRename={dispositionName: req.body.oldName, dispositionNewName: req.body.name};
  var params ={disposition: req.body};
  
  if(req.body.oldName===req.body.name){
    return service.f9CallService('modifyDisposition', params, '', req)
    .then(respondWithResult(res,200))
    .catch(handleError(res));
  }
  else{
    return service.f9CallService('renameDisposition', paramsRename, '', req)
          .then(result => {
            return service.f9CallService('modifyDisposition', params, '', req);        
          })
        .then(respondWithResult(res,200))
        .catch(handleError(res));
  }
  
}
export function show(req, res) {
  var params ={dispositionName: req.params.dispositionName};
  return service.f9CallService('getDisposition', params, '', req)
      .then(respondWithResult(res,200))
      .catch(handleError(res));
}
// Deletes a Disposition from the API
export function destroy(req, res) {
    var params = { dispositionName: req.params.dispositionName };
    return service.f9CallService('removeDisposition', params, '', req)
        .then(respondWithResult(res, 204))
        .catch(handleError(res,403));
}