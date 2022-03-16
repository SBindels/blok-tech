const express = require('express')
const app = express()
const mongo = require("mongodb");
const bodyparser = require("body-parser");
const ejs = require('ejs');
const req = require('express/lib/request');
const session = require("express-session");
const passport = require('passport')
const LocalStrategy = require('passport-local')
const port = process.env.port || 8888;

require('dotenv').config()
console.log(process.env)

//MongoDB database
let db = null;
//let collectionUsers;
const MongoClient = require("mongodb").MongoClient;

// // const uri =
// //   "mongodb+srv://" +
// //   process.env.DB_USER +
// //   ":" +
// //   process.env.DB_PASS +
// //   "@cluster0-abpqe.mongodb.net/test?retryWrites=true&w=majority";






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
  title: "datingapp",
};

//exports.data = data;

//new connection database van altas copy

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://sjoerdb:pix1R7hgrHH76d4k@datingapp.abpqe.mongodb.net/datingapp?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const db = client.db("datingapp").collection("mydatingapp");
//   console.log('connected to the database');
//   // perform actions on the collection object
//   client.close();
// });



//routes
app
  .use(express.static("public")) // gebruik de template engine EJS
  .set("view engine", "ejs")
  .set("views", "view") // EJS files staan in /views
  .use(bodyparser.urlencoded({ extended: true })) // body-parser krijg je toegang tot Request body objecten zoals req.body.voornaam
  .use(passport.initialize())
  .use(passport.session())
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
  .get("/loginSucces", loginSucces)
  //.post("/login", compareCredentials)
  .post("/registratie", registerUser)
  //.get("/loginDone", compareCredentials)
  //.get("/loginFailed", compareCredentials)
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


  //Functie voor het vergelijken van de gebruiker zijn emailadres en wachtwoord
// function compareCredentials(req, res) {
//     db.collection('user').findOne(
//       {
//         email: req.body.emailadres,
//       },
//       done
//     );
  
//     function done(err, data) {
//       // console.log(data);
//       if (err) {
//         next(err);
//       } else {
//         if (wachtwoord === req.body.wachtwoord) {
//           console.log("succesvol ingelogd");
//           req.session.user = data.voornaam;
//           res.redirect("/loginDone");
//         } else {
//           console.log("login mislukt");
//           res.redirect("/login");
//         }
//       }
//     }
//   }

//passport proberen



passport.use(new LocalStrategy(
  function(emailadres, wachtwoord, done) {
    db.collection.findOne({ email: emailadres }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(wachtwoord)) { return done(null, false); }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(email, done) {
  done(null, email.id);
});

passport.deserializeUser(function(id, done) {
  db.collection.findById(id, function (err, email) {
    done(err, email);
  });
});

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/loginDone');
  });


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
