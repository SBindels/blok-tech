const {
    User
} = require('../models');
require('dotenv').config()
const bcrypt = require('bcrypt');

let session;

const loginForm = (req, res) => {
    res.render('login.ejs')
}

const registratieForm = (req, res) => {
    res.render('register.ejs')
}

const register = async (req, res) => {
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    //const hash = await bcrypt.hash(password, 10)

    try {
        const result = await User.create({
            email: email,
            username: username,
            password: password
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

// const login = async (req, res) => {
//     try {
//         const User = await User.findOne({
//             'email': req.body.email
//         }).lean()
//         const password = req.body.password
//         console.log(User)

//         if (User) {
//             const match = await bcrypt.compare(password, User.password)
//             console.log(User.password === password)
//             if (match) {
//                 User.password === password;
//                 session = req.session;
//                 session.email = req.body.email;
//                 session.name = User.username;
//                 session.isLoggedIn = true;
//                 console.log(session);
//                 // return deGebruiker
//                 res.redirect('/profile')
//                 console.log('succesvol ingelogd')
//             } else {
//                 //return 'invalid password'
//                 console.log('invalid password')
//             }
//         } else {
//             // return 'user was not found'
//             console.log('gebruiker niet gevonden')
//         }

//     } catch (error) {
//         res.redirect('/login')
//     }
// }

//zonder hash
const login = async (req, res) => {
    try {
        const User = await User.findOne({
            'email': req.body.email
        }).lean()
        const password = req.body.password
        console.log(User)

        if (User) {
            User.password === password;
            session = req.session;
            session.email = req.body.email;
            session.name = User.username;
            session.isLoggedIn = true;
            console.log(session);
            // return deGebruiker
            res.redirect('/profile')
            console.log('succesvol ingelogd')
        } else {
            //return 'invalid password'
            console.log('invalid password')
        }

} catch (error) {
    res.redirect('/login')
}
}

module.exports = {
    loginForm: loginForm,
    login: login,
    register: register,
    registratieForm: registratieForm
};