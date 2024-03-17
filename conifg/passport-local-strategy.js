const passport =  require('passport');
const localStrategy =  require('passport-local').Strategy;

const User = require('../models/user');


// authentication

passport.use(new localStrategy({
    usernameField: 'email'
}, async function(email, password, done) {
    try {
        // Find a user and establish the identity
        const user = await User.findOne({ email: email });
        
        if (!user || user.password !== password) {
            console.log("Invalid UserName/Password");
            return done(null, false);
        }
        
        // If everything goes correct then login
        return done(null, user);
    } catch (error) {
        console.log("Error in finding user ----> Passport", error);
        return done(error);
    }
}));

// serializing the user to decide which key is to be kept in the cookies

passport.serializeUser(function(user,done){
    done(null,user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(async function(id, done) {
    try {
        const user = await User.findOne({ _id: id });
        
        if (!user) {
            console.log("User not found.");
            return done(null, false);
        }
        
        return done(null, user);
    } catch (error) {
        console.log("Error in finding user ----> Passport", error);
        return done(error);
    }
});

// Checking authentication
passport.checkAuthentication = function(req,res,next){
    // if user is signed in,then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    // If not authenticated then 
    return res.redirect('/users/sign-in');

}

// checking user validity
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // the req.user contains the current signed in user from the session cookie and
        // we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}



module.exports ={
    passport
}