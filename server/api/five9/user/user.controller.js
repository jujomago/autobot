/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/f9/users              ->  index
 * POST    /api/f9/users              ->  create
 * GET     /api/f9/users/:id          ->  show
 * PUT     /api/f9/users/:id          ->  update
 * DELETE  /api/f9/users/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import soap from 'soap';
import service from '../../../infrastructure/servicecall'
import cache from '../../../infrastructure/cachehandler'
/* test-code */
import util from 'util';
/* end-test-code */

// Gets a list of Users
export function index(req, res) {
    console.log('SERVER GET USERS');
    var params = { userNamePattern: '' };

    
     if (req.params.username !== undefined) {
        params.userNamePattern=req.params.username;
    }

    
    

    return cache.getCache('')
        .then(data => {
            if (data === null)
                return service.f9CallService('getUsersGeneralInfo', params, 'in', req);
            throw new Error('Unnexpected result yet');
        })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(service.handleError(res));
}

// Gets a list of Users
export function detail(req, res) {
    console.log('SERVER detailed user');
    var params = { userNamePattern: req.params.username };
    return service.f9CallService('getUsersInfo', params, '', req)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(service.handleError(res));


}

export function addSkillUser(req, res) {
    console.log('SERVER addSkillUser')
    var params = { userSkill: req.body }
    return service.f9CallService('userSkillAdd', params, '', req)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(service.handleError(res));

}

export function deleteSkillUser(req, res) {
    console.log('SERVER deleteSkillUser')
    var params = { userSkill: req.body };
    return service.f9CallService('userSkillRemove', params, '', req)
        .then(data => {
            res.status(204).json(data);
        })
        .catch(service.handleError(res));

}

// Creates a new User in the DB
export function create(req, res) {
    var params = req.body;
    return service.f9CallService('createUser', params, '', req)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(service.handleError(res));
}

// Updates an existing User in the DB
export function update(req, res) {
    var params = req.body;
    return service.f9CallService('modifyUser', params, '', req)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(service.handleError(res));
}

// Deletes a User from the DB
export function destroy(req, res) {
    var params = { userName: req.params.username };
    return service.f9CallService('deleteUser', params, '', req)
        .then(data => {
            /* test-code */
            console.log('resulf of delete user : ' + util.inspect(data, { showHidden: false, depth: null }));
            /* end-test-code */
            res.status(204).json(data);
        })
        .catch(service.handleError(res));
}
