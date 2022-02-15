const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/aboutme', (req, res) => {
    res.send('this is the about me page!')
  })

app.get('/login', (req, res) => {
    res.send('welcome to the login page')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})