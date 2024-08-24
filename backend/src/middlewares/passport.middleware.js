const session = require('express-session');
const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const { Strategy: FacebookStrategy } = require('passport-facebook');

const { getExistingUserByEmail, createUserGoogleFacebook } = require('../utils/database.util');

const passportMiddleWare = app => {
    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24
            }
        })
    );

    passport.use(
        new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/v1/auth/google/callback',
            scope: ['profile', 'email']
        }, async (accessToken, refreshToken, profile, callback) => {
            let callbackProfile = null;
            const existedUser = await getExistingUserByEmail(profile._json.email);
            if (existedUser) {
                callbackProfile = existedUser;
            } else {
                callbackProfile = await createUserGoogleFacebook({
                    fullName: profile._json.name,
                    email: profile._json.email,
                    avatar: profile._json.picture
                }, Date.now().toString().slice(-10));
            }
            callback(null, callbackProfile);
        })
    );

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "/api/v1/auth/facebook/callback",
        profileFields: ['id', 'emails', 'name', 'displayName', 'photos']
    }, async (accessToken, refreshToken, profile, callback) => {
        let callbackProfile = null;
        const existedUser = await getExistingUserByEmail(profile._json.email);
        if (existedUser) {
            callbackProfile = existedUser;
        } else {
            callbackProfile = await createUserGoogleFacebook({
                fullName: profile._json.name,
                email: profile._json.email,
                avatar: profile._json.picture.data.url
            }, Date.now().toString().slice(-10));
        }
        callback(null, callbackProfile);
    })
    );

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
};

module.exports = passportMiddleWare;