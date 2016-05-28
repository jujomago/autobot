/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/f9/skills              ->  index
 * POST    /api/f9/skills              ->  create
 * GET     /api/f9/skills/:id          ->  show
 * PUT     /api/f9/skills/:id          ->  update
 * DELETE  /api/f9/skills/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import soap from 'soap';
import service from '../../../infrastructure/servicecall'
import cache from '../../../infrastructure/cachehandler'

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
        if (entity) {
            res.status(statusCode).json(entity);
        }
    };
}

function handleError(res, statusCode) {
    console.log('enter handle error skill controller with statuscode=' + statusCode);
    //console.log(res);
    statusCode = statusCode || 500;
    return function (err) {
        console.log('err content ' + err);
        if (err.statusCode) {
            console.error("/////////// ERROR STATUSCODE FROM SKILL CONTROLLER //// ==>: " + err.statusCode);
            statusCode = err.statusCode;
        }
        if (err.body) {
            console.error("///////////// ERROR BODY FROM SKILL CONTROLLER ////////////////////////////");
            console.error(err.body);
            console.error("///////////////////////////////////////////////////////////////");
        }

        res.status(statusCode).send(err);
    };
}

// Gets a list of Skills
export function index(req, res) {
    let soapCredentials = new soap.BasicAuthSecurity(req.partnerCretentials.username, req.partnerCretentials.passwd);
    let soapUrl = req.partnerCretentials.soap.wsdlUri + req.partnerCretentials.username;
    let soapOptions = req.partnerCretentials.soap.options;

    var params = { skillNamePattern: '' };
    console.log('Modifying get skills with f9callservice');
    return cache.getCache('')
        .then(data => {
            if (data === null)
                return service.f9CallService('getSkills', params, 'in', req);
            throw new Error('Unnexpected result yet');
        })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(handleError(res));
}

// Gets a single Skill
export function show(req, res) {
    var params = { 'skillName': req.params.skillname };
    return service.f9CallService('getSkillInfo', params, '', req)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(handleError(res));
}

// Creates a new Skill
export function create(req, res) {
    var params = {
        skillInfo: {
            skill: req.body
        }
    };
    return service.f9CallService('createSkill', params, '', req)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(handleError(res));
}

// Updates an existing Skill in the DB
export function update(req, res) {
    var params = { skill: req.body };
    return service.f9CallService('modifySkill', params, '', req)
        .then(data => {
            //console.log('in create');
            //console.log(JSON.stringify(data));
            res.status(200).json(data);
        })
        .catch(handleError(res));
}

// Deletes a Skill from the DB
export function destroy(req, res) {
    var params = { skillName: req.params.skillname };


    return service.f9CallService('deleteSkill', params, '', req)
        .then(data => {
            res.status(204).send(data);
        })
        .catch(handleError(res));
}
