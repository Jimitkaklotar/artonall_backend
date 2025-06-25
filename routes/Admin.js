var express = require('express');
var router =express.Router();
var AdminController = require("../Controller/Admin")

router.post('/signup',AdminController.signup);
router.post('/login',AdminController.login);

module.exports = router;