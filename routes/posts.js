const express = require('express')
const router = express.Router();

const Post_controller = require('../controllers/post_controller')
router.post('/create',Post_controller.create);

module.exports = router;