const express = require('express')
const app = express()
const mongo = require("mongodb");
const User = require('./models/user')
const bodyparser = require("body-parser");
const ejs = require('ejs');
const req = require('express/lib/request');
const session = require("express-session");
const bcrypt = require('bcrypt')
require('dotenv').config()

const connectDB = require('./config/connect')
connectDB();

const port = process.env.PORT || 8888;

app.set('view engine', 'esj');
app.set('views', './view');

//session
app.use(session({
    secret: process.env.SESSION_SECTRET,
    resave: false,
    saveUninitialized: false
}));

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + './public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//routes
app.use('/', routes);

app.post('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
    console.log('succesvol uitgelogd');
})

app.listen(port, () => {
    console.log(`Dating app is running on port ${port}`);
});
