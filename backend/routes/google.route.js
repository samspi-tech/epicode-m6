const express = require('express');
const session = require('express-session');
const googleAuth = express.Router();
const passport = require('passport');
const googleController = require('../controllers/google.controller');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

googleAuth.use(session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false
}));

googleAuth.use(passport.initialize());
googleAuth.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

googleAuth.get('/google',
    passport.authenticate('google',
        {
            scope: ['profile', 'email'],
            prompt: 'select_account'
        }));

googleAuth.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    googleController.manageOauthCallback);

googleAuth.get('/google/logout', googleController.logoutFromGoogle);

module.exports = googleAuth;
