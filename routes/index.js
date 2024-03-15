// from here all routes will go futher ,why?
// beacuse the we are make a chain of rout
/*
  eg:- rout.index.js/user1/login
       rout.index.js/user2/login
       .
       . 
       soon
       so basic rout is rout/index.js/user then after this all new router will be created . Do not get
       confuse .will get
*/

// we have used the express router
const express = require('express');
const router = express.Router();
// accessing the controller
const homeController = require('../controllers/home _controller');
 
// to check this file is loaded 
console.log('router loaded');
router.get('/',homeController.home);
// when any router ges to /users or/users/profile
  //   will followed by this
router.use('/users',require('./users'));

module.exports = router;