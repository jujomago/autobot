/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/f9/campaigns              ->  index
 * POST    /api/f9/campaigns              ->  create
 * GET     /api/f9/campaigns/:id          ->  show
 * PUT     /api/f9/campaigns/:id          ->  update
 * DELETE  /api/f9/campaigns/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import soap from 'soap';
//import {Campaign} from '../../../sqldb';
import service from '../../../infrastructure/servicecall'
import cache from '../../../infrastructure/cachehandler'




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
            console.error("/////////// ERROR STATUS FROM CAMPAIGN CONTROLLER //// ==>: " + err.statusCode);
            statusCode = err.statusCode;
        }
        if (err.body) {
            console.error("///////////// ERROR BODY FROM CAMPAIGN CONTROLLER ////////////////////////////");
            console.error(err.body);
            console.error("///////////////////////////////////////////////////////////////");
        }

        res.status(statusCode).send({
            from: 'Error from Campaign Controller EndPoint',
            body: err.body || err+"",
            statusCode: statusCode
        });
        //  res.status(statusCode).send(err);
    };
}

// Gets a list of Campaigns
export function index(req, res) {
    console.log('enter list campaigns');

    return cache.getCache('')
        .then(data => {
            if (data === null)
                return service.f9CallService('getCampaigns', {}, 'in', req);
            throw new Error('Unnexpected result yet');
        })
        .then(respondWithResult(res))
        .catch(handleError(res));
}


// Gets a single Campaign, could by inboud,outbound or autodial
export function show(req, res) {
    let params = { campaignName: req.params.campaignName };
    let operation = '';

    switch (req.params.type) {
        case 'outbound':
            operation = 'getOutboundCampaign';
            break;
        case 'inbound':
            operation = 'getInboundCampaign';
            break;
        default:
            operation = 'getAutodialCampaign';
            break;
    }

    return service.f9CallService(operation, params, '', req)
        .then(respondWithResult(res))
        .catch(handleError(res));
}


// Creates a new Out InBound,outbound,Autodial Campaign 
export function create(req, res) {
    let params = { campaign: req.body };
    let operation = '';

    switch (params.campaign.type) {
        case 'outbound':
            operation = 'createOutboundCampaign';
            break;
        case 'inbound':
            params.campaign.defaultIvrSchedule = { scriptName: params.campaign.ivrscript.name };  // required data to craete a campaign
            operation = 'createInboundCampaign';
            break;
        default:
            params.campaign.defaultIvrSchedule = { scriptName: params.campaign.ivrscript.name };  // required data to craete a campaign
            operation = 'createAutodialCampaign';
            break;
    }

    delete params.campaign.type;
    delete params.campaign.ivrscript;

    return service.f9CallService(operation, params, '', req)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}




// Updates an existing Campaign in the DB
export function updateOutBound(req, res) {
   let params = { campaign: req.body };
 
 return service.f9CallService('modifyOutboundCampaign', params, '', req)    
        .then(respondWithResult(res))
        .catch(handleError(res));
}


// Updates an existing Campaign in the DB
export function updateAutoDial(req, res) {
   let params = { campaign: req.body };
   params.campaign.defaultIvrSchedule = { scriptName: params.campaign.ivrscript.name }; 
   delete params.campaign.ivrscript;
        
    return service.f9CallService('modifyAutodialCampaign', params, '', req)    
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Campaign in the DB
export function updateInBound(req, res) {
   let params = { campaign: req.body };
   params.campaign.defaultIvrSchedule = { scriptName: params.campaign.ivrscript.name }; 
   delete params.campaign.ivrscript;
        
    return service.f9CallService('modifyInboundCampaign', params, '', req)    
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Campaign 
export function destroy(req, res) {
    let params = { campaignName: req.params.campaignName };
    return service.f9CallService('deleteCampaign', params, '', req)
        .then(respondWithResult(res, 204))
        .catch(handleError(res));
}

// get IVR Scripts
export function ivrscripts(req, res) {
    return service.f9CallService('getIVRScripts', {}, '', req)    
    .then(respondWithResult(res))
    .catch(handleError(res));
}


export function startCampaign(req, res) {
    let params = { campaignName: req.params.campaignName };
    return service.f9CallService('startCampaign',params , '', req)    
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function stopCampaign(req, res) {
    let params = { campaignName: req.params.campaignName };
    return service.f9CallService('stopCampaign',params , '', req)    
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function getLists(req, res) {
     return service.f9CallService('getListsInfo',{} , '', req)    
    .then(respondWithResult(res)) 
    .catch(handleError(res));
}

export function getDNISList(req, res) {
     return service.f9CallService('getDNISList',{selectUnassigned:true} , '', req)    
    .then(respondWithResult(res)) 
    .catch(handleError(res));
}

export function addDNIS(req, res) {
     let params =  req.body ;
     return service.f9CallService('addDNISToCampaign',params , '', req)    

    .then(respondWithResult(res)) 
    .catch(handleError(res));
}

export function addLists(req, res) {
     let params =  req.body ;
     return service.f9CallService('addListsToCampaign',params , '', req)    
    .then(respondWithResult(res)) 
    .catch(handleError(res));
}

export function getListsForCampaign(req, res) {
     let params = { campaignName: req.params.campaignName };
     return service.f9CallService('getListsForCampaign',params , '', req)    
    .then(respondWithResult(res)) 
    .catch(handleError(res));
}

export function getDNISForCampaign(req, res) {
     let params = { campaignName: req.params.campaignName };
     return service.f9CallService('getCampaignDNISList',params , '', req)    
    .then(respondWithResult(res)) 
    .catch(handleError(res));
}

export function removeListsFromCampaign(req, res) {
     let params =  req.body ;
     return service.f9CallService('removeListsFromCampaign',params , '', req)    
    .then(respondWithResult(res)) 
    .catch(handleError(res));
}

export function removeDNISFromCampaign(req, res) {
     let params =  req.body ;
     return service.f9CallService('removeDNISFromCampaign',params , '', req)    
    .then(respondWithResult(res)) 
    .catch(handleError(res));
}
