'use strict';

var express = require('express');
var controller = require('./campaign.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/show/:type/:campaignName', controller.show);
router.get('/ivrscripts',controller.ivrscripts);
router.get('/lists',controller.getLists); 
router.get('/dnis',controller.getDNISList);

router.get('/start/:campaignName',controller.startCampaign);
router.get('/stop/:campaignName',controller.stopCampaign);

router.post('/', controller.create);
router.post('/add/dnis',controller.addDNIS);
router.post('/add/lists',controller.addLists);


router.put('/outbound', controller.updateOutBound);
router.put('/autodial', controller.updateAutoDial);
router.put('/inbound', controller.updateInBound);

router.delete('/:campaignName', controller.destroy);

module.exports = router;

