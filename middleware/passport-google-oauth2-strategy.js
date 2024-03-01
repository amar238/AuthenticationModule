const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../model/user');
const bcrypt = require('bcrypt');

const saltRounds = parseInt(process.env.saltRounds);
const googleOauthClientId = process.env.googleOauthClientId
const googleOauthClientSecret = process.env.googleOauthClientSecret
passport.use(new googleStrategy({
        clientID: googleOauthClientId,
        clientSecret: googleOauthClientSecret,
        callbackURL: "http://localhost:8080/auth/google/callback"
    },
    async(accessToken, refreshToken, profile, done)=>{
        try {
            var user = await User.findOne({email:profile.emails[0].value});
            console.log(profile)
            if(user){
                return done(null, user);
            }else{
                let nameArray = profile.displayName.split(' ');
                let firstName = nameArray[0];
                let lastName = nameArray.slice(1).join(' ');

                const password= crypto.randomBytes(20).toString('hex');
                const salt = await bcrypt.genSalt(saltRounds);
                hashedPassword = await bcrypt.hash(password,salt);

                user = await User.create({
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    password: hashedPassword,
                    email: profile.emails[0].value
                });
                return done(null,user);
            }
        } catch (error) {
            console.log("Error in google passport strategy: ",error);

        }
        
    }
));

module.exports = passport;