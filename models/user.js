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

// dit wel behouden en verder mee werken. 
// het is aan te raden om je schema apart in je file te houden