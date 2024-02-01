// Configuration for passport middleware

// ====== IMPORTS ======

// Mongoose
const mongoose = require('mongoose');
const User = require('../models/user.js');

// Passport
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Encryption
const bcrypt = require('bcryptjs');

// System
const path = require('path');

// Environment variables
require('dotenv').config({
    path: path.join(__dirname, '../config/.env')
});


// ====== FUNCTIONS ======

function initialize (passport) {
    
    async function authenticateUser (email, password, done) {
        let user;

        try {
            await mongoose.connect(process.env.MONGO_CONNECT_USER_DATA);
            user = await User.findOne({"email": email});

            if (user == null) {
                return done(null, false, { message: 'No user with that name.' });
            } else {
                console.log('User found.');
            }

            if (await bcrypt.compare(password, user.password)) {
                console.log('Password correct.');
                return done(null, user);
            } else {
                console.log('Password incorrect');
                return done(null, false, { message: 'Incorrect password' });
            }
        } catch (err) {
            console.log(err);
            return done(err);
        }
    };

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:5555/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
        console.log('USING GOOGLE STRATEGY');
        profile;
        return done(null, profile);
    }
    ));

    // passport.use(
    //     new LocalStrategy({ usernameField: 'email' }, authenticateUser)
    // );

    // passport.serializeUser((user, done) => {
    //     done(null, user.id);
    // });

    // passport.deserializeUser(async (id, done) => {
    //     let user;
    //     try {
    //         await mongoose.connect(process.env.MONGO_CONNECT_USER_DATA);
    //         user = await User.findById(id);
    //         done(null, user);
    //     } catch (err) {
    //         console.log(err);
    //         done('pass');
    //     }
    // })

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });

}

// ====== EXPORTS ======

module.exports = {
    initialize
}