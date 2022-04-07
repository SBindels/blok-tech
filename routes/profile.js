const express = require('express');
const router = express.Router();
const profile = require('../controllers/profile');

router.get('/', profile.profile);
router.post('/logout', profile.logout);

module.exports = router;