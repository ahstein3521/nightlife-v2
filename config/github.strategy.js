var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;
var User=require('../models/user');

module.exports = function(){
    passport.use(new GithubStrategy({
      clientID: process.env.github_id,
      clientSecret: process.env.github_secret,
      callbackURL: "https://ahstein3521-nightlife.herokuapp.com/auth/callback"
    },
    function(accessToken,refreshToken, profile, done){
            
            User.findOne({'user.id': profile.id}, function (error, user) {
                if (user) {
                    done(null, user);
                }
                else{
                    var newUser = new User({
                        photo:profile.photos[0].value,
                        id:profile.id,
                        github_refreshToken:refreshToken,
                        github_accessToken:accessToken,
                        username:profile.username
                    });
                    newUser.save();
                    done(null, newUser);
                }
            })
        })
    )   
}

