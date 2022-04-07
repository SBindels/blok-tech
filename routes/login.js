const express = require('express');
const router = express.Router();
const register = require('../controllers/register-login');

router.get('/', register.loginForm);
router.post('/', register.login);

module.exports = router;