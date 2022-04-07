const express = require('express');
const router = express.Router();

const registeren = require('./register');
const login = require('./login');
const profile = require('./profile')

router.use('/', registeren);
router.use('/register', registeren);
router.use('/login', login);
router.use('/profile', profile)

module.exports = router;