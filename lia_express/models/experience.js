const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const joi = require('joi');

const experienceSchema = new Schema({
    userID: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    introduction: {
        type: String,
        required: true,
    },
    link: {
        type: String,
    }
})

const joiExperienceSchema = joi.object({
    experience: joi.object({
        userID: joi.string().required(),
        position: joi.string().required(),
        company: joi.string().required(),
        time: joi.string().required(),
        introduction: joi.string().required(),
    }).required()
})

module.exports = { Experience: mongoose.model('Experience', experienceSchema), joiExperience: joiExperienceSchema};