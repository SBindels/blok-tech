const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const LocalStrategy = require('passport-local').Strategy

//load user model
const User = require('../models/user');

modules.export = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'emailadress'}, (email, wachtwoord, done) => {
            User.findOne({ email: email })
                .then(user => {
                    if(!user) {

                    }
                })
                .catch(err => console.log(err));
        })
    );
}

