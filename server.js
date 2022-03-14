const express = require('express')
const app = express()
const mongo = require("mongodb");
const bodyparser = require("body-parser");
const ejs = require('ejs');
const req = require('express/lib/request');
const session = require("express-session");
const port = process.env.port || 5000;
ObjectId = require("mongodb").ObjectID;

require('dotenv').config()
console.log(process.env)

//routes
express()
    .use(express.static('public'))
    .set('view engine', 'ejs')
    .set('views', 'view')
    .get('/registratie', registratieForm)
    .get("/login", loginForm)


function registratieForm(req, res) {
    res.render(registratie.ejs)
}

function loginForm(req, res) {
    res.render(login.ejs)
}

app.get('*', (req, res) => {
    res.send('error')
})

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
