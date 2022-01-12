const express = require('express');
const router = express.Router();

const LoginCtrl = require('../controllers/login');

const { User, joiUser } = require('../models/user');
const { Project, joiProject } = require('../models/project');
const { Like, joiLike } = require('../models/like');

const passport = require('passport');
const bodyParser = require('body-parser');

const { storage } = require('../cloudinary');
const multer = require('multer');
const upload = multer({ storage });

router 
    .route('/login')
    .get(LoginCtrl.isLoggedIn, LoginCtrl.sendUser)
    .post(LoginCtrl.isLoggedOut, bodyParser.json(), passport.authenticate('local'), LoginCtrl.sendUser);

router
    .route('/logout')
    .post(LoginCtrl.isLoggedIn, LoginCtrl.logUserOut);

router
    .route('/signup')
    .post(LoginCtrl.isLoggedOut, bodyParser.json(), LoginCtrl.signUp);

module.exports = router