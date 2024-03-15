const User = require('../models/user');

// function profile(req,res){
//     console.log(req.cookies_user_id);
//     res.render('user_profile',{
//         title:"user profile"
//     });
// }

async function profile(req, res) {
    try {
        if (req.cookies.user_id) {
            console.log("user id is ;",req.cookies.user_id);
            const user = await User.findById(req.cookies.user_id);
            if (user) {
                return res.render('user_profile', {
                    title: "User Profile",
                    user: user
                });
            } else {
                return res.redirect('/users/sign-in');
            }
        } else {
            return res.redirect('/users/sign-in');
        }
    } catch (err) {
        console.error('Error in profile:', err);
        return res.status(500).send('Internal Server Error');
    }
}



function signIn(req,res){
    return res.render('user_sign_in',{
        title:"Codeial : Sign in"
    });
}

function signUp(req,res){
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

//  create a action for signIn page ?
async function createSession(req, res) {
    try {
        // find user
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            // if user present and password not matched
            if (user.password !== req.body.password) {
                return res.redirect('back');
            }

            // When user present 
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log("Error in finding user in signing in", err);
        return res.redirect('back');
    }
}


// ----



console.log("profile loaded");
module.exports ={
    profile,signIn,signUp,create,createSession
}