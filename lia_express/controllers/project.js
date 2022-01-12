const { User, joiUser } = require('../models/user');
const { Info, joiInfo } = require('../models/info');
const { Education, joiEducation } = require('../models/education');
const { Experience, joiExperience } = require('../models/experience');
const { Project, joiProject } = require('../models/project');
const { Certificate, joiCertificate } = require('../models/certificate');
const { Like, joiLike } = require('../models/like');

const project = require('../models/project');

class ProjectCtrl {
    constructor() {}

    async addProject(req, res, next) {
        const { userID, name, introduction, tags, link, order } = req.body;
        const project = new Project({
            userID: userID,
            name: name,
            introduction: introduction,
            tags: tags,
            link: link,
            order: !isNaN(parseInt(order)) ? parseInt(order) : 1,
        });
        await project.save();
        res.json({ project: project });
    } 

    async editProject(req, res, next) {
        const { projectID, name, introduction, tags, link, order } = req.body;
        const project = await Project.findById(projectID);
        project.name = name;
        project.introduction = introduction;
        project.tags = tags
        project.link = link;
        project.order = !isNaN(parseInt(order)) ? parseInt(order) : 1,
        await project.save();
        res.json({ project: project });
    } 

    async deleteProject(req, res, next) {
        const { projectID } = req.body;
        await Project.findByIdAndDelete(projectID);
        res.end();
    } 

    async likeProject(req, res, next) {
        const { userID, projectID } = req.body;
        await Like.deleteMany({ userID: userID, projectID: projectID });
        const like = new Like({ userID: userID, projectID: projectID });
        await like.save();
        res.end();
    }

    async unlikeProject(req, res, next) {
        const { userID, projectID } = req.body;
        await Like.deleteMany({ userID: userID, projectID: projectID });
        res.end();
    }
}

module.exports = new ProjectCtrl();