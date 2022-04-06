const { User } = require('../models/user');
require('dotenv').config()

const loginForm = (req, res) => {
    res.render('login.ejs')
}

const registratieForm = (req, res) => {
    res.render('registratie.ejs')
}

const register = async (req, res) => {
    const email = req.body.email
    const gebruikersnaam = req.body.gebruikersnaam
    const wachtwoord = req.body.wachtwoord
  
    try {
          const result = await User.create({
            email: email,
            gebruikersnaam: gebruikersnaam,
            wachtwoord: wachtwoord
          })

        return result,
         res.redirect('/login')
    } catch (error) {
      //throw new Error(error)
      console.log(error);
      //functie met dezelfde gebruiker.
      console.log('Niet gelukt om een account aan te maken, probeer het nog eens')
        res.redirect('/register')
    }
  }


  module.exports = {
      loginForm: loginForm,
      register: register,
      registratieForm: registratieForm
  };