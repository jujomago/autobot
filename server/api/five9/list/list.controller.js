/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/f9/lists              ->  index
 * POST    /api/f9/lists              ->  create
 * GET     /api/f9/lists/:id          ->  show
 * PUT     /api/f9/lists/:id          ->  update
 * DELETE  /api/f9/lists/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import service from '../../../infrastructure/servicecall'

function respondWithResult(res, statusCode) {
    console.log('respondWithResult');
    statusCode = statusCode || 200;
    return function (entity) {
        console.log('enter func respondWithResult');
        //if (entity) {
        console.log('enter if respondWithResult');
        res.status(statusCode).json(entity);
        // }
    };
}

function handleError(res, statusCode) {
    console.log('handleError');
    statusCode = statusCode || 500;
    return function (err) {
        console.log('enter func handleError');

        if (err.statusCode) {
            console.error("/////////// ERROR STATUS FROM LISTS CONTROLLER //// ==>: " + err.statusCode);
            statusCode = err.statusCode;
        }
        if (err.body) {
            console.error("///////////// ERROR BODY FROM LISTS CONTROLLER ////////////////////////////");
            console.error(err.body);
            console.error("///////////////////////////////////////////////////////////////");
        }

        
        res.status(statusCode).json(err);
    };
}

// Gets a list of Lists
export function index(req, res) {
  console.log('SERVER getListsInfo');
  var params = {};
  return service.f9CallService('getListsInfo', params, '', req)
      .then(data => {
          res.status(200).json(data);
      })
      .catch(handleError(res));
}
//Create new List
export function createList(req, res) {
  console.log('SERVER createList');
  var params = {criteria: [{field: 'listName', value: 'TestAutoboxList'}]};
  return service.f9CallService('getContactRecords', params, '', req)
      .then(data => {
          res.status(200).json(data);
      })
      .catch(handleError(res));
}
//Delete a list by the listName
export function destroy(req, res) {
  console.log('SERVER deleteList');
  var params = { listName: req.params.listName };
  return service.f9CallService('deleteList', params, '', req)
      .then(data => {
          res.status(204).json(data);
      })
      .catch(handleError(res,403));
}