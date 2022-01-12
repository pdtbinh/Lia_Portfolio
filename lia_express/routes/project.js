const express = require('express');
const router = express.Router();

const ProjectCtrl = require('../controllers/project');
const LoginCtrl = require('../controllers/login');

const { User, joiUser } = require('../models/user');
const { Project, joiProject } = require('../models/project');
const { Like, joiLike } = require('../models/like');

const bodyParser = require('body-parser');

const multer = require('multer');
const { storage } = require('../cloudinary');
const { deleteProject } = require('../controllers/project');
const upload = multer({ storage });

router
    .route('/add')
    .post(LoginCtrl.isLoggedIn, bodyParser.json(), ProjectCtrl.addProject);

router
    .route('/delete')
    .post(LoginCtrl.isLoggedIn, bodyParser.json(), ProjectCtrl.deleteProject);

router
    .route('/edit')
    .post(LoginCtrl.isLoggedIn, bodyParser.json(), ProjectCtrl.editProject);

router
    .route('/like')
    .post(LoginCtrl.isLoggedIn, bodyParser.json(), ProjectCtrl.likeProject);

router
    .route('/unlike')
    .post(LoginCtrl.isLoggedIn, bodyParser.json(), ProjectCtrl.unlikeProject);

module.exports = router