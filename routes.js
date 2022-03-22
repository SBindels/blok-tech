//hierin ga ik mijn routes zetten.
const express = require('express');
const router = express.Router();
const mongo = require("mongodb");
const bodyparser = require("body-parser");
const port = process.env.PORT || 8888;

require('dotenv').config()
console.log(process.env)

//MongoDB database connection
let db = null;
const MongoClient = require("mongodb").MongoClient;

const uri = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@datingapp.abpqe.mongodb.net/test";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect(function (err, client) {
  console.log('connected to the database');
  if (err) {
    throw err;
  }
  db = client.db("mydatingapp");
});

router
  .use(express.static("public")) // gebruik de template engine EJS
  .set("view engine", "ejs")
  .set("views", "view") // EJS files staan in /views
  .use(bodyparser.urlencoded({ extended: true })) // body-parser krijg je toegang tot Request body objecten zoals req.body.voornaam
  .use(
    session({ //Hierdoor blijft de gebruiker ingelogt ookal herlaad de pagina.
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  )
  .get("/", users)
  .get("/registratie", Registratieform)
  .get("/login", loginForm)
  .get("/loginSucces", loginSucces)
  .post("/login", compareCredentials)
  .post("/registratie", registerUser)
  .get("/loginDone", compareCredentials)
  .get("/loginFailed", compareCredentials)
  .post("/update", updatePassword)
  .use(pageNotFound);
  //.listen(8888);

module.exports = router;