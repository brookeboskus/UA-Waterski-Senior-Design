const express = require('express');
const router = express.Router();
const { login } = require('../auth/login');
const { signup } = require('../auth/signup');


router.post('/login', login);


router.post('/signup', signup);

module.exports = router;
