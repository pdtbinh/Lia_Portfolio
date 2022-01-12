const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const joi = require('joi');

const infoSchema = new Schema({
    userID: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
})

const joiInfoSchema = joi.object({
    info: joi.object({
        userID: joi.string().required(),
        email: joi.string().required(),
        phone: joi.string().required(),
        address: joi.string().required(),
    }).required()
})

module.exports = { Info: mongoose.model('Info', infoSchema), joiInfo: joiInfoSchema};