const express = require('express')
const app = express()
const port = 3000
const handlebars = require('express-handlebars');
const esj = require('ejs');
const req = require('express/lib/request');

require('dotenv').config();

//routes
express()
    .use(express.static('public'))
    .set('view engine', 'ejs')
    .set('views', 'view')
    .get('/registratie', registratieForm)
    .get('/login', loginForm)
    .listen(3000);


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
