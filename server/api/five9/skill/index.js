'use strict';

var express = require('express');
var controller = require('./skill.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/skillsInfo',controller.skillsInfo);
router.get('/:skillname', controller.show);
router.post('/create', controller.create);
router.put('/update', controller.update);
router.delete('/delete/:skillname', controller.destroy);

module.exports = router;
