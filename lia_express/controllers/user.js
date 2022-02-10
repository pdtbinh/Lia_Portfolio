const { User, joiUser } = require('../models/user');
const { Info, joiInfo } = require('../models/info');
const { Education, joiEducation } = require('../models/education');
const { Experience, joiExperience } = require('../models/experience');
const { Project, joiProject } = require('../models/project');
const { Certificate, joiCertificate } = require('../models/certificate');
const { Like, joiLike } = require('../models/like');

class UserCtrl {
    constructor() {}

    async findAllUsers(req, res, next) {
        const users = await User.find({})
            //.limit(50);
        res.json({
            users: users,
        })
    }

    // Find any user, no need for authentication
    async findUser(req, res, next) {
        try {
            const { userID } = req.params;
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
        } catch {
            console.log('ERORRRR');
            res.json({
                error: 'No such user',
            });
            
        }
        
    }

    // * All of the below require authentication

    // USER
    async editUser(req, res, next) {
        const { userID, name, phone, address, email } = req.body;
        const user = await User.findById(userID);
        user.name = name;
        user.phone = phone;
        user.address = address;
        user.email = email;
        await user.save();
        console.log(user);
        res.json({ user: user });
    } 

    // EDUCATION
    async addEducation(req, res, next) {
        const { userID, degree, time, location, institution, introduction, focus } = req.body;
        const education = new Education({
            userID: userID,
            degree: degree,
            time: time,
            location: location,
            institution: institution,
            introduction: introduction,
            focus: focus,
        });
        await education.save();
        res.json({ education: education });
    } 

    async editEducation(req, res, next) {
        const { educationID, degree, time, location, institution, introduction, focus } = req.body;
        const education = await Education.findById(educationID);
        education.degree = degree;
        education.time = time;
        education.location = location;
        education.institution = institution;
        education.introduction = introduction;
        education.focus = focus;
        await education.save();
        res.json({ education: education });
    } 

    async deleteEducation(req, res, next) {
        const { educationID } = req.body;
        await Education.findByIdAndDelete(educationID);
        res.end();
    }

    // EXPERIENCE
    async addExperience(req, res, next) {
        const { userID, position, type, company, time, duration, location, introduction, link } = req.body;
        const experience = new Experience({
            userID: userID,
            position: position,
            type: type,
            company: company, 
            time: time,
            duration: duration,
            location: location,
            introduction: introduction,
            link: link,
        });
        await experience.save();
        res.json({ experience: experience });
    } 

    async editExperience(req, res, next) {
        const { experienceID, position, type, company, time, duration, location, introduction, link } = req.body;
        const experience = await Experience.findById(experienceID);
        experience.position = position;
        experience.type = type
        experience.company = company;
        experience.time = time;
        experience.duration = duration;
        experience.location = location;
        experience.introduction = introduction;
        experience.link = link;
        await experience.save();
        res.json({ experience: experience });
    } 

    async deleteExperience(req, res, next) {
        const { experienceID } = req.body;
        await Experience.findByIdAndDelete(experienceID);
        res.end();
    }

    // CERTIFICATES
    async addCertificate(req, res, next) {
        const { userID, name, type, provider, link, order} = req.body;
        const certificate = new Certificate({
            userID: userID,
            name: name,
            type: type,
            provider: provider,
            link: link,
            order: order,
        });
        await certificate.save();
        res.json({ certificate: certificate });
    } 

    async editCertificate(req, res, next) {
        const { certificateID, name, type, provider, link, order} = req.body;
        const certificate = await Certificate.findById(certificateID);
        certificate.name = name;
        certificate.type = type;
        certificate.provider = provider;
        certificate.link = link;
        certificate.order = order;
        await certificate.save();
        res.json({ certificate: certificate });
    } 

    async deleteCertificate(req, res, next) {
        const { certificateID } = req.body;
        await Certificate.findByIdAndDelete(certificateID);
        res.end();
    }
}

module.exports = new UserCtrl();