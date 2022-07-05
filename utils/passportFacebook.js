const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
// const keys = require('./../keys/facebook')
const dotenv = require('dotenv').config();
const keys={
  APP_ID: process.env.APP_ID_FB,
  APP_SECRET: process.env.APP_SECRET_FB,
  CALLBACK_URL_FB: process.env.CALLBACK_URL_FB
};

passport.use(new FacebookStrategy({
    clientID: keys.APP_ID,
    clientSecret: keys.APP_SECRET,
    callbackURL: keys.CALLBACK_URL_FB,
    profileFields: ['id', 'displayName', 'email', 'gender']
  },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile)
    }
  ))
  
module.exports=passport  