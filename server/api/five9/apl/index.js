'use strict';

var express = require('express');
var controller = require('./apl.controller');

var router = express.Router();

router.get('/app/:appName', controller.show);

module.exports = router;
