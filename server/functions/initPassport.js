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
    
    async function authenticateUser (username, password, done) {
        let user;

        try {
            await mongoose.connect(process.env.MONGO_CONNECT_USER_DATA);
            user = await User.findOne({"username": username});

            if (user == null) {
                return done(null, false, { message: JSON.stringify({
                    type: 'username',
                    message: 'No user with that name'
                }) });
            } else {
                // console.log('User found.');
            }

            if (await bcrypt.compare(password, user.password)) {
                // console.log('Password correct.');
                const newUserObj = Object.assign({ provider: 'local'}, user);
                // console.log('AFTER ASSIGNING PROVIDER:')
                // console.log(newUserObj);
                return done(null, newUserObj);
            } else {
                // console.log('Password incorrect');
                return done(null, false, { message: JSON.stringify({
                    type: 'password',
                    message: 'Incorrect password'
                }) });
            }
        } catch (err) {
            console.log(err);
            return done(err);
        }
    };

    function testSignIn (username, password, done) {
        console.log('TEST LOGIN');
        console.log({
            username,
            password
        });

        const user = {
            username,
            password,
            provider: 'local'
        }

        return done(null, user);
    }

    passport.use('google', new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:5555/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
        // console.log('USING GOOGLE STRATEGY');
        profile;
        return done(null, profile);
    }
    ));

    passport.use('local', new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, authenticateUser /*testSignIn*/));

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
        // console.log('*********** SERIALIZING USER ******************');
        // console.log(user);
        done(null, user);
    });

    passport.deserializeUser((obj, done) => {
        // console.log('************ DESERIALIZING USER ****************');
        // console.log(obj);

        if ('provider' in obj) {
            // console.log('PROVIDER:' + obj.provider);
            if (obj.provider === 'google') {
                done(null, obj);
            } else if (obj.provider === 'local') {
                done(null, obj);
            } else {
                // console.log('PROVIDER NOT RECOGNIZED');
                done(null, false);
            }
        } else {
            // console.log('NO PROVIDER SUPPLIED');
            done(null, false);
        }
    });

}

// ====== EXPORTS ======

module.exports = {
    initialize
}