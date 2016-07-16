'use strict';

var express = require('express');
var controller = require('./disposition.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:dispositionName', controller.show);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/:dispositionName', controller.destroy);
module.exports = router;
