'use strict';

var express = require('express');
var controller = require('./app.controller');

var router = express.Router();

router.get('/:appName', controller.show); 

module.exports = router;
