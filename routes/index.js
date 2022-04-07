const express = require('express');
const router = express.Router();

const registeren = require('./registreren');
const login = require('./login');

router.use('/', registeren);
router.use('/registeren', registeren);
router.use('/login', login);

module.exports = router;