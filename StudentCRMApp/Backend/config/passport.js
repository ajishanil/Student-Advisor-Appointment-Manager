//we import passport packages required for authentication
var passport = require("passport");
const bcrypt = require('bcryptjs');
var LocalStrategy = require('passport-local').Strategy;

//We will need the models folder to check passport agains
var Advisor = require('../models/Advisor');

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.use(Advisor.createStrategy());
passport.serializeUser(Advisor.serializeUser());
passport.deserializeUser(Advisor.deserializeUser());

// Telling passport we want to use a Local Strategy. In other words,
//we want login with a username/email and password
passport.use(new LocalStrategy(
    
    // get username and password from the request
    function (username, password, done) {
        // It's the customize strategy for login, here we use email and password
        Advisor.findOne({ where: { 
            email: username,
            is_del: 0,
         } })
            .then(async (users) => {
                if (!users) {
                    // Local strategy using this as a middleware in the route handler
                    //  "done" be managed internally by passport
                    return done(null, false, { message: 'Incorrect username.' });
                }
                
                const validPass = await bcrypt.compare(password, users.password);
                if (!validPass) {
                    return done(null, false, { message: 'Incorrect password.' });
                }

                return done(null, users);
            });
    }
));

// Exporting our configured passport
module.exports = passport;