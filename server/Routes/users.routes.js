const express = require('express');
const router = express.Router();
const controller = require('../Controllers/users.controllers');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/verify_token', controller.verify_token);

module.exports = router;
