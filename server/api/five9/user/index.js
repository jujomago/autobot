'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/:username?', controller.index);
router.get('/detail/:username', controller.detail);
router.post('/',controller.create);
router.put('/', controller.update);
router.delete('/:username', controller.destroy);
router.post('/skills/add',controller.addSkillUser);
router.delete('/:username/skills',controller.destroySkillUser);
router.post('/skills/update',controller.updateSkillUser);

module.exports = router;
 