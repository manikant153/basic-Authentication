const express = require('express');
const router = express.Router();
// accessing the users_controller
const usersController = require('../controllers/users_controller');
const passport = require('passport');


// to check this file is loaded 
console.log('users rout loaded');
router.get('/profile',passport.checkAuthentication,usersController.profile);
router.get('/sign-in',usersController.signIn);
router.get('/sign-up',usersController.signUp);

router.post('/create',usersController.create);
// user passport as a middleware to authenticate.
//     this  will take three argument the middleware too
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect : '/users/sign-in'},
),usersController.createSession)
module.exports = router;
