'use strict';

var express = require('express');
var controller = require('./campaignProfile.controller');

var router = express.Router();

router.get('/', controller.index);
router.delete('/:profileName', controller.destroy);

module.exports = router;
