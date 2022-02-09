const express = require('express')

express()
    .get('/', onhome)
    .listen(1900)

function onhome(req, res) {
    res.send('<h1>Hello Client</h1>\n')
}