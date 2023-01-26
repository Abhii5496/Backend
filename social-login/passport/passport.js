const passport = require('passport');

const User = require('../model/user')

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username, name: user.name });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

passport.use( new GoogleStrategy(
    {
    clientID: "1072904340802-qsr64qns32bg3k3ljj19qdr3dcdce15k.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL: "http://localhost:4000/auth/google/callback"
},
    (accessToken, refreshToken, profile, next) => {
        console.log("My Profile", profile._json.email);

            User.findOne({email: profile._json.email})
            .then((user) => {
                if(user) {
                    console.log('user already exists', user);
                    next(null, user)
                }
                else{
                    User.create({
                        name:profile._json.displayName,
                        googleID:profile.id,
                        email:profile._json.email
                    }).then((user) => console.log('New User', user))
                    next(null, user)

                    .catch(err => console.log(err))
                }
            })
        
    }
)
)
