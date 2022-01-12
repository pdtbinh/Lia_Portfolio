const { User, joiUser } = require('../models/user');
const { Info, joiInfo } = require('../models/info');
const { Education, joiEducation } = require('../models/education');
const { Experience, joiExperience } = require('../models/experience');
const { Project, joiProject } = require('../models/project');
const { Certificate, joiCertificate } = require('../models/certificate');
const { Like, joiLike } = require('../models/like');

const CustomError = require('../errors/CustomError');

class LoginCtrl {
    constructor() {}

    test(req, res, next) {
        console.log('\nTESTING MIDDLEWARE: Body ->', req.body, '\n');
        console.log('\nTESTING MIDDLEWARE: File ->', req.file, '\n');
        next();
    }

    // If this browser is not logged in, login to continue
    isLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            res.end()
            //throw new CustomError('Unauthorized', 401);
        }
        else {
            next();
        }
    }

    // If this browser is already login, and try to login again, redirect to home page
    isLoggedOut(req, res, next) {
        if (req.isAuthenticated()) {
            throw new CustomError('Forbidden', 403);
        }
        else {
            next();
        }
    }

    // Sign up
    async signUp(req, res, next) {
        const { name, username, password } = req.body;
        const user = new User({
            name: name,
            username: username,
        })
        const registeredUser = await User.register(user, password);
        res.json({
            user: registeredUser,
        })
    }

    // Send authenticated user (different from just find any user)
    async sendUser(req, res, next) {
        if (req.isAuthenticated()) {
            const userID = req.user._id;
            const userIDStr = userID.toString();

            const user = await User.findById(userID);
            const info = await Info.find({userID: userIDStr});
            const educations = await Education.find({userID: userIDStr});
            const experiences = await Experience.find({userID: userIDStr});
            const projects = await Project.find({userID: userIDStr});
            const certificates = await Certificate.find({userID: userIDStr});
            let projectIDs = [];
            for (const project of projects) {
                projectIDs.push(project._doc._id.toString());
            }
            const likes = await Like.find({ projectID: { $in: projectIDs } });
            
            res.json({
                user: user,
                info: info,
                educations: educations,
                experiences: experiences,
                projects: projects,
                certificates: certificates,
                likes: likes,
            })
        } else {
            throw new CustomError('Unauthorized', 401);
        }
    }

    // Logout
    async logUserOut(req, res, next) {
        req.logout();
        await req.session.destroy();
        res.end();
    }
}

module.exports = new LoginCtrl();