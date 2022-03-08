const express = require('express')
const app = express()
const port = 3000
const handlebars = require('express-handlebars');
const esj = require('ejs')

//routes
express()
    .use(express.static('public'))
    .set('view engine', 'ejs')
    .set('views', 'view')
    .listen(3000);

app.get('*', (req, res) => {
    res.send('error')
})

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
