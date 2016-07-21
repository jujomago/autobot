'use strict';

var express = require('express');
var controller = require('./list.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/contacts', controller.getContacts);
router.get('/contacts/result/:identifier', controller.getListImportResult);
router.get('/contacts/result/running/:identifier', controller.isImportRunning);
router.get('/:listName', controller.show);
router.post('/contacts', controller.createContactForList);
router.delete('/contacts/delete', controller.deleteContactFromList);
router.post('/create', controller.createList);
router.delete('/:listName', controller.destroy);
router.get('/contacts/fields', controller.getContactFields);

module.exports = router;
