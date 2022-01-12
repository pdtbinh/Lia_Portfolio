const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const joi = require('joi');

const projectSchema = new Schema({
    // projectID: is automatically added
    userID: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    introduction: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        required: true,
    },
})

const joiProjectSchema = joi.object({
    project: joi.object({
        userID: joi.string().required(),
        name: joi.string().required(),
        introduction: joi.string().required(),
        link: joi.string().required(),
    }).required()
})

module.exports = { Project: mongoose.model('Project', projectSchema), joiProject: joiProjectSchema};