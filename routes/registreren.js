const express = require('express');
const router = express.Router();
const register = require('../controllers/register-login');

router.get('/', register.registratieForm);
router.post('/', register.register);

module.exports = router;