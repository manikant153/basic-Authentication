const User = require('../models/user');

function profile(req,res){
    res.render('user_profile',{
        title:"user profile"
    });
}

function signIn(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title:"Codeial : Sign in"
    });
}

function signUp(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up',{
        title:"Codeial : Sign up"
    });
}


//  create a action for signUp page 
async function create(req, res) {
    // check if your password is confirmed or not
    if (req.body.password !== req.body.confirm_password) {
        return res.redirect('back');
    }

    try {
        // Checking if user is present or not
        const user = await User.findOne({ email: req.body.email });
        
        if (!user) {
            // If user is not present, then create a user
            await User.create(req.body);
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('back');
        }
    } catch (error) {
        console.error("Error in finding user or creating user during sign up:", error);
        return res.status(500).send("Internal Server Error");
    }
}





// ----------
   
//  createSession a action for signIn page ?
function createSession(req,res){
    return res.redirect('/');
}



console.log("profile loaded");
module.exports ={
    profile,signIn,signUp,create,createSession
}