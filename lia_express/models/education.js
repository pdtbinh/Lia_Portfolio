const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const joi = require('joi');

const educationSchema = new Schema({
    userID: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    institution: {
        type: String,
        required: true,
    },
    introduction: {
        type: String,
        required: true,
    },
    focus: {
        type: String,
        required: true,
    },
})

const joiEducationSchema = joi.object({
    project: joi.object({
        userID: joi.string().required(),
        degree: joi.string().required(),
        time: joi.string().required(),
        introduction: joi.string().required(),
    }).required()
})

module.exports = { Education: mongoose.model('Education', educationSchema), joiEducation: joiEducationSchema};