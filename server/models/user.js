/*
TODO:
    1. User model
    2. User model methods (setPassword, validatePassword, generateJWT)
    3. Password hashing
    4. Crypto module
    5. Joi validation

*/

const mongoose = require("mongoose");
const Joi = require("Joi");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

function validate(userData) {
    const joiSchema = Joi.object({
        firstName: Joi.string()
            .min(3)
            .max(15)
            .required(),
        lastName: Joi.string()
            .min(3)
            .max(15)
            .required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(5)
            .max(20)
            .required()
    });
    return Joi.validate(userData, joiSchema);
}

userSchema.methods.setPassword = password => {};

module.exports = { User, validate };
