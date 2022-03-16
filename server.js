const express = require('express')
const app = express()
const mongo = require("mongodb");
const bodyparser = require("body-parser");
const ejs = require('ejs');
const req = require('express/lib/request');
const session = require("express-session");
const User = require('./models/user');
const port = process.env.port || 8888;

require('dotenv').config()
console.log(process.env)

//MongoDB database
let db = null;
let collectionUsers;
const MongoClient = require("mongodb").MongoClient;

// const uri =
//   "mongodb+srv://" +
//   process.env.DB_USER +
//   ":" +
//   process.env.DB_PASS +
//   "@cluster0-abpqe.mongodb.net/test?retryWrites=true&w=majority";



const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//database connect
client.connect(function (err, client) {
  console.log('connected to the database');
  if (err) {
    throw err;
  }
  db = client.db("mydatingapp");
});


let data = {
  title: "mydatingapp",
};

exports.data = data;


//routes
app
  .use(express.static("public")) // gebruik de template engine EJS
  .set("view engine", "ejs")
  .set("views", "view") // EJS files staan in /views
  .use(bodyparser.urlencoded({ extended: true })) // body-parser krijg je toegang tot Request body objecten zoals req.body.voornaam
  .use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  )
  .get("/", users)
  .get("/registratie", Registratieform)
  .get("/login", loginForm)
  .post("/login", compareCredentials)
  .post("/registratie", registerUser)
  .get("/loginDone", compareCredentials)
  .get("/loginFailed", compareCredentials)
  .post("/update", updatePassword)
  .use(pageNotFound);
  //.listen(8888);


function users(req, res, next) {
    db.collection("user").find().toArray(done);
  
    function done(err, data) {
      if (err) {
        next(err);
      } else {
        res.render("login.ejs", { data: data });
      }
    }
  }


app.get('/', (req, res) => {
    res.render('login.ejs', { data });
});

function loginForm(req, res) {
    res.render("login.ejs", { data });
  }
  
function Registratieform(req, res) {
    res.render("registratie.ejs", { data });
  }

//Functie dat data verzend naar mijn MongoDB database
function registerUser(req, res, next) {
    db.collection("user").insertOne( //db collectie 'user'
      {
        naam: req.body.voornaam, //het maken van een json object om vervolgens in de database te plaatsen
        email: req.body.emailadres,
        wachtwoord: req.body.wachtwoord,
      },
      done
    );

    function done(err, data) {
      if (err) {
        next(err);
      } else {
        res.redirect("/login"); //redirect naar de login pagina
      }
    }
  }


  //Functie voor het vergelijken van de gebruiker zijn emailadres en wachtwoord
function compareCredentials(req, res) {
    db.collection("user").findOne(
      {
        email: req.body.emailadres,
      },
      done
    );
  
    function done(err, data) {
      // console.log(data);
      if (err) {
        next(err);
      } else {
        if (data.wachtwoord === req.body.wachtwoord) {
          console.log("succesvol ingelogd :)");
          req.session.user = data.username;
          res.redirect("/loginDone");
        } else {
          console.log("login mislukt");
          res.redirect("/login");
        }
      }
    }
  }

//update password function van Slack Inju
function updatePassword(req, res) {
    let users = req.session.emailadres;
    console.log(users._id);
  
    db.collection("user").updateOne(
      { _id: mongo.ObjectId(users._id) },
      {
        $set: {
          email: req.body.emailadres,
          wachtwoord: req.body.wachtwoord,
        },
      }
    );
    res.redirect("/login");
  }

function pageNotFound(req, res) {
    res.render("404.ejs");
  }

app.listen(port, () => {
  console.log(`Dating app is running on port ${port}`)
})
