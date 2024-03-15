const express = require('express');
const router = express.Router();
// accessing the users_controller
const usersController = require('../controllers/users_controller');

// to check this file is loaded 
console.log('users rout loaded');
router.get('/profile',usersController.profile);
router.get('/sign-in',usersController.signIn);
router.get('/sign-up',usersController.signUp);

router.post('/create',usersController.create);

module.exports = router;
