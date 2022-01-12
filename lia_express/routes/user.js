const express = require('express');
const router = express.Router();

const UserCtrl = require('../controllers/user');
const LoginCtrl = require('../controllers/login');

const { User, joiUser } = require('../models/user');
const { Project, joiProject } = require('../models/project');
const { Like, joiLike } = require('../models/like');

const bodyParser = require('body-parser');

const { storage } = require('../cloudinary');
const multer = require('multer');
const upload = multer({ storage });

router
    .route('/users')
    .get(UserCtrl.findAllUsers);

router
    .route('/user/edit')
    .post(LoginCtrl.isLoggedIn, bodyParser.json(), UserCtrl.editUser);

router
    .route('/user/:userID')
    .get(UserCtrl.findUser)

// EDUCATION
router
    .route('/education/add')
    .post(LoginCtrl.isLoggedIn, bodyParser.json(), UserCtrl.addEducation);

router
    .route('/education/delete')
    .post(LoginCtrl.isLoggedIn, bodyParser.json(), UserCtrl.deleteEducation);

router
    .route('/education/edit')
    .post(LoginCtrl.isLoggedIn, bodyParser.json(), UserCtrl.editEducation);

// EXPERIENCE
router
    .route('/experience/add')
    .post(LoginCtrl.isLoggedIn, bodyParser.json(), UserCtrl.addExperience);

router
    .route('/experience/delete')
    .post(LoginCtrl.isLoggedIn, bodyParser.json(), UserCtrl.deleteExperience);

router
    .route('/experience/edit')
    .post(LoginCtrl.isLoggedIn, bodyParser.json(), UserCtrl.editExperience);

// CERTIFICATE
router
    .route('/certificate/add')
    .post(LoginCtrl.isLoggedIn, bodyParser.json(), UserCtrl.addCertificate);

router
    .route('/certificate/delete')
    .post(LoginCtrl.isLoggedIn, bodyParser.json(), UserCtrl.deleteCertificate);

router
    .route('/certificate/edit')
    .post(LoginCtrl.isLoggedIn, bodyParser.json(), UserCtrl.editCertificate);


module.exports = router;