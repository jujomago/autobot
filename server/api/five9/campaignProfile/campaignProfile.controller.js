/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/campaignProfiles              ->  index
 */

'use strict';

import _ from 'lodash';
import soap from 'soap';
import service from '../../../infrastructure/servicecall'

// Gets a list of CampaignProfiles
export function index(req, res) {
  var params ={};
  return service.f9CallService('getCampaignProfiles', params, '', req)
      .then(service.respondWithResult(res,200))
      .catch(service.handleError(res));
}
// Deletes a CampaignProfile from the API
export function destroy(req, res) {
    var params = { profileName: req.params.profileName };
    return service.f9CallService('deleteCampaignProfile', params, '', req)
        .then(service.respondWithResult(res, 204))
        .catch(service.handleError(res));
}