const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const joi = require('joi');

const likeSchema = new Schema({
    // likeID: is automatically added
    userID: {
        type: String,
        required: true,
    },
    projectID: {
        type: String,
        required: true,
    },
})

const joiLikeSchema = joi.object({
    like: joi.object({
        userID: joi.string().required(),
        projectID: joi.string().required(),
    }).required()
})

module.exports = { Like: mongoose.model('Like', likeSchema), joiLike: joiLikeSchema };