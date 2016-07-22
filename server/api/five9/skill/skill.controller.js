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
import service from '../../../infrastructure/servicecall';
import cache from '../../../infrastructure/cachehandler';
/* test-code */
import util from 'util';
/* end-test-code */


// Gets a list of Skills
export function index(req, res) {
    var params = { skillNamePattern: '' };
    return cache.getCache('')
        .then(data => {
            if (data === null)
                return service.f9CallService('getSkills', params, 'in', req);
            throw new Error('Unnexpected result yet');
        })
        .then(service.respondWithResult(res))
        .catch(service.handleError(res));
}

// Gets a list of Skills Info
export function skillsInfo(req, res) {
    var params = { skillNamePattern: '' };
    return cache.getCache('')
        .then(data => {
            if (data === null)
                return service.f9CallService('getSkillsInfo', params, 'in', req);
            throw new Error('Unnexpected result yet');
        })
        .then(service.respondWithResult(res))
        .catch(service.handleError(res));
}


// Gets a single Skill
export function show(req, res) {
    var params = { 'skillName': req.params.skillname };
    return service.f9CallService('getSkillInfo', params, '', req)
        .then(service.respondWithResult(res))
        .catch(service.handleError(res));
}

// Creates a new Skill
export function create(req, res) {
    var params = {
        skillInfo: {
            skill: req.body
        }
    };
    return service.f9CallService('createSkill', params, '', req)
        .then(service.respondWithResult(res))
        .catch(service.handleError(res));
}

// Updates an existing Skill in the DB
export function update(req, res) {
    var params = { skill: req.body };
    return service.f9CallService('modifySkill', params, '', req)
        .then(service.respondWithResult(res))
        .catch(service.handleError(res));
}

// Deletes a Skill from the DB
export function destroy(req, res) {
    var params = { skillName: req.params.skillname };


    return service.f9CallService('deleteSkill', params, '', req)
        .then(service.respondWithResult(res, 204))
        .catch(service.handleError(res));
}
