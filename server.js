const express = require('express')
const app = express()
const mongo = require("mongodb");
const User = require('./models/user')
const bodyparser = require("body-parser");
const ejs = require('ejs');
const req = require('express/lib/request');
const session = require("express-session");
const connectDB = require('./config/connect')
const bcrypt = require('bcrypt')
require('dotenv').config()
connectDB();

const port = process.env.PORT || 8888;


console.log(process.env)

//MongoDB database connection
// let db = null;
// const MongoClient = require("mongodb").MongoClient;

// const uri = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@datingapp.abpqe.mongodb.net/test";

// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// client.connect(function (err, client) {
//   console.log('connected to the database');
//   if (err) {
//     throw err;
//   }
//   db = client.db("mydatingapp");
// });

let data = {
  title: "datingapp",
};

app
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


app.get('/', (req, res) => { //root pagina, laad de login pagina
    res.render('login.ejs', { data });
});

function loginForm(req, res) {
    res.render("login.ejs", { data });
  }
  
function Registratieform(req, res) {
    res.render("registratie.ejs", { data });
  }

function loginSucces(req, res) {
    res.render("loginDone.ejs", { data });
  }

//Functie dat data verzend naar mijn MongoDB database
function registerUser(req, res, next) {
  const naam = req.body.voornaam
  const email = req.body.emailadres
  const wachtwoord = req.body.wachtwoord

    db.collection('user').insert( //db collectie 'user'
      {
        naam: naam, //het maken van een json object om vervolgens in de database te plaatsen
        email: email,
        wachtwoord: wachtwoord,
      },
      done
    );

    function done(err, data) {
      if (err) {
        next(err);
      } else {
        res.redirect("/login"); //redirect naar de login pagina
        data
      }
    }
  }

  //nieuwe register
  // async function registerUser(req, res) {

  //   const naam = req.body.voornaam
  //   const email = req.body.emailadres
  //   const wachtwoord = req.body.wachtwoord
  //   }
  
  //   try {
         
  //     const newUser = User.create({
  //           email: email,
  //           voornaam: voornaam,
  //           wachtwoord: wachtwoord
  //         })
  //       return newUser,
  //       res.redirect('/login')
  //   } catch {
  //     console.log('Niet gelukt om een account aan te maken, probeer het nog eens')
  //       res.redirect('/login')
  //   }


//nieuwe functie compare (deze zou werken)
async function compareCredentials(req, res) {
  try {
    const deGebruiker = await User.findOne({'email': req.body.emailadres}).lean()
    const wachtwoord = req.body.wachtwoord
    console.log(deGebruiker);

    if(deGebruiker){
      console.log(deGebruiker.wachtwoord === wachtwoord)
      if (deGebruiker.wachtwoord === wachtwoord) {
        // return deGebruiker
        res.redirect('/loginDone')
        console.log('succesvol ingelogd')
      } else {
        //return 'invalid password'
        console.log('wachtwoord niet correct')
      }
    } else {
      // return 'user was not found'
      console.log('gebruiker niet gevonden')
    }

  } catch (error) {
    throw new Error(error)
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

//delete methode van WebDevSimplified
app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

function pageNotFound(req, res) {
    res.render("404.ejs");
  }

app.listen(port, () => {
  console.log(`Dating app is running on port ${port}`)
})
