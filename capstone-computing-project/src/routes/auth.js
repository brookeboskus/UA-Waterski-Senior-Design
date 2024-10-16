const express = require('express');
const router = express.Router();
const { login } = require('../auth/login');
const { signup } = require('../auth/signup');
const { getRoster } = require('../auth/roster');
const { profile } = require('../auth/profile');


router.post('/login', login);
router.post('/signup', signup);
router.get('/roster', getRoster);
router.get('/profile', profile);

module.exports = router;
