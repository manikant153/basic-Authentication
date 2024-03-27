const express = require('express')
const router = express.Router();
const passport = require('passport');

const Comments_controller = require('../controllers/comment_controller')
router.post('/create',passport.checkAuthentication,Comments_controller.create);

module.exports = router;