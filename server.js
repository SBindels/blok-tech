const express = require('express')
const app = express()
const port = 3000
const handlebars = require('express-handlebars');
const esj = require('ejs')

// app.engine('hbs', handlebars({
//     layoutsDir: `${__dirname}/views/layouts`,
//     extname: 'hbs'
//     }));
// app.set('view engine', 'hbs');
// app.set('views', './views');


// app.get('/', (req, res) => {
//     //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
//     res.render('main', {layout : 'main'});
//     });

app.get('*', (req, res) => {
    res.send('error')
})

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
