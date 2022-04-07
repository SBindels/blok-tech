const req = require('express/lib/request');
const { User } = require('../models/index');
let session;

const profile = async (req, res) => {
    session = req.session
    const user = await User.findOne({email: session.email}).lean();
    res.render('profile.ejs', {user:user})
};

const logout = (req, res) => {
    session.isLoggedIn = false;
    res.redirect('/login');
    console.log('uitgelogd');
}

module.exports = {
    profile: profile,
    logout: logout
};

