const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const joi = require('joi');

const certificateSchema = new Schema({
    userID: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    provider: {
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

const joiCertificateSchema = joi.object({
    certificate: joi.object({
        userID: joi.string().required(),
        name: joi.string().required(),
        introduction: joi.string().required(),
        link: joi.string().required(),
    }).required()
})

module.exports = { Certificate: mongoose.model('Certificate', certificateSchema), joiCertificate: joiCertificateSchema};