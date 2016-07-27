
'use strict';

import _ from 'lodash';
//import {Campaign} from '../../../sqldb';
import service from '../../../infrastructure/servicecall'

//Get contact fields
export function index(req, res) {
  var params = {};
  return service.f9CallService('getContactFields', params, '', req)
      .then(data => {
          res.status(200).json(data);
      })
      .catch(service.handleError(res)); 
}