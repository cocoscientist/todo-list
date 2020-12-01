const express = require('express');
const control = require('../controllers/controller');
const router = express.Router();

router.route('/users').get(control.getUsers);
router.route('/tasks').get(control.getTasks);

module.exports = router;