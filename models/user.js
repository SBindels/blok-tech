const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    voornaam: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    wachtwoord: {
        type: String,
        required: true
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;