const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//const keys = require('./../keys/google')
const dotenv = require('dotenv').config()

const keys={
  googleClientID: process.env.googleClientID,
  googleClientSecret: process.env.googleClientSecret,
  callbackURL_GG: `${process.env.callbackURL_GG}`
};



passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: keys.callbackURL_GG,
    passReqToCallback: true
  },
    function (req, accessToken, refreshToken, profile, done) {
      return done(null, profile)
  
    }
  ))
  
module.exports=passport  