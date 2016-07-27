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


// Gets a list of Lists
export function index(req, res) {
  var params = {};
  return service.f9CallService('getListsInfo', params, '', req)
      .then(data => {
          res.status(200).json(data);
      })
      .catch(service.handleError(res));
}
// Gets a list
export function show(req, res) {
  var params = {listNamePattern: req.params.listName};
  return service.f9CallService('getListsInfo', params, '', req)
      .then(data => {
          data=(data!==null && data.return.length<2)? data : null;
          if(data!==null){
            data.return=data.return[0];
          }
          res.status(200).json(data);
      })
      .catch(service.handleError(res));
}
//Create new List
export function getContacts(req, res) {
  var params = {};
  return service.f9CallService('getContactRecords', params, '', req)
      .then(data => {
          res.status(200).json(data);
      })
      .catch(service.handleError(res));
}
//Create new List
export function createList(req, res) {
  var params = {listName: req.body.listName};
  return service.f9CallService('createList', params, '', req)
      .then(data => {
          res.status(201).json(data);
      })
      .catch(service.handleError(res));
}
//Create contact for list
export function createContactForList(req, res) {
  var params = req.body;
  return service.f9CallService('addToList', params, '', req)
      .then(data => {
          res.status(201).json(data);
      })
      .catch(service.handleError(res));
}
//Delete contacts from list
export function deleteContactFromList(req, res) {
  var params = req.body;
  return service.f9CallService('deleteFromList', params, '', req)
      .then(data => {
          res.status(200).json(data);
      })
      .catch(service.handleError(res));
}
//Get List Import Result
export function getListImportResult(req, res) {
  var params = {identifier: {identifier: req.params.identifier}};
  return service.f9CallService('getListImportResult', params, '', req)
      .then(data => {
          res.status(200).json(data);
      })
      .catch(service.handleError(res));
}
//Get List Import state
export function isImportRunning(req, res) {
  var params = {identifier: {identifier: req.params.identifier}};
  if(req.query.waitTime){
    params.waitTime = req.query.waitTime;
  }
  return service.f9CallService('isImportRunning', params, '', req)
      .then(data => {
          res.status(200).json(data);
      })
      .catch(service.handleError(res));
}

//Delete a list by the listName
export function destroy(req, res) {
  var params = { listName: req.params.listName };
  return service.f9CallService('deleteList', params, '', req)
      .then(data => {
          res.status(204).json(data);
      })
      .catch(service.handleError(res));
}