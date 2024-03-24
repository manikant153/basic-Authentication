const express = require('express')
const router = express.Router();
const passport = require('passport');

const Post_controller = require('../controllers/post_controller')
router.post('/create',passport.checkAuthentication,Post_controller.create);

module.exports = router;