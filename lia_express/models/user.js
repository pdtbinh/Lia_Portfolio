const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const joi = require('joi');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    // userID: is automatically added
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
})

userSchema.plugin(passportLocalMongoose);

const joiUserSchema = joi.object({
    user: joi.object({
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        email: joi.string().required(),
        username: joi.string().required(),
        password: joi.string().required(),
    }).required()
})

module.exports = { User: mongoose.model('User', userSchema), joiUser: joiUserSchema }