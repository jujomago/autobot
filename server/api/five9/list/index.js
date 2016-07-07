'use strict';

var express = require('express');
var controller = require('./list.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/create', controller.createList);
router.delete('/:listName', controller.destroy);
module.exports = router;
